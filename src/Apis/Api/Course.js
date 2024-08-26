// src/Apis/Api/Class.js
import { axiosInstance } from "../Utils/Axios";

export async function postCourse(courseData) {
  try {
    const response = await axiosInstance.post("/course", courseData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function postCourseUser(courseData) {
  try {
    const response = await axiosInstance.post("/courseUser", courseData);
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function getCourse(courseData) {
  try {
    const response = await axiosInstance.get(`/course/${courseData.courseId}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCourses(page, size) {
  try {
    const response = await axiosInstance.get(
      `/courses?page=${page}&size=${size}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await axiosInstance.delete(`/course/${courseId}`);
    return response;
  } catch (err) {
    return err;
  }
}

export async function getCourseTeachers(courseId) {
  try {
    const response = await axiosInstance.get(
      `/courseUser/course/${courseId}/teacher`
    );
    return response;
  } catch (err) {
    return err;
  }
}
//class에 할당된 course가져오기
export async function getClassCourse(classId, page, size) {
  try {
    const response = await axiosInstance.get(
      `/courses/${classId}?page=${page}&size=${size}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
