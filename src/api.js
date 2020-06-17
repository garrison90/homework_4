import axios from "axios";

export default axios.create({
  baseURL: "https://5ee9227fca59570016029a4d.mockapi.io/stickers",
  headers: {
    "Content-Type": "application/json",
  },
});
