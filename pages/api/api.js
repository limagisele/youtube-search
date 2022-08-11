export default async function fetchApi(searchTerm, orderBy) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  try {
    const res = await fetch(
      `https://youtube-v31.p.rapidapi.com/search?q=${searchTerm}&part=snippet%2Cid&hl=en-US&maxResults=50&order=${orderBy}`,
      options
    );
    const json = await res.json();
    const data = json.items;
    return data;
  } catch {
      return
  }
}
