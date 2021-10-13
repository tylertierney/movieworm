import dbConnect from "../../../../../utils/dbConnect";

import User from "../../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const { userid, groupid } = req.query;
        const { reviewText, rating, movieDetails } = req.body;

        const user = await User.findOne({
          _id: userid,
        });

        for (let i = 0; i < user.groups.length; i++) {
          if (user.groups[i]._id.toString() == groupid) {
            user.groups[i].reviews.push({
              postedBy: userid,
              reviewText,
              rating,
              movieDetails,
            });
          }
        }

        user.save();

        res.status(200).json({ success: true, data: "It worked" });
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
