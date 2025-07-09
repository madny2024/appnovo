export default async function handler(request, response) {
  const targetUrl = request.query.target;

  if (!targetUrl) {
    return response.status(400).send('O parâmetro "target" da URL é obrigatório.');
  }

  try {
    const proxyResponse = await fetch(targetUrl);

    // Verificamos o tipo de conteúdo da resposta do servidor de IPTV
    const contentType = proxyResponse.headers.get('content-type') || '';

    // Adicionamos nosso cabeçalho de permissão CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    // Copiamos o status code da resposta original
    response.status(proxyResponse.status);

    // ===================================================================
    // || INÍCIO DA CORREÇÃO                                            ||
    // ===================================================================
    // Lógica com 3 modos: JSON, Playlist de Texto (M3U8), e Stream (outros)

    // Modo 1: Se a resposta for JSON
    if (contentType.includes('application/json')) {
      const json = await proxyResponse.json();
      return response.json(json);
    }

    // Modo 2: Se for uma playlist M3U8 (o tipo de conteúdo geralmente inclui 'mpegurl')
    if (contentType.includes('mpegurl')) {
      const text = await proxyResponse.text();
      // Retornamos o texto puro com o content-type correto
      response.setHeader('Content-Type', contentType);
      return response.send(text);
    }
    // ===================================================================
    // || FIM DA CORREÇÃO                                               ||
    // ===================================================================

    // Modo 3: Para qualquer outra coisa (vídeos .ts, .mp4, etc.), enviamos o corpo diretamente
    return response.send(proxyResponse.body);

  } catch (error) {
    response.status(500).json({ error: 'Falha ao buscar dados do proxy.', details: error.message });
  }
}
