// src/Apis/Api/Class.js
import { axiosInstance } from "../Utils/Axios";

export async function postClass(classData) {
  try {
    const response = await axiosInstance.post("/class", classData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getClass(classData) {
  try {
    const response = await axiosInstance.get(
      `/class/${classData.classId}`,
      classData
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getClasses() {
  try {
    const response = await axiosInstance.get(`/classes?year=2084`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function putClass(classData) {
  try {
    const response = await axiosInstance.put(
      `/class/${classData.classId}`,
      classData
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteClass(classData) {
  try {
    const response = await axiosInstance.delete(
      `/class/${classData.classId}`,
      classData
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
