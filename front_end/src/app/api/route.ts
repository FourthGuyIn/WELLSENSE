// front_end\src\app\api\model1.ts
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export default async function make_prediction(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        if (req.method === 'POST') {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error("Failed to parse form data", err);
                    res.status(500).json({ error: 'Failed to parse form data' });
                    return;
                }
                const file = files.file as formidable.File;
                const filePath = file.path;

                // Run model1.py with filePath as an argument
                const python = spawn('python', ['./model1.py', filePath]);
                let output = '';

                // Collect data from stdout
                python.stdout.on('data', (data) => {
                    output += data.toString();
                });

                // Handle error output
                python.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                // Handle process exit
                python.on('close', (code) => {
                    if (code !== 0) {
                        console.error(`python script exited with code ${code}`);
                        res.status(500).json({ error: 'Failed to make prediction' });
                    } else {
                        res.status(200).json({ data: output });
                    }
                });
            });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Failed to make prediction", error);
        res.status(500).json({ error: 'Failed to make prediction' });
    }
}