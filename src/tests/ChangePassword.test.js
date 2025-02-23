import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 추가
import ChangePassword from "../Pages/ChangePassword";
import { MediaQueryProvider } from "../store/MediaQueryContext";
describe("ChangePassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // 각 테스트 전 Mock 함수 초기화
  });

  test("컴포넌트가 정상적으로 렌더링 되는가?", () => {
    render(
      <MemoryRouter>
        {" "}
        {/* 라우터로 감싸기 */}
        <MediaQueryProvider>
          <ChangePassword />
        </MediaQueryProvider>
      </MemoryRouter>
    );

    // expect(screen.getByText("Change Password")).toBeInTheDocument();
    // "Change Password" 텍스트가 있는 <h3> 태그를 찾음
    const changePasswordText = screen.getByText("Change Password", {
      selector: "h3",
    });
    expect(changePasswordText).toBeInTheDocument();

    // Modal의 "Change Password" 텍스트를 찾음
    const modalTitle = screen.getByText("Change Password", { selector: "h2" }); // 예시로 <h2>에 텍스트가 있다고 가정
    expect(modalTitle).toBeInTheDocument();
  });
});

// test("드롭다운에서 학생/교사 선택 시 API 호출이 되는가?", async () => {
//   // 학생 및 교사 API 응답을 모의
//   getStudents.mockResolvedValue({ content: [], totalElements: 0 });
//   getTeachers.mockResolvedValue({ content: [], totalElements: 0 });

//   render(<ChangePassword />);

//   // 'User' 드롭다운 선택하기
//   const select = screen.getByLabelText("User");
//   fireEvent.mouseDown(select);

//   // 'Student' 옵션 선택 후, API 호출 확인
//   const studentOption = screen.getByText("Student");
//   fireEvent.click(studentOption);
//   await waitFor(() => expect(getStudents).toHaveBeenCalledWith({}));

//   // 'Teacher' 옵션 선택 후, API 호출 확인
//   fireEvent.mouseDown(select);
//   const teacherOption = screen.getByText("Teacher");
//   fireEvent.click(teacherOption);
//   await waitFor(() => expect(getTeachers).toHaveBeenCalledWith({}));
// });

// test("모달이 올바르게 열리고 닫히는가?", async () => {
//   render(<ChangePassword />);

//   // 'Change' 버튼 클릭하여 모달 열기
//   const changeButton = screen.getByText("Change");
//   fireEvent.click(changeButton);

//   await waitFor(() => {
//     expect(screen.getByText("Change Password Modal")).toBeInTheDocument();
//   });

//   // 'Close' 버튼 클릭하여 모달 닫기
//   const closeButton = screen.getByText("Close");
//   fireEvent.click(closeButton);

//   await waitFor(() => {
//     expect(
//       screen.queryByText("Change Password Modal")
//     ).not.toBeInTheDocument();
//   });
// });

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
