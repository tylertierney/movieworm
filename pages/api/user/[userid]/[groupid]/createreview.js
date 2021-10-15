import dbConnect from "../../../../../utils/dbConnect";

import User from "../../../../../models/User";

import Group from "../../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  const { groupid, userid } = req.query;

  const { reviewText, rating, movieDetails, postedAt } = req.body;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        const group = await Group.findOne({
          _id: groupid,
        });

        group.reviews.push({
          userid,
          reviewText,
          rating,
          movieDetails,
          postedAt,
        });

        group.save();

        res.status(200).json({ success: true, data: "it worked" });
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
