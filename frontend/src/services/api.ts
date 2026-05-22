import axios from "axios";

const axiosInstanceProfile = axios.create({
  baseURL: "http://localhost:8000/api",
});
export default axiosInstanceProfile;
