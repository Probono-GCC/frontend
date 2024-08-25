import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
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
  AccountCircle,
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
import { getStudent, getTeacher, getProfileImage } from "../Apis/Api/User";
import { useAuth } from "../store/AuthContext";
import { getClassList } from "../Apis/Api/Class";
function AppBar() {
  const { userRole, roleArray, userData } = useAuth();
  const [userName, setUserName] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [thumbnailImage, setThumnailImage] = useState("");
  const [myClass, setMyClass] = useState([]); //[{grade:"Class1",section:"A"},{grade:"Class3",section:"B"}]

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
    console.log("app bar class", classItem);
    navigate(`/class-board/${classItem.grade}-${classItem.section}`, {
      state: classItem,
    });
  };

  const goClassInfo = (classItem) => {
    navigate(`/private/class-info/${classItem.grade}-${classItem.section}`, {
      state: classItem,
    });
  };

  const goSubjectBoard = () => {
    navigate("/subject-board");
  };

  const goSubjectInfo = () => {
    navigate("/private/subject-info");
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
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={goMyProfile}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const [expanded, setExpanded] = useState({});
  // myClass가 업데이트될 때 expanded 상태 동적으로 설정
  useEffect(() => {
    const newExpanded = {};
    if (Array.isArray(myClass)) {
      myClass.forEach((_, index) => {
        newExpanded[`class${index}`] = false;
      });
      setExpanded(newExpanded);
    }
  }, [myClass]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded,
    }));
  };
  // const handleAccordionChange = (panel) => (event, isExpanded) => {
  //   setExpanded((prevExpanded) => ({
  //     ...prevExpanded,
  //     [panel]: isExpanded,
  //   }));
  // };

  // 하위 경로 확인 및 Accordion 상태 설정 (classes 추후 수정 필요)
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
    if (
      userManagementPaths.some((path) => location.pathname.startsWith(path))
    ) {
      setExpanded("userManagement");
    }
    if (
      classCourseManagementPaths.some((path) =>
        location.pathname.startsWith(path)
      )
    ) {
      setExpanded("classCourseManagement");
    }
    if (userRole == roleArray[0]) {
      setUserName("Administor");
      getClassList(0, 100, currentYear).then((result) => {
        if (result && result.content) {
          const myClassList = result.content.map((item) => ({
            grade: item.grade,
            section: item.section ? item.section : "",
            classId: item.classId,
            year: item.year,
          }));
          console.log("admin classlist", myClassList);
          setMyClass(myClassList);
        } else {
          setMyClass([{ grade: "", section: "", classId: "", year: "" }]);
        }
      });
    } else if (userRole == roleArray[1]) {
      console.log("getTeacher");
      getTeacher(userData.username).then((result) => {
        setUserName(result.name); //이름 설정
        if (result.imageId) {
          //이미지 설정
          getProfileImage(result.imageId.imageId).then((res) => {
            setThumnailImage(res.imagePath);
            console.log(res, "result");
          });
        }
        //item형태
        // "classId": {
        //   "classId": 0,
        //   "year": 0,
        //   "grade": "PLAYGROUP",
        //   "section": "A"
        // },
        if (
          result.classId &&
          result.classId.grade &&
          result.classId.section &&
          result.classId.classId &&
          result.classId.year
        ) {
          // const myClassList = result.classId.map((item) => ({
          //   grade: item.grade,
          //   section: item.section ? item.section : "",
          // }));
          // setMyClass(myClassList);
          setMyClass([
            {
              grade: result.classId.grade,
              section: result.classId.section,
              classId: result.classId.classId,
              year: result.classId.year,
            },
          ]);
        } else {
          setMyClass([{ grade: "", section: "", calssId: "", year: "" }]);
        }
      });
    } else if (userRole == roleArray[2]) {
      getStudent(userData.username).then((result) => {
        console.log("getstudent?", result);
        if (result) {
          setUserName(result.name);
          if (result.imageResponseDTO) {
            getProfileImage(result.imageResponseDTO.imageId).then((res) => {
              setThumnailImage(res.imagePath);
              console.log(res, "resujlt");
            });
          }
          if (
            result.classResponse &&
            result.classResponse.grade &&
            result.classResponse.section &&
            result.classResponse.classId &&
            result.classResponse.year
          ) {
            setMyClass([
              {
                grade: result.classResponse.grade,
                section: result.classResponse.section,
                classId: result.classResponse.classId,
                year: result.classResponse.year,
              },
            ]);
            // handleMyClass({ grade: result.grade, section: result.section });
          } else {
            setMyClass({ grade: "", section: "", classId: "", year: "" });
          }
        }
      });
    }
  }, [location.pathname]);

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
            {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box> */}
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
                      location.pathname === "/private/"
                        ? "primary.main"
                        : "none",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Home"}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/private/"
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Notice board"} disablePadding>
              <ListItemButton
                onClick={goNoticeBoard}
                sx={{ paddingLeft: "16px" }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color:
                      location.pathname === "/private/notice-board"
                        ? theme.palette.primary.main
                        : "none",
                  }}
                >
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Notice board"}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/private/notice-board"
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
                  <ListItemText primary={"User Management"} />
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                  <ListItem key={"Create Account"} disablePadding>
                    <ListItemButton onClick={goCreateAccount} sx={{ pl: 10 }}>
                      <ListItemText
                        primary={"Create Account"}
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
                        primary={"View Student"}
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
                        primary={"View Teacher"}
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
                        primary={"Change Password"}
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
                        primary={"Change Grade"}
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
                  <ListItemText primary={"Class/Course Management"} />
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                  <ListItem key={"Create Class"} disablePadding>
                    <ListItemButton onClick={goCreateClass} sx={{ pl: 10 }}>
                      <ListItemText
                        primary={"Create Class"}
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
                    <ListItemButton onClick={goAssignHomeroom} sx={{ pl: 10 }}>
                      <ListItemText
                        primary={"Assign Homeroom"}
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
                        primary={"Common Course Management"}
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
              {/* <ListItem key={"Elective Course Management"} disablePadding>
                <ListItemButton
                  onClick={goElectiveCourseManagement}
                  sx={{ paddingLeft: "16px" }}
                >
                  <ListItemIcon sx={{ minWidth: "40px" }}>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Elective Course Management"} />
                </ListItemButton>
              </ListItem> */}
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
                <ListItemText primary={"Class"} />
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
                            <ListItemText primary={"Class Info"} />
                          </ListItemButton>
                        </ListItem>
                        <ListItem key={`class-${index}-board`} disablePadding>
                          <ListItemButton
                            sx={{ pl: 10 }}
                            onClick={() => goClassBoard(classItem)}
                          >
                            <ListItemText primary={"Class Board"} />
                          </ListItemButton>
                        </ListItem>
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
                  primary={"My Profile"}
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
                  <ListItemText primary={"Logout"} />
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
