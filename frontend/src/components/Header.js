import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import { Grid, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useUserInfo, useUserInfoUpdate } from "../contexts/UserContext";
import { url, langEnglish } from "../config/global.js"
import { translateComponents } from "../config/translate";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Header({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [languages, setLanguages] = useState([]);
  const open = Boolean(anchorEl);
  const openProfileMenu = Boolean(profileAnchorEl);

  const userInfo = useUserInfo();
  const updateUserInfo = useUserInfoUpdate();

  const convertLanguageNames = (langs) => {
    let langList = [...langs];
    var langsProcessed = 0;

    langs.forEach((element, index) => {
      // Make the languages written in their own language
      let options = {
        method: 'GET',
        url: `${url}/translate`,
        params: {
          text: element.name,
          target: element.code
        }
      }

      axios.request(options).then((res) => {
        // Set the name to the translated value
        langList[index].name = res.data;

        langsProcessed++;

        if (langsProcessed === langList.length) {
          // The last 3 languages are repeats for some reason
          setLanguages(langList);
        }
      })

    })

  }

  useEffect(() => {
    setLanguages(langEnglish);
    convertLanguageNames(langEnglish);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (e) => {
    setProfileAnchorEl(e.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const onSelectLanguage = (language) => {
    console.log("Translate page to ", language);
    translateComponents(language);
    handleClose();
  };

  const onLogout = () => {
    updateUserInfo(null);
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
            {languages.map((langInfo, index) => (
              <MenuItem
                key={index}
                onClick={() => onSelectLanguage(langInfo.code)}
              >
                {langInfo.name}
              </MenuItem>
            ))}
          </Menu>
          {userInfo && (
            <>
              <Tooltip title="Profile">
                <IconButton onClick={handleProfileClick}>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {userInfo.name.first.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                id="profile-menu"
                anchorEl={profileAnchorEl}
                open={openProfileMenu}
                onClose={handleProfileClose}
                MenuListProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <Link to="/">
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
