import { createServer, IncomingMessage, ServerResponse } from 'http'
import { getHmac } from './helpers/get-hmac';
import { parseBody } from './helpers/parse-body';

const HOST = 'localhost';
const PORT = 8000;
const SECRET = 'SECRET' // Paste the secret from your webhook here

async function requestListener  (req:IncomingMessage, res:ServerResponse) {
  // Parse the request body
  const body = await parseBody(req)
  console.log(JSON.parse(body))

  // Create a hmac of the body
  const hmac = getHmac(body,SECRET)

  // Verify the HMAC
  if(hmac !== req.headers['x-viesus-cloud-signature']) {
    res.statusCode = 500
    const response = JSON.stringify({error:'Invalid HMAC signuture'})
    console.log(response)
    res.write(response)
    res.end()
    return
  }

  res.writeHead(200);
  const response = JSON.stringify({code:'ok'})
  console.log({response})
  res.end(response)
};

const server = createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
