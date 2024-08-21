// src/Apis/Api/Class.js
import { axiosInstance } from "../Utils/Axios";

// subjectData: name, elective
export async function postSubject(subjectData) {
  try {
    const response = await axiosInstance.post("/subjects", subjectData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSubject(subjectData) {
  try {
    const response = await axiosInstance.get(
      `/subjects/${subjectData.subjectId}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSubjects(page, size) {
  try {
    const response = await axiosInstance.get(
      `/subjects?page=${page}&size=${size}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteSubject(subjectId) {
  try {
    const response = await axiosInstance.delete(`/subjects/${subjectId}`);
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
