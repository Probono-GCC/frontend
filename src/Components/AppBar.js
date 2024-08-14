import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BookIcon from "@mui/icons-material/Book";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

function AppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const location = useLocation();
  const goHome = () => {
    navigate("/");
  };

  const goNoticeBoard = () => {
    navigate("/notice-board");
  };

  const goCreateAccount = () => {
    navigate("/create-account");
  };

  const goMyProfile = () => {
    navigate("/my-profile");
  };

  const goStudentView = () => {
    navigate("/student-view");
  };

  const goTeacherView = () => {
    navigate("/teacher-view");
  };

  const goCreateClass = () => {
    navigate("/create-class");
  };

  const goClassBoard = () => {
    navigate("/class-board");
  };

  const goClassInfo = () => {
    navigate("/class-info");
  };

  const goSubjectBoard = () => {
    navigate("/subject-board");
  };

  const goSubjectInfo = () => {
    navigate("/subject-info");
  };

  const goAssignHomeroom = () => {
    navigate("/assign-homeroom");
  };

  const goChangePassword = () => {
    navigate("/change-password");
  };

  const goCommonCourseManagement = () => {
    navigate("/common-course-management");
  };

  const goElectiveCourseManagement = () => {
    navigate("/elective-course-management");
  };

  const goChangeGrade = () => {
    navigate("/change-grade");
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
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
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
  // const [expanded, setExpanded] = useState(false);

  // const handleAccordionChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };
  const [expanded, setExpanded] = useState({
    userManagement: false,
    classCourseManagement: false,
    classes: false,
    class1A: false,
    class1B: false,
    class10Physics: false,
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded,
    }));
  };

  // 하위 경로 확인 및 Accordion 상태 설정 (classes 추후 수정 필요)
  useEffect(() => {
    const userManagementPaths = [
      "/create-account",
      "/student-view",
      "/teacher-view",
      "/change-password",
      "/change-grade",
    ];
    const classCourseManagementPaths = [
      "/create-class",
      "/assign-homeroom",
      "/common-course-management",
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
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
              src="/images/profile_temp.png"
              sx={{
                width: 60,
                height: 60,
                marginBottom: theme.spacing(2),
              }}
            />{" "}
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Administrator
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton onClick={goHome} sx={{ paddingLeft: "16px" }}>
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                    color: location.pathname === "/" ? "primary.main" : "none",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Home"}
                  sx={{
                    "& .MuiTypography-root": {
                      fontWeight:
                        location.pathname === "/"
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
                      location.pathname === "/notice-board"
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
                            location.pathname === "/create-account"
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
                            location.pathname === "/student-view"
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
                            location.pathname === "/teacher-view"
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
                            location.pathname === "/change-password"
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
                            location.pathname === "/change-grade"
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
                            location.pathname === "/create-class"
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
                            location.pathname === "/assign-homeroom"
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
                            location.pathname === "/common-course-management"
                              ? theme.typography.fontWeightBold
                              : theme.typography.fontWeightRegular,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <ListItem key={"Elective Course Management"} disablePadding>
              <ListItemButton
                onClick={goElectiveCourseManagement}
                sx={{ paddingLeft: "16px" }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={"Elective Course Management"} />
              </ListItemButton>
            </ListItem>
          </List>
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
                <ListItemText primary={"Classes"} />
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                <Accordion
                  sx={{
                    boxShadow: "none",
                    "&::before": { display: "none" },
                    marginBottom: "0px",
                  }}
                  expanded={expanded.class1A}
                  onChange={handleAccordionChange("class1A")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      padding: "0 16px",
                      height: "48px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      ...(expanded.class1A && {
                        backgroundColor: "#e0e0e0",
                      }),
                      ...(expanded && {
                        minHeight: "48px !important",
                      }),
                    }}
                  >
                    <ListItemText primary={"Class 1-A"} />
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                    <ListItem key={"Class 1-A Info"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goClassInfo}>
                        <ListItemText primary={"Class Info"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"Class 1-A Board"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goClassBoard}>
                        <ListItemText primary={"Class Board"} />
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
                  expanded={expanded.class1B}
                  onChange={handleAccordionChange("class1B")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      padding: "0 16px",
                      height: "48px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      ...(expanded.class1B && {
                        backgroundColor: "#e0e0e0",
                      }),
                      ...(expanded && {
                        minHeight: "48px !important",
                      }),
                    }}
                  >
                    <ListItemText primary={"Class 1-B"} />
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                    <ListItem key={"Class 1-B Info"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goClassInfo}>
                        <ListItemText primary={"Class Info"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"Class 1-B Board"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goClassBoard}>
                        <ListItemText primary={"Class Board"} />
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
                  expanded={expanded.class10Physics}
                  onChange={handleAccordionChange("class10Physics")}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      padding: "0 16px",
                      height: "48px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      ...(expanded.class1B && {
                        backgroundColor: "#e0e0e0",
                      }),
                      ...(expanded && {
                        minHeight: "48px !important",
                      }),
                    }}
                  >
                    <ListItemText primary={"Class 10-Physics"} />
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                    <ListItem key={"Class 10-Physics Info"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goSubjectInfo}>
                        <ListItemText primary={"Class Info"} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key={"Class 10-Physics Board"} disablePadding>
                      <ListItemButton sx={{ pl: 10 }} onClick={goSubjectBoard}>
                        <ListItemText primary={"Class Board"} />
                      </ListItemButton>
                    </ListItem>
                  </AccordionDetails>
                </Accordion>
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
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default AppBar;
