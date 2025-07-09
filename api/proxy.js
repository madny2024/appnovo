export default async function handler(request, response) {
  const targetUrl = request.query.target;

  if (!targetUrl) {
    return response.status(400).send('O parâmetro "target" da URL é obrigatório.');
  }

  try {
    const proxyResponse = await fetch(targetUrl);

    // ===================================================================
    // || INÍCIO DA CORREÇÃO                                            ||
    // ===================================================================
    // Copia os cabeçalhos da resposta original, EXCETO o de codificação de conteúdo
    proxyResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        response.setHeader(key, value);
      }
    });
    // ===================================================================
    // || FIM DA CORREÇÃO                                               ||
    // ===================================================================

    // Garante o cabeçalho de CORS, que é a razão de usarmos um proxy
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Envia a resposta original (seja JSON ou vídeo) de volta para o app
    response.status(proxyResponse.status);
    return response.send(proxyResponse.body);

  } catch (error) {
    response.status(500).json({ error: 'Falha ao buscar dados do proxy.', details: error.message });
  }
}
