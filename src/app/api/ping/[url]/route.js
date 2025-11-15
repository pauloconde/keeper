import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const urlParam = req.url.split('/api/ping/')[1];

  if (!urlParam) {
    return NextResponse.json({ error: 'Parámetro de URL inválido' }, { status: 400 });
  }

  const targetUrl = decodeURIComponent(urlParam);

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type') || '';

    if (!response.ok) {
      return NextResponse.json(
        { error: `Error al hacer fetch: ${response.statusText}` },
        { status: response.status }
      );
    }

    if (contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json({ data });
    } else {
      const text = await response.text();
      return NextResponse.json({ data: text });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al conectar con la URL', details: error.message },
      { status: 500 }
    );
  }
};