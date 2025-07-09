export default async function handler(request, response) {
  const targetUrl = request.query.target;

  if (!targetUrl) {
    return response.status(400).send('O parâmetro "target" da URL é obrigatório.');
  }

  try {
    const proxyResponse = await fetch(targetUrl);

    // Verificamos o tipo de conteúdo da resposta
    const contentType = proxyResponse.headers.get('content-type') || '';

    // Adicionamos nosso cabeçalho de CORS
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Se a resposta for JSON, lemos como texto e enviamos como JSON
    if (contentType.includes('application/json')) {
      const json = await proxyResponse.json();
      return response.status(proxyResponse.status).json(json);
    }

    // Para qualquer outra coisa (vídeos, etc.), enviamos o corpo diretamente (stream)
    response.status(proxyResponse.status);
    return response.send(proxyResponse.body);

  } catch (error) {
    response.status(500).json({ error: 'Falha ao buscar dados do proxy.', details: error.message });
  }
}
