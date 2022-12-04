import { useEffect, useState } from "react";
import { useUserInfo, useUserInfoUpdate } from "../../contexts/UserContext";
import "../../styles/master.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { url } from "../../config/global";
import axios from "axios";

export default function Landing() {
  const userInfo = useUserInfo(); // get user info from global state
  const [userStateInfo, setUserStateInfo] = useState(userInfo);
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

  useEffect(() => {
    console.log("UPDATE", userInfo);
    setUserStateInfo(userInfo);
    setPermission(userInfo === null ? -1 : userInfo.permission);
  }, [updateUserInfo]);

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
    marginBottom: "15px",
  };

  const googleStyle = {
    marginBottom: "30px",
  };

  return (
    <div className="mainBody">
      <Header name={"Landing"} />
      <div style={content} className="content">
        {userStateInfo === null && (
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

        <div className="landingTri">
          {permission >= 0 && (
            <div className="landingTri">
              <div style={content}>
                {permission >= 2 && (
                  <Link to="/manager">
                    <Button variant="contained">Manager</Button>
                  </Link>
                )}
                {permission >= 1 && (
                  <Link to="/cashier">
                    <Button variant="contained">Cashier</Button>
                  </Link>
                )}
              </div>
              {permission >= 0 && (
                <div className="landingTri" style={content}>
                  <Link to="/customer">
                    <Button variant="contained">Customer</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
