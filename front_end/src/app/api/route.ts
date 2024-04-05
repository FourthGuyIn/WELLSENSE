// front_end\src\app\api\model1.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function make_prediction(req: NextApiRequest, res: NextApiResponse, filePath: string): Promise<void> {
    try {
        if (req.method === 'POST') {
          if (!req.body || !req.body.data) {
              res.status(400).json({ error: 'No file uploaded' });
              return;
          }
          const base64Data = req.body.data.replace(/^data:image\/jpeg;base64,/, ''); // Assuming file is sent as base64
          const fileName = `uploaded_file_${Date.now()}.jpeg`;
          const filePath = path.join(process.cwd(), 'uploads', fileName);
          fs.writeFileSync(filePath, base64Data, 'base64');
          const prediction = await make_prediction(req, res, filePath); // Pass both req and res along with filePath
          res.status(200).json({ data: prediction });
      } else {
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
        console.error("Failed to make prediction", error);
        res.status(500).json({ error: 'Failed to make prediction' });
    }
}