// pages/api/model1.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // You can handle different types of requests (GET, POST, etc.) here
  if (req.method === 'GET') {
    // For GET requests, send back some data
    res.status(200).json({ data: 'Hello from model1 API endpoint!' })
  } else {
    // If the request method is not GET, return a 405 (Method Not Allowed) status
    res.status(405).end()
  }
}