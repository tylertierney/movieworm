import dbConnect from "../../../../../utils/dbConnect";

import User from "../../../../../models/User";
import Group from "../../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  const { groupid, userid } = req.query;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          _id: userid,
        });

        user.groups.push({ group_id: groupid });

        user.save();

        let group = await Group.find({
          group_id: groupid,
        });

        group = group[0];

        group.members.push({
          userid: userid,
          username: req.body.username,
        });

        group.save();

        res.status(200).json({ success: true, data: "it worked" });
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
