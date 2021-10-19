import aws from "aws-sdk";

const region = "us-east-2";
const bucketName = "movieworm";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  bucketName,
  accessKeyId,
  secretAccessKey,
});

const generateUploadURL = async () => {
  const randomNumber = Math.floor(Math.random() * 10000);

  const imageName = randomNumber.toString();

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  return uploadURL;
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const url = await generateUploadURL();

        res.status(200).json({ success: true, data: url });
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
