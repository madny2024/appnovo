export default async function handler(request, response) {
  const targetUrl = request.query.target;

  if (!targetUrl) {
    return response.status(400).send('O parâmetro "target" da URL é obrigatório.');
  }

  try {
    const proxyResponse = await fetch(targetUrl);
    const contentType = proxyResponse.headers.get('content-type') || '';

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(proxyResponse.status);

    // Modo 1: Se a resposta for JSON
    if (contentType.includes('application/json')) {
      const json = await proxyResponse.json();
      return response.json(json);
    }

    // Modo 2: Se for uma playlist M3U8
    if (contentType.includes('mpegurl')) {
      const text = await proxyResponse.text();
      response.setHeader('Content-Type', contentType);
      return response.send(text);
    }

    // ===================================================================
    // || INÍCIO DA CORREÇÃO                                            ||
    // ===================================================================
    // Modo 3: Para qualquer outra coisa (vídeos .ts, .mp4, etc.),
    // convertemos o stream em um Buffer para garantir a compatibilidade.
    const buffer = await proxyResponse.arrayBuffer();
    // Enviamos o Buffer com o Content-Type original
    response.setHeader('Content-Type', contentType);
    return response.send(Buffer.from(buffer));
    // ===================================================================
    // || FIM DA CORREÇÃO                                               ||
    // ===================================================================

  } catch (error) {
    response.status(500).json({ error: 'Falha ao buscar dados do proxy.', details: error.message });
  }
}
