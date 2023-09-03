import axios from "axios";

const client_id = "98da74fcc2e84e5c9745f463fca947ae";
const client_secret = "638ce3916f81431d8db3c9de7ff489b6";

const scopes = [
  "playlist-read-collaborative",
  "playlist-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-currently-playing",
  "user-read-recently-played",
];

export async function getAccessToken() {
  try {
    const { data } = await axios.post(
      `https://accounts.spotify.com/api/token&scope=${scopes.join("%20")}`,
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64"),
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("data:");
    console.log(data);

    return data.access_token as string;
  } catch (error) {
    console.log("ERRROROROOOROROROOROROOROROR");

    return undefined;
  }
}
