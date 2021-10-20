import dbConnect from "../../../../../utils/dbConnect";

import Group from "../../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  const { newUsername, newProfPicURL } = req.body;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        // First, update the member object within the group, this is the only
        // field we have to change in MongoDB

        const groups = await Group.find({
          group_id: req.query.groupid,
        });

        const group = groups[0];

        const copyOfGroupMembers = [...group.members];

        const index = copyOfGroupMembers.findIndex(
          (elem) => elem.userid === req.query.userid
        );

        group.members[index].username = newUsername;
        group.members[index].prof_pic = newProfPicURL;

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
