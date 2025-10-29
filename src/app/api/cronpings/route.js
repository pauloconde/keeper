import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// Esta función será llamada por el Vercel Cron Job
export async function GET() {
  try {
    // Obtener todos los endpoints activos
    const { data: endpoints, error } = await supabase.from("endpoints").select("*").eq("is_active", true)

    if (error) {
      console.error("Error fetching endpoints:", error)
      return NextResponse.json({ error: "Failed to fetch endpoints" }, { status: 500 })
    }

    const results = []
    const now = new Date()

    // Procesar cada endpoint
    for (const endpoint of endpoints) {
      // Calcular si necesita ping
      const needsPing = shouldPing(endpoint, now)

      if (needsPing) {
        const pingResult = await pingEndpoint(endpoint)
        results.push(pingResult)

        // Actualizar en base de datos
        await supabase
          .from("endpoints")
          .update({
            last_ping_at: now.toISOString(),
            last_status: pingResult.status,
            last_response_time: pingResult.responseTime,
          })
          .eq("id", endpoint.id)
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

// Función auxiliar: determinar si un endpoint necesita ping
function shouldPing(endpoint, now) {
  if (!endpoint.last_ping_at) {
    return true // Nunca se ha hecho ping
  }

  const lastPing = new Date(endpoint.last_ping_at)
  const daysSinceLastPing = (now - lastPing) / (1000 * 60 * 60 * 24)

  return daysSinceLastPing >= endpoint.frequency_days
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
