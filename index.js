import { convertToHtml } from "./src/handlers/pdf/convert-to-html.js";
import fs from "fs";
import { dirname } from 'path';
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });

const getFileFromS3 = async (Bucket, Key) => {
  const params = {
    Bucket,
    Key,
  };
  const res = await client.send(new GetObjectCommand(params));
  return res.Body.transformToByteArray();
};

export const handler = async (event) => {
  const Key = event.Records[0].s3.object.key;
  const Bucket = event.Records[0].s3.bucket.name;
  console.log("Key: ", Key);
  console.log("Bucket: ", Bucket);

  const file = await getFileFromS3(Bucket, Key);

  console.log("read file from s3");

  // write to lambda temp dir
  const filePath = `/tmp/${Key}`;
  fs.mkdirSync(dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, file);

  const { outputFile } = await convertToHtml(filePath);

  console.log("converted to html");

  await client.send(
    new PutObjectCommand({
      Bucket,
      Key: Key.replace(".pdf", ".html"),
      Body: outputFile,
    })
  );

  console.log("uploaded to s3");
};
