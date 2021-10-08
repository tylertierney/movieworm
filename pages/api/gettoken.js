import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function products(req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  // const { accessToken } = await getAccessToken(req, res, {
  //   scopes: ["read:users"],
  // });
  const headers = {
    "content-type": "application/json",
  };

  const body =
    '{"client_id":"6yn9PepHtEPryR6aOELB2YDk4yLOI8Rx","client_secret":"UdjSFa0_HmMMSj61c-77whuMlXBIogHRwX9QHwvWUC3zoejCcatPhAkvZDer2zpK","audience":"https://dev-gexu-wbz.us.auth0.com/api/v2/","grant_type":"client_credentials", "scopes:":"["read:users"]"}';

  const options = {
    method: "POST",
    url: "https://dev-gexu-wbz.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    scopes: ["openid"],
  };

  await axios
    .post("https://dev-gexu-wbz.us.auth0.com/oauth/token", body, headers)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return;

  await axios(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).send("great");
});
