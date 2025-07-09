// Este proxy aprimorado lida com qualquer tipo de conteúdo
export default async function handler(request, response) {
  const targetUrl = request.query.target;

  if (!targetUrl) {
    return response.status(400).send('O parâmetro "target" da URL é obrigatório.');
  }

  try {
    // Faz a requisição para o servidor de IPTV
    const proxyResponse = await fetch(targetUrl);

    // Copia os cabeçalhos da resposta original para a nossa resposta
    proxyResponse.headers.forEach((value, key) => {
      response.setHeader(key, value);
    });

    // Garante o cabeçalho de CORS, que é a razão de usarmos um proxy
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Envia a resposta original (seja JSON ou vídeo) de volta para o app
    response.status(proxyResponse.status);
    return response.send(proxyResponse.body);

  } catch (error) {
    response.status(500).json({ error: 'Falha ao buscar dados do proxy.', details: error.message });
  }
}
