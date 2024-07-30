// src/Apis/Api/User.js
import { axiosInstance } from "../Utils/Axios";

export async function postTeacher() {
  try {
    const response = await axiosInstance.post(`/teachers`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTeachers(userData) {
  try {
    const response = await axiosInstance.get("/teachers");
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
