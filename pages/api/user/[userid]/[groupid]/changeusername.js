import dbConnect from "../../../../../utils/dbConnect";

import Group from "../../../../../models/Group";

import User from "../../../../../models/User";

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

  const { newUsername } = req.body;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        // First, update the member object within the group, this is the only
        // field we have to change in MongoDB

        // const groups = await Group.find({
        //   group_id: req.query.groupid,
        // });

        // const group = groups[0];

        // const copyOfGroupMembers = [...group.members];

        // const index = copyOfGroupMembers.findIndex(
        //   (elem) => elem.userid === req.query.userid
        // );

        // group.members[index].username = newUsername;

        // group.markModified("members");

        // group.save();

        // Then generate a unique URL within the Amazon S3 bucket

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
