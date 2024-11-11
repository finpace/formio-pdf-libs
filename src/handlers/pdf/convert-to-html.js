const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const tmpdir = require("os").tmpdir();

console.log("tmpdir", tmpdir);

const { generateHtml } = require("../../services/pdf/convert-to-html");
const { htmlGenerationTimeoutConfig } = require("../../../config");

const convertToHtml = async (filePath, optimizedPdf = false) => {
  const outputFileName = `${uuid()}.html`;
  const outputPath = path.join(tmpdir, `${outputFileName}`);
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
  return fs.readFileSync(outputPath, "utf8");
};

module.exports = { convertToHtml };
