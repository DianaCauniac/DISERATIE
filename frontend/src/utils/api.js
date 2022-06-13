import axios from "axios";
export const baseUrl = "http://localhost:5000";
export default axios.create({
  baseURL: `${baseUrl}/api`,
});
