import axios from "axios";

export default axios.create({
  //baseURL: `${window.location.origin}/api`,
  baseURL: "http://ec2-13-40-163-98.eu-west-2.compute.amazonaws.com/api",
});
