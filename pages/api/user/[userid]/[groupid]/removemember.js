import dbConnect from "../../../../../utils/dbConnect";

import Group from "../../../../../models/Group";

import User from "../../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "POST":
      try {
        // First, find the Group object and remove the targeted member from
        // the members array

        let group = await Group.find({
          group_id: req.query.groupid,
        });

        group = group[0];

        console.log(group);

        const copyOfGroupMembers = [...group.members];

        const index = await copyOfGroupMembers.findIndex(
          (elem) => elem.userid === req.query.userid
        );

        copyOfGroupMembers.splice(index, 1);

        // Then, inside this group, remove all reviews that the target user has posted.
        // Also save the updates to the group.

        const copyOfReviews = [...group.reviews];

        let copy = copyOfReviews.filter((review) => {
          return review.userid !== req.query.userid;
        });

        group.members = copyOfGroupMembers;
        group.reviews = copy;

        group.save();

        // Finally, find the targeted User object and remove this group from their
        // groups array

        const user = await User.findOne({
          _id: req.query.userid,
        });

        const groups = [...user.groups];

        const indexOfGroup = await groups.findIndex(
          (elem) => elem.group_id === req.query.groupid
        );

        groups.splice(indexOfGroup, 1);

        user.groups = groups;

        user.save();

        res.status(200).json({ success: true, data: { user, group } });
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
