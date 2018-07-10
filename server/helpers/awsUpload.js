const AWS = require('aws-sdk');
// const { ACCESS_KEY, SECRET_KEY, BUCKET_NAME } = require('../../config/aws.config');

const postToAWS = (body, name, callback) => {
  const options = ({
    apiVersion: '2006-03-01',
    region: 'us-west-1',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    signatureVersion: 'v4'
  });

  const s3 = new AWS.S3(options);

  s3.putObject({
    Bucket: BUCKET_NAME,
    Key: name,
    ACL: 'public-read',
    Body: body,
    ContentType: 'image/jpeg'
  }, (err, data) => {
    if (err) {
      console.log('error putting in s3', err);
      callback(err, null);
    } else {
      console.log('successfully put in s3', data);
      callback(null, data)
    }
  })
}

module.exports = {
  postToAWS: postToAWS
}