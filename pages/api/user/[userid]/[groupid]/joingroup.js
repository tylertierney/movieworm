import dbConnect from "../../../../../utils/dbConnect";

import db from "mongoose";

import User from "../../../../../models/User";
import Group from "../../../../../models/Group";

export default async function handler(req, res) {
  const { method } = req;

  const { groupid, userid } = req.query;

  switch (method) {
    case "POST":
      try {
        const targetuser = await User.findOne({
          "groups.group_id": groupid,
        });

        const currentuser = await User.findOne({
          _id: userid,
        });

        targetuser.groups.forEach((group) => {
          if (group.group_id === groupid) {
            group.members.push({
              userid: userid,
              username: req.body.username,
            });

            const new_group = {
              name: group.name,
              group_id: group.group_id,
              owner_id: group.owner_id,
              members: group.members,
              reviews: group.reviews,
            };

            currentuser.groups.push(new_group);
          }
        });

        targetuser.save();
        currentuser.save();
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
