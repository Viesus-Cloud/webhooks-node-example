import * as crypto from 'crypto'

export function getHmac(body:string, secret:string) {
  const hmac = crypto.createHmac('sha256', secret).update(body).digest('hex')
  return hmac
}
