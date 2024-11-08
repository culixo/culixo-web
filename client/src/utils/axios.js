import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
let baseURL = publicRuntimeConfig.REACT_APP_API_URL + "/api/v1";

const instance = axios.create({
  baseURL,
});
export default instance;
