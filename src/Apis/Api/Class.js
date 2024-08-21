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

export async function getClasses(year) {
  try {
    const response = await axiosInstance.get(`/classes?year=${year}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function assignClassMember(classData, username) {
  try {
    const response = await axiosInstance.put(
      `/class/${classData.classId}/assignUser/${username}`
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

export async function getClassStudent(classId) {
  try {
    const response = await axiosInstance.get(`class/${classId}/students`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getClassTeacher(classId) {
  try {
    const response = await axiosInstance.get(`class/${classId}/teachers`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteClassMember(classData, username) {
  try {
    const response = await axiosInstance.delete(
      `/class/${classData.classId}/assignedUser/${username}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getClassList(page, size, year) {
  try {
    const response = await axiosInstance.get(
      `/classes?page=${page}&size=${size}&year=${year}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getNotAssignedStudent(classId, grade) {
  try {
    const response = await axiosInstance.get(`/notAssignStudents/${grade}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
