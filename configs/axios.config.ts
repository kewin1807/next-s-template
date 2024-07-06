import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env['NEXT_PUBLIC_API_HUB']}/api/v1`,
  timeout: 10000,
});

export default instance