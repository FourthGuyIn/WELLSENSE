//front_end\src\app\api\runPythonScript.js

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  exec('python3 model1.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (stderr) {
      console.error(`Python script produced an error: ${stderr}`);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Read the output file
    const filePath = path.join(__dirname, 'prediction_output.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading output file: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      // Send the file content as response
      res.status(200).send(data);
    });
  });
}