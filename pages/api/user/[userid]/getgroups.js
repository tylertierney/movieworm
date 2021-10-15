import dbConnect from "../../../../utils/dbConnect";

import User from "../../../../models/User";

import Group from "../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const groups = await Group.find({
          "members.userid": req.query.userid,
        });

        res.status(200).json({ success: true, data: groups });
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
