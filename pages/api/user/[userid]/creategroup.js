import dbConnect from "../../../../utils/dbConnect";

import User from "../../../../models/User";

import Group from "../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          _id: req.query.userid,
        });

        user.groups.push({ group_id: req.body.group_id });

        user.save();

        const new_group = {
          name: req.body.groupname,
          owner_id: req.query.userid,
          group_id: req.body.group_id,
          reviews: [],
          members: [{ userid: req.query.userid, username: req.body.username }],
        };

        await Group.create(new_group);

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
