import { useEffect, useState } from "react";
import { useUserInfo, useUserInfoUpdate } from "../../contexts/UserContext";
import "../../styles/master.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { url } from "../../config/global";
import axios from "axios";
import { Box, Stack } from "@mui/material";

export default function Landing() {
  const userInfo = useUserInfo(); // get user info from global state
  const updateUserInfo = useUserInfoUpdate();

  const [googleIdentityID, setGoogleIdentityID] = useState(null);
  const [permission, setPermission] = useState(
    userInfo === null ? -1 : userInfo.permission
  );

  useEffect(() => {
    let options = {
      method: "GET",
      url: `${url}/googleIdentity`,
    };
    axios.request(options).then((res) => {
      setGoogleIdentityID(res.data.id);
    });
  }, []);

  function googleSignIn(response) {
    let decoded = jwt_decode(response.credential);
    let name = { first: decoded.given_name, last: decoded.family_name };
    let email = decoded.email;
    let options = {
      method: "GET",
      url: `${url}/permission`,
      params: { email: email, name: name },
    };

    axios.request(options).then((res) => {
      let p = res.data.permission; // permission (0 = customer, 1 = cashier / driver, 2 = manager)
      let err = res.data.err; // will send error if there was an error
      let message = res.data.message; // will send a message if user is returned
      if (err) console.log(err);
      console.log(message);
      console.log(p);
      setPermission(p);
      updateUserInfo({ name: name, email: email, permission: p });
      // probably want to save permission somewhere and also probably want to move this stuff to its own page
    });
  }

  const content = {
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "red",
    marginBottom: "15px",
  };

  const googleStyle = {
    marginBottom: "30px",
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Header name={"Landing"} />
      <Stack justifyContent="center" alignItems="center" height="80%">
        <div style={content} className="content">
          {userInfo === null && (
            <div id="google" style={googleStyle}>
              <GoogleOAuthProvider clientId={googleIdentityID}>
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    googleSignIn(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          )}

          <div>
            {permission >= 0 && (
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                {permission >= 2 && (
                  <Link to="/manager">
                    <Button variant="contained" size="large" fullWidth>
                      Manager
                    </Button>
                  </Link>
                )}
                {permission >= 1 && (
                  <Link to="/cashier">
                    <Button variant="contained" size="large" fullWidth>
                      Cashier
                    </Button>
                  </Link>
                )}
                {permission >= 0 && (
                  <div style={content}>
                    <Link to="/customer">
                      <Button variant="contained" size="large" fullWidth>
                        Customer
                      </Button>
                    </Link>
                  </div>
                )}
              </Stack>
            )}
          </div>
        </div>
      </Stack>
    </Box>
  );
}
