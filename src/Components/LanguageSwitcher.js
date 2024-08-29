import React, { useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import i18n from "../i18n/i18n";
import { fontSize } from "@mui/system";

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (lang) => {
    i18n.changeLanguage(lang); // 언어를 변경합니다
    setAnchorEl(null);
    console.log("language changed to ", i18n.language);
  };
  useEffect(() => {}, []);
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="change language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        color="inherit"
        sx={{ marginRight: 1 }}
      >
        <LanguageIcon sx={{ fontSize: "30px" }} />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)}
      >
        <MenuItem onClick={() => handleMenuClose("en")}>English</MenuItem>
        <MenuItem onClick={() => handleMenuClose("ne")}>
          नेपाली (Nepali)
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
