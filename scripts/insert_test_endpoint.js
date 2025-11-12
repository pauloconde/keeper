/**
 * Script para insertar un endpoint de prueba en la tabla `endpoints` de Supabase.
 *
 * Uso local:
 *   - Crea un archivo `.env.local` (NO lo comitees) con las variables:
 *       SUPABASE_URL=your-supabase-url
 *       SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
 *   - Ejecuta: node scripts/insert_test_endpoint.js
 *
 * NOTAS DE SEGURIDAD: nunca pongas la `SERVICE_ROLE_KEY` en el repo público.
 */

import('dotenv/config')
  .then(async () => {
    const { createClient } = await import('@supabase/supabase-js')

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Faltan variables de entorno. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
      process.exit(1)
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Registro de ejemplo: hace ping a httpstat.us/200 que devuelve 200 OK
    const testEndpoint = {
      // user_id: null, // si tu tabla requiere user_id, sustituye por un user_id válido
      name: 'Test public ping (httpstat)',
      url: 'https://httpstat.us/200',
      frequency_days: 1,
      is_active: true,
    }

    try {
      const { data, error } = await supabase.from('endpoints').insert([testEndpoint]).select().single()

      if (error) {
        console.error('Error inserting test endpoint:', error)
        process.exit(1)
      }

      console.log('Inserted test endpoint:', data)
      console.log('\nAhora puedes probar el endpoint cronpings en tu deploy o localmente.')
    } catch (err) {
      console.error('Unexpected error:', err)
      process.exit(1)
    }
  })
  .catch((err) => {
    console.error('Failed to load dotenv or run script:', err)
    process.exit(1)
  })
