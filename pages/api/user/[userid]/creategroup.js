import dbConnect from "../../../../utils/dbConnect";

import User from "../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          _id: req.query.userid,
        });

        console.log(req.body.reviews);

        const new_group = {
          name: req.body.groupname,
          group_id: req.body.group_id,
          owner_id: req.query.userid,
          members: [{ userid: req.query.userid, username: req.body.username }],
          reviews: [],
        };

        user.groups.push(new_group);
        user.save();

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
