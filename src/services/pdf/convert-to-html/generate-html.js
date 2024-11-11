import { pdf2htmlexPath } from "../../../../config.js";
import { exec } from "../../../utils/exec.js";
import { fileURLToPath } from 'url';
import fs from 'fs';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateHtml = async (filePath, toFile, params, commands, timeout) => {
  const { zoom, dpi } = params;
  const args = commands.concat([
    '--no-drm',
    '1',
    '--process-outline',
    '0',
    '--data-dir',
    `${__dirname}/data-dir`,
    '--zoom',
    zoom,
    '--dpi',
    dpi,
    '--quiet',
    '1',
    filePath,
    toFile
  ]);
  
  // print the items under the data-dir
  console.log("data-dir items: ", fs.readdirSync(`${__dirname}/data-dir`));
  // 
  try {
    await exec(`${pdf2htmlexPath} ${args.join(' ')}`, { timeout });
  } catch (error) {
    console.error('Error executing command:', error);
    if (error.stdout) {
      console.error('stdout:', error.stdout);
    }
    if (error.stderr) {
      console.error('stderr:', error.stderr);
    }
    if (error.killed) {
      console.error('The process was killed due to timeout.');
    }
    throw error;
  }
};
