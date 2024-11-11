const { convertToHtml } = require("./src/handlers/pdf/convert-to-html");

exports.handler = async () => {
  const html = await convertToHtml("./orig.pdf");
  const response = {
    statusCode: 200,
    body: html,
  };
  return response;
};
