import { scopes } from "@/config";
import axios from "axios";
import { log } from "console";
import request from "request";

const clientId = "98da74fcc2e84e5c9745f463fca947ae";
const clientSecret = "638ce3916f81431d8db3c9de7ff489b6";

function generateRandomString(length: number): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCharacters = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCharacters += charset[randomIndex];
  }

  return randomCharacters;
}

export async function GET(req: Request) {
  try {
    let b: any;
    const res = await request.post(
      {
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization:
            "Basic " +
            new Buffer(clientId + ":" + clientSecret).toString("base64"),
        },
        form: {
          grant_type: "client_credentials",
        },
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // use the access token to access the Spotify Web API
          var token = body.access_token;
          var options = {
            url: "https://api.spotify.com/v1/users/matheusmendesbarata03",
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          };
          request.get(options, function (error, response, body) {
            console.log("********************************");
            console.log(token);
            console.log("********************************");
            b = { ...body };
          });
        }
      }
    );

    console.log("llllllllllllllllllllllllllllllllll");

    return new Response(
      JSON.stringify({ a: generateRandomString(16), b, res })
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(error.message);
  }
}
