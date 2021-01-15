import fetch from "node-fetch";

const cache = {};

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  if (cache[id]) {
    console.log("IN CACHE");
    res.status(200).json(cache[id]);
    return;
  }
  console.log("NOT IN CACHE");
  const API_LINK = `https://api.unsplash.com/photos/${id}`;

  const data = await fetch(API_LINK, {
    headers: {
      Authorization: "Client-ID " + process.env.API_KEY,
    },
  }).then((rsp) => rsp.json());

  cache[id] = data;

  res.status(200).json(data);
}
