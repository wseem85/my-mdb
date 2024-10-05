import axios from "axios";
import { KEY } from "../utils/variables";

export async function getTrendingData() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`
    );

    const { results: trendingData } = res.data;
    return { trendingData };
  } catch (err) {
    console.error(err);
    const trendingError = err.message;
    return { trendingError };
  }
}
