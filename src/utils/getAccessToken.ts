import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const refresh_token = process.env.REFRSH_TOKEN;

let f = 0;

export async function getAccessToken() {
  try {
    console.log(++f);

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

async function getAccessTokenFromSpotify() {
  const redirect_uri = "http://localhost:3000/";
  const code =
    "AQDF8ak7X90DeJh5PPo_JSPfJn5JmK4i0_lyvpUxmuzPa1eV7xXiw3jZOS4XbyH3XBVdNXFB6h1VHV3EbydV4Wa-9hwFRrCQjl4KZO4emiSTWOZ0q8Eivod7NXtrrFBhVrafT7QWWdMSZoTFka5GAC0KGMbasLeV7IOLJRAkrfoIIHiot128djZiMB5jr7YPI3pGBd9oLjMXayUO_6c";

  try {
    console.log("999999999999");

    const { status, data, statusText } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
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

    console.log({ status, data, statusText });
  } catch (error: any) {
    console.log("maaatheuusss");
    console.log(error);
    console.log("maaatheuusss");
  }
}
