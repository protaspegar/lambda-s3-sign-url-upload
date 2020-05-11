'use strict'

const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AccessKey, // IAM user access key
    secretAccessKey: process.env.SecretAccessKey, // IAM user secret access key
    region: 'us-east-1', // Must be the same as your bucket
    signatureVersion: 'v4',
  });
const s3 = new AWS.S3();

// Main Lambda entry point
exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const fileName = body.fileName;
  const folder = body.folder;
  const contentType = body.contentType; // 'application/octet-stream'

  const result = await getUploadURL(folder, fileName, contentType);
  console.log('Result: ', result);
  return result;
}

const getUploadURL = async function(folder, filename, contentType) {
  const key = folder + Date.now().toString() + "/" + filename; // Adding a timestamp to ensure it is unique
  //const key = filename;
  
  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key:  key,
    Expires: 30*60, // 30 minutes
    ContentType: contentType, // Update to match whichever content type you need to upload
    ACL: 'public-read'      // Enable this setting to make the object publicly readable - only works if the bucket can support public objects
  }

  console.log('getUploadURL: ', s3Params)
  return new Promise((resolve, reject) => {
    // Get signed URL
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "uploadURL": s3.getSignedUrl('putObject', s3Params),
          "fullFileName": key
      })
    })
  })
}
