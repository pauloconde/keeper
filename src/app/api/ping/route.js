import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// POST - Hacer ping manual a un endpoint específico
export async function POST(request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { endpointId } = body

    if (!endpointId) {
      return NextResponse.json({ error: "Missing endpointId" }, { status: 400 })
    }

    // Verificar que el endpoint pertenece al usuario
    const { data: endpoint, error: fetchError } = await supabase
      .from("endpoints")
      .select("*")
      .eq("id", endpointId)
      .eq("user_id", userId)
      .single()

    if (fetchError || !endpoint) {
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 })
    }

    // Hacer ping
    const startTime = Date.now()
    let result

    try {
      const response = await fetch(endpoint.url, {
        method: "GET",
        headers: {
          "User-Agent": "KeepServicesActive/1.0",
        },
        signal: AbortSignal.timeout(10000),
      })

      const responseTime = Date.now() - startTime

      result = {
        status: response.ok ? "success" : "error",
        statusCode: response.status,
        responseTime,
      }
    } catch (error) {
      const responseTime = Date.now() - startTime

      result = {
        status: "error",
        error: error.message,
        responseTime,
      }
    }

    // Actualizar en base de datos
    await supabase
      .from("endpoints")
      .update({
        last_ping_at: new Date().toISOString(),
        last_status: result.status,
        last_response_time: result.responseTime,
      })
      .eq("id", endpointId)

    return NextResponse.json({
      message: "Manual ping completed",
      result,
    })
  } catch (error) {
    console.error("Unexpected error in manual ping:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
