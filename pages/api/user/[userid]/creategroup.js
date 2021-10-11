import dbConnect from "../../../../utils/dbConnect";

import User from "../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  console.log(req.body);

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          _id: req.query.userid,
        });

        res.status(200).json({ success: true, data: user });

        user.groups.push();
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
