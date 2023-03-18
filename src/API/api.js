import axios from "axios";

axios.defaults.baseURL = "https://api.wisey.app/api/v1";

export async function getToken() {
  const response = await axios.get(`/auth/anonymous?platform=subscriptions`);
  const token = response.data.token;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getCourses() {
  await getToken();
  const response = await axios.get(`/core/preview-courses`);
  return response.data.courses;
}

export async function getCourse(courseId) {
  await getToken();
  const response = await axios.get(`/core/preview-courses/${courseId}`);
  return response.data;
}
