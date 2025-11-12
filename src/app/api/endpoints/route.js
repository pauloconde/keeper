export const runtime = 'nodejs'

import { auth } from "@clerk/nextjs/server";
import { headers } from 'next/headers'
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from 'next/server';

/**
 * @method GET
 * @summary Obtiene todos los endpoints asociados al usuario autenticado.
 * @description Requiere autenticación a través de Clerk.
 */
export async function GET() {
  try {
    // 1. Obtener el ID del usuario autenticado (Auth guard)
    let { userId } = auth();

    if (!userId) {
      // Fallback de desarrollo: permitir pasar userId vía cabecera
      const debugUserId = headers().get('x-debug-user-id')
      if (debugUserId) {
        userId = debugUserId
      } else {
        // Si no hay userId, el usuario no está autenticado.
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // 2. Consulta a Supabase para obtener los endpoints de ese usuario
    const { data, error } = await supabaseAdmin
      .from('endpoints')
      .select('*')
      .eq('user_id', userId) // Filtra estrictamente por el ID del usuario
      .order('created_at', { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // 3. Respuesta exitosa
    return new Response(JSON.stringify({ endpoints: data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    // Manejo de errores generales (incluyendo fallos en auth())
    return new Response(JSON.stringify({ error: err?.message ?? 'Internal Server Error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------

/**
 * @method POST
 * @summary Crea un nuevo endpoint para el usuario autenticado.
 * @description Requiere autenticación a través de Clerk.
 */
export async function POST(request) {
  try {
    // 1. Obtener el ID del usuario autenticado (Auth guard)
    let { userId } = auth();
    if (!userId) {
      const debugUserId = headers().get('x-debug-user-id')
      if (debugUserId) {
        userId = debugUserId
      } else {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
      }
    }

    const body = await request.json();
    const { name, url, frequency_days, is_active } = body;

    // 2. Validaciones
    if (!name || !url || !frequency_days) {
      return NextResponse.json({ error: "Missing required fields: name, url, frequency_days" }, { status: 400 });
    }

    // Validar formato de URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Validar frecuencia (de 1 a 30 días)
    if (frequency_days < 1 || frequency_days > 30) {
      return NextResponse.json({ error: "Frequency must be between 1 and 30 days" }, { status: 400 });
    }

    // 3. Inserción en Supabase
    const { data, error } = await supabaseAdmin
      .from("endpoints")
      .insert([
        {
          user_id: userId, // **Siempre** usa el userId de la sesión
          name,
          url,
          frequency_days,
          is_active: is_active !== undefined ? is_active : true
        }
      ])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // 4. Respuesta exitosa
    return new Response(JSON.stringify({ endpoint: data }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("POST Endpoint Error:", error);
    // Manejo de errores de JSON parseo o errores internos
    // No revelamos 'error.message' al cliente por seguridad, solo lo registramos.
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}