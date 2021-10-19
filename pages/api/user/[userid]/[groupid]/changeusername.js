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
        const group = await Group.find({
          group_id: req.query.groupid,
        });

        let copyOfGroup = group[0];

        const copyOfGroupMembers = [...copyOfGroup.members];

        const index = copyOfGroupMembers.findIndex(
          (elem) => elem.userid === req.query.userid
        );

        console.log(copyOfGroupMembers, index);

        copyOfGroupMembers[index].username = newUsername;

        group[0].members = copyOfGroupMembers;

        group[0].save();

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
