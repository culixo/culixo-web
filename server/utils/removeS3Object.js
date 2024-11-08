const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const removeS3Object = (key) => {
  var params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };
  console.log(key);
  s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return {
        success: false,
        message: "Error in deleting S3 Object",
      };
    } else {
      return {
        success: true,
        message: "",
      };
    }
  });
};
module.exports = removeS3Object;
