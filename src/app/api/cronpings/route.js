import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { NextResponse } from "next/server"

// Esta función será llamada por el Vercel Cron Job
export async function GET(req) {
  try {
  // Obtener todos los endpoints activos
  const { data: endpoints, error } = await supabaseAdmin.from("endpoints").select("*").eq("is_active", true)

    if (error) {
      console.error("Error fetching endpoints:", error)
      return NextResponse.json({ error: "Failed to fetch endpoints" }, { status: 500 })
    }

    const results = []

    // Procesar cada endpoint
    for (const endpoint of endpoints) {

        const pingResult = await pingEndpoint(endpoint)
        results.push(pingResult)

        // Actualizar en base de datos con el timestamp real del ping
        const updatedAt = new Date().toISOString()
        try {
          const { data: updated, error: updateError } = await supabaseAdmin
            .from("endpoints")
            .update({
              last_ping_at: updatedAt,
              last_status: pingResult.status,
              last_response_time: pingResult.responseTime,
            })
            .eq("id", endpoint.id)
            .select()

          if (updateError) {
            console.error(`Failed to update endpoint ${endpoint.id}:`, updateError)
          }

          // Optional: attach updated row to result for debugging
          if (updated && updated.length) {
            pingResult.updatedRow = updated[0]
          }
        } catch (dbErr) {
          console.error(`Unexpected DB error updating endpoint ${endpoint.id}:`, dbErr)
        }

        // Insertar un registro de log del ping en ping_logs
        try {
          const logRow = {
            endpoint_id: endpoint.id,
            user_id: endpoint.user_id ?? null,
            name: endpoint.name,
            url: endpoint.url,
            status: pingResult.status,
            status_code: pingResult.statusCode ?? null,
            response_time: pingResult.responseTime ?? null,
            error: pingResult.error ?? null,
            created_at: updatedAt,
          }

          const { data: logData, error: logError } = await supabaseAdmin.from('ping_logs').insert([logRow]).select()

          if (logError) {
            console.error(`Failed to insert ping log for endpoint ${endpoint.id}:`, logError)
          } else if (logData && logData.length) {
            pingResult.log = logData[0]
          }
        } catch (logErr) {
          console.error(`Unexpected DB error inserting ping log for endpoint ${endpoint.id}:`, logErr)
        }
    }

    return NextResponse.json({
      message: "Ping process completed",
      pinged: results.length,
      results,
    })
  } catch (error) {
    console.error("Unexpected error in ping-sites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}



// Función auxiliar: hacer ping a un endpoint
async function pingEndpoint(endpoint) {
  const startTime = Date.now()

  try {
    const response = await fetch(endpoint.url, {
      method: "GET",
      headers: {
        "User-Agent": "KeepServicesActive/1.0",
      },
      signal: AbortSignal.timeout(10000), // 10 segundos timeout
    })

    const responseTime = Date.now() - startTime

    return {
      id: endpoint.id,
      name: endpoint.name,
      url: endpoint.url,
      status: response.ok ? "success" : "error",
      statusCode: response.status,
      responseTime,
    }
  } catch (error) {
    const responseTime = Date.now() - startTime

    return {
      id: endpoint.id,
      name: endpoint.name,
      url: endpoint.url,
      status: "error",
      error: error.message,
      responseTime,
    }
  }
}
