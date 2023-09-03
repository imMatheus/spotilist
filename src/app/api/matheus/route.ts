import { scopes } from "@/config";
import axios from "axios";

// Set up the necessary constants

const clientId = "98da74fcc2e84e5c9745f463fca947ae";
const clientSecret = "98fd4067de6444738c930daebd4d0d7f";
const tokenEndpoint = `https://accounts.spotify.com/api/token?scope=${scopes.join(
  "%20"
)}`;
const topArtistsEndpoint =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";
const timeRange = "long_term"; // Options: short_term, medium_term, long_term

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  try {
    const response = await axios.post(
      tokenEndpoint,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error("Error retrieving access token:", error.message);
    throw error;
  }
}

async function fetchTopArtists(accessToken: string): Promise<any> {
  try {
    console.log("accessToken:", accessToken);
    const response = await axios.get(topArtistsEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching top artists:", error.message);
    throw error;
  }
}
export async function GET(request: Request) {
  try {
    const accessToken = await getAccessToken();
    const topArtists = await fetchTopArtists(accessToken);
    console.log("Top Artists:", topArtists);
    return new Response(topArtists);
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(error.message);
  }
}
