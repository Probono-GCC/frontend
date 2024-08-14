// src/Apis/Api/User.js
import { axiosInstance } from "../Utils/Axios";

export async function postTeacher(userData) {
  try {
    const response = await axiosInstance.post(`/teachers`, userData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getTeachers() {
  try {
    const response = await axiosInstance.get("/teachers");
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function postStudent(userData) {
  try {
    const response = await axiosInstance.post("/students", userData);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getStudents() {
  try {
    const response = await axiosInstance.get("/students");
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
