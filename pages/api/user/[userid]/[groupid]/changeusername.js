import dbConnect from "../../../../../utils/dbConnect";

import Group from "../../../../../models/Group";

import User from "../../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  const { newUsername } = req.body;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const groups = await Group.find({
          group_id: req.query.groupid,
        });

        const group = groups[0];

        const copyOfGroupMembers = [...group.members];

        const index = copyOfGroupMembers.findIndex(
          (elem) => elem.userid === req.query.userid
        );

        group.members[index].username = newUsername;

        group.markModified("members");

        group.save();

        res.status(200).json({ success: true, data: "success" });
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
