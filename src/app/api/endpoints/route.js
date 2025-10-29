import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// GET - Listar todos los endpoints del usuario
export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("endpoints")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching endpoints:", error)
      return NextResponse.json({ error: "Failed to fetch endpoints" }, { status: 500 })
    }

    return NextResponse.json({ endpoints: data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Crear nuevo endpoint
export async function POST(request) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, url, frequency_days, is_active } = body

    // Validaciones
    if (!name || !url || !frequency_days) {
      return NextResponse.json({ error: "Missing required fields: name, url, frequency_days" }, { status: 400 })
    }

    // Validar URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    // Validar frecuencia
    if (frequency_days < 1 || frequency_days > 30) {
      return NextResponse.json({ error: "Frequency must be between 1 and 30 days" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("endpoints")
      .insert([
        {
          user_id: userId,
          name,
          url,
          frequency_days,
          is_active: is_active !== undefined ? is_active : true,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating endpoint:", error)
      return NextResponse.json({ error: "Failed to create endpoint" }, { status: 500 })
    }

    return NextResponse.json({ endpoint: data }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
