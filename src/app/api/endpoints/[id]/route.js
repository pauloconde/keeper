import { auth } from "@clerk/nextjs/server"
import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

// PUT - Actualizar endpoint
export async function PUT(request, { params }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { name, url, frequency_days, is_active } = body

    // Validar que el endpoint pertenece al usuario
    const { data: existing, error: fetchError } = await supabase
      .from("endpoints")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 })
    }

    // Preparar datos a actualizar
    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (url !== undefined) {
      try {
        new URL(url)
        updateData.url = url
      } catch {
        return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
      }
    }
    if (frequency_days !== undefined) {
      if (frequency_days < 1 || frequency_days > 30) {
        return NextResponse.json({ error: "Frequency must be between 1 and 30 days" }, { status: 400 })
      }
      updateData.frequency_days = frequency_days
    }
    if (is_active !== undefined) updateData.is_active = is_active

    const { data, error } = await supabase
      .from("endpoints")
      .update(updateData)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating endpoint:", error)
      return NextResponse.json({ error: "Failed to update endpoint" }, { status: 500 })
    }

    return NextResponse.json({ endpoint: data })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Eliminar endpoint
export async function DELETE(request, { params }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Validar que el endpoint pertenece al usuario
    const { data: existing, error: fetchError } = await supabase
      .from("endpoints")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 })
    }

    const { error } = await supabase.from("endpoints").delete().eq("id", id).eq("user_id", userId)

    if (error) {
      console.error("Error deleting endpoint:", error)
      return NextResponse.json({ error: "Failed to delete endpoint" }, { status: 500 })
    }

    return NextResponse.json({ message: "Endpoint deleted successfully" })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
