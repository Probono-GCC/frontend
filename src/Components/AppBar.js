import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  FormatListBulleted as FormatListBulletedIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Book as BookIcon,
  School as SchoolIcon,
  AccountCircleRounded as AccountCircleRoundedIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import { getStudent, getTeacher, getProfileImage } from "../Apis/Api/User";
import { useAuth } from "../store/AuthContext";
import { getClassList } from "../Apis/Api/Class";
import LanguageSwitcher from "./LanguageSwitcher"; // 언어변경 상자

import i18n from "../i18n/i18n";
import { useTranslation } from "react-i18next";

function AppBar() {
  const { t } = useTranslation();

  const { isSmallScreen } = useMediaQueryContext();

  const { userRole, roleArray, userData } = useAuth();
  const [userName, setUserName] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [thumbnailImage, setThumnailImage] = useState("");
  const [myClass, setMyClass] = useState([]); //[{grade:"Class1",section:"A"},{grade:"Class3",section:"B"}]
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const NepaliDate = require("nepali-date");
  const todayNepaliDate = new NepaliDate();
  const currentYear = todayNepaliDate.getYear();

  const location = useLocation();
  const goHome = () => {
    navigate("/private/home");
  };

  const goNoticeBoard = () => {
    navigate("/notice-board");
  };

  const goCreateAccount = () => {
    navigate("/private/create-account");
  };

  const goMyProfile = () => {
    navigate("/my-profile");
  };

  const goStudentView = () => {
    navigate("/private/student-view");
  };

  const goTeacherView = () => {
    navigate("/private/teacher-view");
  };

  const goCreateClass = () => {
    navigate("/private/create-class");
  };

  const goClassBoard = (classItem) => {
    navigate(`/class-board/${classItem.grade}-${classItem.section}`, {
      state: classItem,
    });
    handleDrawerClose();
  };

  const goClassInfo = (classItem) => {
    navigate(`/private/class-info/${classItem.grade}-${classItem.section}`, {
      state: classItem,
    });
    handleDrawerClose();
  };

  // const goTodayAttendance = (classItem) => {
  //   navigate(
  //     `/private/class-attendance/today/${classItem.grade}-${classItem.section}`,
  //     {
  //       state: classItem,
  //     }
  //   );
  //   handleDrawerClose();
  // };
  const goAttendance = (classItem) => {
    navigate(
      `/private/class-attendance/report/${classItem.grade}-${classItem.section}`,
      {
        state: classItem,
      }
    );
    handleDrawerClose();
  };
  const goAssignHomeroom = () => {
    navigate("/private/assign-homeroom");
  };

  const goChangePassword = () => {
    navigate("/private/change-password");
  };

  const goCommonCourseManagement = () => {
    navigate("/private/common-course-management");
  };

  const goElectiveCourseManagement = () => {
    navigate("/private/elective-course-management");
  };

  const goChangeGrade = () => {
    navigate("/private/change-grade");
  };
  const handleLogout = () => {
    navigate("/");
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";

  const drawerWidth = 280;

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#1B8EF2",
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const [expanded, setExpanded] = useState({
    userManagement: false,
    classCourseManagement: false,
    classes: false,
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded,
    }));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Drawer가 열려 있고, 클릭한 영역이 Drawer 외부인 경우 Drawer를 닫음
      if (open && !document.getElementById("drawer").contains(event.target)) {
        handleDrawerClose();
      }
    };

    // 문서에 클릭 이벤트 추가
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const userManagementPaths = [
      "/private/create-account",
      "/private/student-view",
      "/private/teacher-view",
      "/private/change-password",
      "/private/change-grade",
    ];
    const classCourseManagementPaths = [
      "/private/create-class",
      "/private/assign-homeroom",
      "/private/common-course-management",
    ];
    const classInfoPath = "/private/class-info";
    const classBoardPath = "/class-board";

    // 초기 expanded 상태 설정
    const newExpanded = {};
    if (Array.isArray(myClass)) {
      myClass.forEach((classItem, index) => {
        const classInfoFullPath = `${classInfoPath}/${classItem.grade}-${classItem.section}`;
        const classBoardFullPath = `${classBoardPath}/${classItem.grade}-${classItem.section}`;

        // 현재 pathname이 classInfoPath 또는 classBoardPath와 일치하는 경우 expanded 설정
        if (
          location.pathname.startsWith(classInfoFullPath) ||
          location.pathname.startsWith(classBoardFullPath)
        ) {
          newExpanded[`class${index}`] = true;
        } else {
          newExpanded[`class${index}`] = false;
        }
      });
    }

    setExpanded((prevExpanded) => ({
      // ...prevExpanded,
      ...newExpanded,
      userManagement: userManagementPaths.some((path) =>
        location.pathname.startsWith(path)
      ),
      classCourseManagement: classCourseManagementPaths.some((path) =>
        location.pathname.startsWith(path)
      ),
      classes:
        location.pathname.startsWith(classInfoPath) ||
        location.pathname.startsWith(classBoardPath),
    }));
  }, [location.pathname, myClass, open]);

  useEffect(() => {
    // Fetch user data based on role
    const fetchUserData = async () => {
      if (userRole === roleArray[0]) {
        setUserName("Administor");
        const result = await getClassList(0, 100, currentYear);
        setMyClass(result?.content || []);
      } else if (userRole === roleArray[1]) {
        const result = await getTeacher(userData.username);
        setUserName(result.name);
        if (result.imageId) {
          const res = await getProfileImage(result.imageId.imageId);
          setThumnailImage(res.imagePath);
        }
        setMyClass(
          result.classId
            ? [
                {
                  grade: result.classId.grade,
                  section: result.classId.section || "",
                  classId: result.classId.classId,
                  year: result.classId.year,
                },
              ]
            : []
        );
      } else if (userRole === roleArray[2]) {
        const result = await getStudent(userData.username);
        setUserName(result.name);
        if (result.imageResponseDTO) {
          const res = await getProfileImage(result.imageResponseDTO.imageId);
          setThumnailImage(res.imagePath);
        }
        setMyClass(
          result.classResponse
            ? [
                {
                  grade: result.classResponse.grade,
                  section: result.classResponse.section,
                  classId: result.classResponse.classId,
                  year: result.classResponse.year,
                },
              ]
            : []
        );
      }
    };

    fetchUserData();
  }, [open]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div"></Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex" }}>
              <LanguageSwitcher />
              <IconButton
                size="medium"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={goMyProfile}
                color="inherit"
              >
                <Avatar alt="User Image" src={thumbnailImage} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          id="drawer"
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: theme.spacing(2),
              width: drawerWidth,
            }}
          >
            <Avatar
              alt="Administrator"
              src={
                thumbnailImage
                  ? thumbnailImage
                  : "/private/images/profile_temp.png"
              }
              sx={{
                width: 60,
                height: 60,
                marginBottom: theme.spacing(2),
              }}
            />{" "}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {userName}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton onClick={goHome} sx={{ paddingLeft: "16px" }}>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color:
                      location.pathname === "/private/home"
                        ? "primary.main"
                        : "none",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("Home")}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/private/home"
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={t("Notice board")} disablePadding>
              <ListItemButton
                onClick={goNoticeBoard}
                sx={{
                  paddingLeft: "16px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color:
                      location.pathname === "/notice-board"
                        ? theme.palette.primary.main
                        : "none",
                  }}
                >
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("Notice board")}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/notice-board"
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          {userRole == roleArray[0] ? (
            <List>
              <Accordion
                sx={{
                  boxShadow: "none",
                  "&::before": { display: "none" },
                  marginBottom: "0px",
                }}
                expanded={expanded.userManagement}
                onChange={handleAccordionChange("userManagement")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    padding: "0 16px",
                    height: "48px",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                    ...(expanded.userManagement && {
                      backgroundColor: theme.palette.action.selected,
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("User Management")} />
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                  <ListItem key={"Create Account"} disablePadding>
                    <ListItemButton onClick={goCreateAccount} sx={{ pl: 10 }}>
                      <ListItemText
                        primary={t("Create Account")}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              location.pathname === "/private/create-account"
                                ? theme.typography.fontWeightBold
                                : theme.typography.fontWeightRegular,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    onClick={goStudentView}
                    key={"View Student"}
                    disablePadding
                  >
                    <ListItemButton sx={{ pl: 10 }}>
                      <ListItemText
                        primary={t("View Student")}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              location.pathname === "/private/student-view"
                                ? theme.typography.fontWeightBold
                                : theme.typography.fontWeightRegular,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    onClick={goTeacherView}
                    key={"View Teacher"}
                    disablePadding
                  >
                    <ListItemButton sx={{ pl: 10 }}>
                      <ListItemText
                        primary={t("View Teacher")}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              location.pathname === "/private/teacher-view"
                                ? theme.typography.fontWeightBold
                                : theme.typography.fontWeightRegular,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    onClick={goChangePassword}
                    key={"Change Password"}
                    disablePadding
                  >
                    <ListItemButton sx={{ pl: 10 }}>
                      <ListItemText
                        primary={t("Change Password")}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              location.pathname === "/private/change-password"
                                ? theme.typography.fontWeightBold
                                : theme.typography.fontWeightRegular,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    onClick={goChangeGrade}
                    key={"Change Grade"}
                    disablePadding
                  >
                    <ListItemButton sx={{ pl: 10 }}>
                      <ListItemText
                        primary={t("Change Grade")}
                        sx={{
                          "& .MuiTypography-root": {
                            fontWeight:
                              location.pathname === "/private/change-grade"
                                ? theme.typography.fontWeightBold
                                : theme.typography.fontWeightRegular,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </AccordionDetails>
              </Accordion>
              {!isSmallScreen ? (
                <Accordion
                  sx={{
                    boxShadow: "none",
                    "&::before": { display: "none" },
                    marginBottom: "0px",
                  }}
                  expanded={expanded.classCourseManagement}
                  onChange={handleAccordionChange("classCourseManagement")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      padding: "0 16px",
                      height: "72px",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                      ...(expanded.classCourseManagement && {
                        backgroundColor: theme.palette.action.selected,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: "40px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("Class/Course Management")} />
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                    <ListItem key={"Create Class"} disablePadding>
                      <ListItemButton onClick={goCreateClass} sx={{ pl: 10 }}>
                        <ListItemText
                          primary={t("Create Class")}
                          sx={{
                            "& .MuiTypography-root": {
                              fontWeight:
                                location.pathname === "/private/create-class"
                                  ? theme.typography.fontWeightBold
                                  : theme.typography.fontWeightRegular,
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"Assign Homeroom"} disablePadding>
                      <ListItemButton
                        onClick={goAssignHomeroom}
                        sx={{ pl: 10 }}
                      >
                        <ListItemText
                          primary={t("Assign Homeroom")}
                          sx={{
                            "& .MuiTypography-root": {
                              fontWeight:
                                location.pathname === "/private/assign-homeroom"
                                  ? theme.typography.fontWeightBold
                                  : theme.typography.fontWeightRegular,
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"Common Course Management"} disablePadding>
                      <ListItemButton
                        onClick={goCommonCourseManagement}
                        sx={{ pl: 10 }}
                      >
                        <ListItemText
                          primary={t("Common Course Management")}
                          sx={{
                            "& .MuiTypography-root": {
                              fontWeight:
                                location.pathname ===
                                "/private/common-course-management"
                                  ? theme.typography.fontWeightBold
                                  : theme.typography.fontWeightRegular,
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <div></div>
              )}
            </List>
          ) : (
            <div></div>
          )}

          <Divider />
          <Box>
            <Accordion
              sx={{
                boxShadow: "none",
                "&::before": { display: "none" },
                marginBottom: "0px",
              }}
              expanded={expanded.classes}
              onChange={handleAccordionChange("classes")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  padding: "0 16px",
                  height: "60px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  ...(expanded.classes && {
                    backgroundColor: "#e0e0e0",
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={t("Class")} />
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                {Array.isArray(myClass) &&
                  myClass.map((classItem, index) => (
                    <Accordion
                      key={`class-${index}`}
                      sx={{
                        boxShadow: "none",
                        "&::before": { display: "none" },
                        marginBottom: "0px",
                      }}
                      expanded={expanded[`class${index}`]}
                      onChange={handleAccordionChange(`class${index}`)}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                          padding: "0 16px",
                          height: "48px",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          ...(expanded[`class${index}`] && {
                            backgroundColor: "#e0e0e0",
                          }),
                        }}
                      >
                        <ListItemText
                          primary={`${classItem.grade}-${classItem.section}`}
                        />
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                        <ListItem key={`class-${index}-info`} disablePadding>
                          <ListItemButton
                            sx={{ pl: 10 }}
                            onClick={() => goClassInfo(classItem)}
                          >
                            <ListItemText primary={t("Class Info")} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem
                          key={`${t("class")}-${index}-${t("board")}`}
                          disablePadding
                        >
                          <ListItemButton
                            sx={{ pl: 10 }}
                            onClick={() => goClassBoard(classItem)}
                          >
                            <ListItemText primary={t("Class Board")} />
                          </ListItemButton>
                        </ListItem>
                        {/* <ListItem
                          key={`class-${index}-attendance`}
                          disablePadding
                        >
                          <ListItemButton
                            sx={{ pl: 10 }}
                            onClick={() => goAttendance(classItem)}
                          >
                            <ListItemText primary={"Attendance"} />
                          </ListItemButton>
                        </ListItem> */}
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </AccordionDetails>
            </Accordion>
          </Box>
          <Divider />
          <List>
            <ListItem key={"My Profile"} disablePadding>
              <ListItemButton
                onClick={goMyProfile}
                sx={{ paddingLeft: "16px" }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color:
                      location.pathname === "/my-profile"
                        ? theme.palette.primary.main
                        : "none",
                  }}
                >
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t("My Profile")}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/my-profile"
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <Box sx={{ mt: "auto" }}>
            <Divider />
            <List>
              <ListItem key={"Logout"} disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{ paddingLeft: "16px" }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("Logout")} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </div>
  );
}

export default AppBar;
