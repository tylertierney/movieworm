import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  console.log(req.query);

  await dbConnect();
  console.log(User.findOne());
  switch (method) {
    case "GET":
      try {
        const users = await User.findOne({
          email: "asantino@email.com",
        }); /* find all the data in our database */
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
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
