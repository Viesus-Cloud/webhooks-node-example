import { IncomingMessage } from "http";

export async function parseBody(req:IncomingMessage):Promise<string> {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  return data
}
