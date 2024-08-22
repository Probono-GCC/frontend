// src/Apis/Api/Class.js
import { axiosInstance } from "../Utils/Axios";

export async function putClass(classData) {
  try {
    const response = await axiosInstance.put(
      `/class?id=${classData.classId}`,
      classData
    );
    if (response.status == 200) {
      return response.data;
    } else if (response.status == 409) {
      //클래스 중복
      console.log(response);
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}
export async function postClass(classData) {
  try {
    const response = await axiosInstance.post("/class", classData);
    console.log("Response:", response); // 응답 정보 로깅
    return response.data;
  } catch (err) {
    console.error("요청 중 오류 발생:", err); // 오류 메시지 로깅
    return err;
    // if (err.response) {
    //   // 서버가 응답을 보냈으나 상태 코드가 오류를 나타냄
    //   return { error: "서버 오류", details: err.response.data };
    // } else if (err.request) {
    //   // 요청이 서버에 도달했으나 응답이 없음
    //   return { error: "네트워크 오류", details: err.request };
    // } else {
    //   // 오류 발생 원인 불명
    //   return { error: "알 수 없는 오류", details: err.message };
    // }
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

export async function getClasses(page, pageSize, yearData) {
  try {
    const response = await axiosInstance.get(
      `/classes?page=${page}&pageSize=${pageSize}&year=${yearData}`
    );
    // console.log(response);
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

export async function getClassStudent(classId, page, size) {
  try {
    const response = await axiosInstance.get(
      `class/${classId}/students?page=${page}&size=${size}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
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
export async function getNotAssignedStudent(grade, page, size) {
  try {
    const response = await axiosInstance.get(
      `/notAssignStudents?grade=${grade}&page=${page}&size=${size}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
