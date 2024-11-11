import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

import { htmlGenerationTimeoutConfig } from "../../../config.js";
import { generateHtml } from "../../services/pdf/convert-to-html/generate-html.js";

export const convertToHtml = async (filePath, optimizedPdf = false) => {
  const outputFileName = `${uuid()}.html`;
  const { timeout, backoff } = htmlGenerationTimeoutConfig;
  const calculatedTimeout = optimizedPdf ? timeout + backoff : timeout;
  try {
    await generateHtml(
      filePath,
      outputFileName,
      {
        zoom: 1.78,
        dpi: 144,
      },
      ["--dest-dir", tmpdir],
      calculatedTimeout
    );
  } catch (err) {
    console.error("error while generating html", err);
  }
  return {
    outputFileName,
    outputFile: fs.readFileSync(`/tmp/${outputFileName}`, "utf8"),
  };
};
