import dbConnect from "../../../../utils/dbConnect";

import User from "../../../../models/User";

import Group from "../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const group = await Group.find({
          group_id: req.query.groupid,
        });

        res.status(200).json({ success: true, data: group });
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
