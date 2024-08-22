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
      `/courses?page=${page}?size=${size}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCourse(courseData) {
  try {
    const response = await axiosInstance.delete(
      `/course/${courseData.courseId}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// export async function getClassStudent(classId) {
//   try {
//     const response = await axiosInstance.get(`class/${classId}/students`);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
// export async function getClassTeacher(classId) {
//   try {
//     const response = await axiosInstance.get(`class/${classId}/teachers`);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
// export async function deleteClassMember(classData, username) {
//   try {
//     const response = await axiosInstance.delete(
//       `/class/${classData.classId}/assignedUser/${username}`
//     );
//     console.log(response);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
// export async function getClassList(page, size, year) {
//   try {
//     const response = await axiosInstance.get(
//       `/classes?page=${page}&size=${size}&year=${year}`
//     );
//     console.log(response);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// }
