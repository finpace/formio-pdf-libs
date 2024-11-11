import { pdf2htmlexPath } from "../../../../config.js";
import { exec } from "../../../utils/exec.js";

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
  await exec(`${pdf2htmlexPath} ${args.join(' ')}`, { timeout });
};
