// src/Apis/Api/User.js
import { axiosInstance } from "../Utils/Axios";

export async function postTeacher(userData) {
  try {
    const response = await axiosInstance.post(`/teachers/join`, userData);
    return response;
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
    const response = await axiosInstance.post("/students/join", userData);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getStudents(page, size) {
  try {
    const response = await axiosInstance.get(
      `/students?page=${page}&size=${size}`
    );

    return response.data;
  } catch (err) {
    console.error("요청 중 오류 발생:", err); // 오류 메시지 로깅
    return err;
  }
}

export async function loginApi(userData) {
  try {
    const response = await axiosInstance.post(`/login`, userData);
    return response;
  } catch (err) {
    // console.log(err);
    return err;
  }
}
export async function putStudent(userData) {
  try {
    const response = await axiosInstance.put(
      `/students/${userData.username}`,
      userData
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function changeGradeApi(userData, userId) {
  try {
    const response = await axiosInstance.put(
      `/changeGrade/${userId}`,
      userData
    );
    return response;
  } catch (err) {
    console.error("요청 중 오류 발생:", err); // 오류 메시지 로깅
    return err;
  }
}
export async function postProfileImage(userData, userId) {
  try {
    const response = await axiosInstance.post(
      `/profile/images/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // `FormData`를 전송할 때 자동으로 설정됩니다.
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getStudent(userId) {
  try {
    const response = await axiosInstance.get(`/students/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getTeacher(userId) {
  try {
    const response = await axiosInstance.get(`/teachers/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function putTeacher(userData) {
  try {
    const response = await axiosInstance.put(
      `/teachers/${userData.username}`,
      userData
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function updateTeacherProfile(userData, loginId) {
  try {
    const response = await axiosInstance.put(`/teachers/${loginId}`, userData);
    return response;
  } catch (err) {
    console.log(err);
  }
}
export async function updateStudentProfile(userData, loginId) {
  try {
    const response = await axiosInstance.put(`/students/${loginId}`, userData);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getProfileImage(userId) {
  try {
    const response = await axiosInstance.get(`/profile/images/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function deleteTeacher(userData) {
  try {
    const response = await axiosInstance.delete(`/teachers/${userData}`);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
}
export async function deleteStudent(userData) {
  try {
    const response = await axiosInstance.delete(
      `/students/${userData}`,
      userData
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function resetPassword(userId, userData) {
  try {
    const response = await axiosInstance.put(
      `/resetPassword/${userId}`,
      userData
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

///students/checkSerialNumber/{serialNumber}
export async function checkDuplicatedStudentSerialNumberApi(userSn) {
  try {
    const response = await axiosInstance.get(
      `/students/checkSerialNumber/${userSn}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function checkDuplicatedUserIdApi(userId) {
  try {
    const response = await axiosInstance.get(
      `/teachers/checkusername/${userId}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function IsUserExistsApi(userId) {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function IsPwAnswerRightApi(userId, answer) {
  try {
    const response = await axiosInstance.get(
      `/checkPwAnswer/${userId}/${answer}`
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function ResetPwApi(PwData, userID) {
  try {
    const response = await axiosInstance.put(
      `/resetPassword/${userID}`,
      PwData
    );
    return response;
  } catch (err) {
    console.log(err);
  }
}
