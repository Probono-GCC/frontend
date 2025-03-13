//ChangePassword.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 추가
import ChangePassword from "../Pages/ChangePassword";
import { MediaQueryProvider } from "../store/MediaQueryContext";
import axios from "axios";
import axiosInstance from "../Apis/Utils/Axios";
import userEvent from "@testing-library/user-event";
// axios mock 설정
jest.mock("axios");

jest.mock("../Apis/Utils/Axios", () => ({
  axiosInstance: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    get: jest.fn(),
    post: jest.fn(),
  },
}));

test("모달이 올바르게 열리고 닫히는가?", async () => {
  render(
    <MediaQueryProvider>
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    </MediaQueryProvider>
  );

  // 'Change' 버튼 클릭하여 모달 열기
  const changeButton = screen.getByText("Change");
  fireEvent.click(changeButton);
  await waitFor(() => {
    expect(screen.getByText("Set New Password")).toBeInTheDocument();
  });
});

// test("페이지네이션 핸들러가 올바르게 동작하는가?", async () => {
//   // 학생 API 응답 설정
//   getStudents.mockResolvedValue({ content: [], totalElements: 0 });

//   render(<ChangePassword />);
//   await waitFor(() => expect(getStudents).toHaveBeenCalled());

//   // 페이지네이션 버튼 클릭하여 추가 데이터 로딩
//   const nextPageButton = screen.getByLabelText("Go to next page");
//   fireEvent.click(nextPageButton);

//   await waitFor(() => expect(getStudents).toHaveBeenCalledTimes(2)); // 두 번째 호출 확인
// });
