import AppBar from "../Components/AppBar";
import Calender from "../Components/Calender";
import NoticeStack from "../Components/NoticeStack";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Home() {
  return (
    <div>
      <AppBar />
      <Box sx={{ marginBottom: 5 }}>
        <Calender />
      </Box>
      <NoticeStack />
      <Box sx={{ marginTop: 10 }} />
    </div>
  );
}

export default Home;
