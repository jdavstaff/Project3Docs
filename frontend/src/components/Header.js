import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import { Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useUserInfo } from "../contexts/UserContext";

export default function Header({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const open = Boolean(anchorEl);

  const userInfo = useUserInfo();

  useEffect(() => {
    let lang = [
      "english",
      "spanish",
      "german",
      "french",
      "a",
      "b",
      "c",
      "korean",
    ];

    // FIXME: should get list of languages from API

    console.log(lang);
    setLanguages(lang);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelectLanguage = (language) => {
    console.log("Translate page to ", language);
    handleClose();
  };
  const headerStyle = {
    textAlign: "center",
    backgroundColor: "#F3F3F3",
    padding: "20px 0",
    marginBottom: "10px",
    margin: "0 0 25px 0",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  };

  return (
    <Grid
      container
      style={headerStyle}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <h1 style={{ textAlign: "center" }}>{name}</h1>
      </Grid>
      <Grid item xs={4}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Tooltip title="Translate">
            <IconButton onClick={handleClick}>
              <GTranslateIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: "200px",
                width: "20ch",
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem onClick={() => onSelectLanguage(lang)}>{lang}</MenuItem>
            ))}
          </Menu>
          {userInfo && (
            <Tooltip title="Profile">
              <IconButton>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {userInfo.name.first.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
