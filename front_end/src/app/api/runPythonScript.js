import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  exec('python3 model1.py', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    // Read the output file
    fs.readFile(path.join(__dirname, 'prediction_output.txt'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // Send the file content as response
      res.status(200).json({ data });
    });
  });
}