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

        res.status(200).json({ success: true, data: user });

        const new_group = {
          name: req.body.groupname,
          group_id: req.body.group_id,
          owner_id: req.query.userid,
          members: [{ userid: req.query.userid, username: req.body.username }],
          reviews: [],
        };

        user.groups.push(new_group);
        user.save();
      } catch (error) {
        res.status(400).json({ success: false });
        return;
      }

      break;
    // case "POST":
    //   try {
    //     const group = await Group.create(
    //       req.body
    //     ); /* create a new model in the database */
    //     res.status(201).json({ success: true, data: group });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
