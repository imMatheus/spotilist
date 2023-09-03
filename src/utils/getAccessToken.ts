import axios from "axios";
import querystring from "querystring";

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

const access_token =
  "BQCOctbyx-NUd0AlCnpzclJMPrk8jvAwUz3I8xEAkpppADc33WmmX2Q26nvLqiJzrlAAoJbUEzIri-FwT7X944Uc8LGLXlhnveDzGOrDuU48AoT0_tLXNWTnsCdYb6MFDG8G4kD_6GuPn9b7ZkJtu2ejbxkTQlRRkT0LIO_HkcdmoUCb8rmjdJiV_M7ov59yKWgdDRrXURoqRKQr";
const refresh_token =
  "AQA-KLenj6qWDEUujrDK2rX02ce_Lg5_XJNj4PKGYB5eobrbWgn0B70LamdIq_iS1qOgx8xyhKUh1FbQVo5RKMnGsEaVcpFhHmr2PKiymC08p15uFm4zk2wBHrb0gncGFF0";

export async function getAccessToken() {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
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

    // return "abc";
    return data.access_token as string;
  } catch (error) {
    console.log("ERRROROROOOROROROOROROOROROR");
    console.log(error);

    return undefined;
  }
}
