import { axiosInstance } from "../Utils/Axios";

//게시판 API
//게시글 포스팅
export async function postNewNotice(postingData) {
  try {
    const response = await axiosInstance.post("/notice", postingData);
    return response;
  } catch (err) {
    console.log(err);
  }
}

//게시판 글 리스트 불러오기
export async function getNoticePostList(page, size) {
  try {
    const response = await axiosInstance.get(
      `/notice/classNoticeList?page=${page}&size=${size}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
//단일 게시글 조회
export async function getNoticePost(noticeId) {
  try {
    const response = await axiosInstance.get(`/notice/${noticeId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
//이미지 등록
export async function postImage(noticeId, ImageId) {
  try {
    const response = await axiosInstance.post(
      `/notice/images${noticeId}`,
      ImageId
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//단일 게시글 삭제
export async function deleteNoticePost(noticeId) {
  try {
    const response = await axiosInstance.delete(`/notice/${noticeId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//단일 게시글 수정
export async function putNoticePost(noticeId, formData) {
  try {
    const response = await axiosInstance.put(`/notice/${noticeId}`, formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
