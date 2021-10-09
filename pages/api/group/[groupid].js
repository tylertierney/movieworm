import dbConnect from "../../../utils/dbConnect";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const groups = await Group.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: groups });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const group = await Group.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: group });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
