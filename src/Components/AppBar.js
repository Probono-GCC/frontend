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
import { useNavigate } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

export default function AppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  const goNoticeBoard = () => {
    navigate("/notice-board");
  };

  const goStudentView = () => {
    navigate("/student-view");
  }

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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
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

  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
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
    })
  );

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
            <Typography variant="h6" noWrap component="div">
              Home
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
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
            <Accordion
              sx={{
                boxShadow: "none",
                "&::before": { display: "none" },
                marginBottom: "0px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ padding: "0 16px", height: "48px" }}
              >
                <ListItem key={"User Management"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"User Management"} />
                  </ListItemButton>
                </ListItem>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, marginTop: 0 }}>
                <ListItem key={"Create Account"} disablePadding>
                  <ListItemButton sx={{ pl: 10 }}>
                    <ListItemText primary={"Create Account"} />
                  </ListItemButton>
                </ListItem>
                <ListItem onClick={goStudentView} key={"View Student"} disablePadding>
                  <ListItemButton sx={{ pl: 10 }}>
                    <ListItemText primary={"View Student"} />
                  </ListItemButton>
                </ListItem>
              </AccordionDetails>
            </Accordion>
            <ListItem key={"Home"} disablePadding>
              <ListItemButton
                onClick={() => console.log("Go Home")}
                sx={{ paddingLeft: "16px" }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Notice board"} disablePadding>
              <ListItemButton
                onClick={() => console.log("Go Notice Board")}
                sx={{ paddingLeft: "16px" }}
              >
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary={"Notice board"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key={"User Management"} disablePadding>
              <ListItemButton sx={{ paddingLeft: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"User Management"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Class/Course Management"} disablePadding>
              <ListItemButton sx={{ paddingLeft: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={"Class/Course Management"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Elective Course Management"} disablePadding>
              <ListItemButton sx={{ paddingLeft: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary={"Elective Course Management"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key={"Classes"} disablePadding>
              <ListItemButton sx={{ paddingLeft: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={"Classes"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key={"My Profile"} disablePadding>
              <ListItemButton sx={{ paddingLeft: "16px" }}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={"My Profile"} />
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
