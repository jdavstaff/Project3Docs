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
  const [googleIdentityID, setGoogleIdentityID] = useState(null);
  const [permission, setPermission] = useState(-1);

  const userInfo = useUserInfo(); // get user info from global state
  const updateUserInfo = useUserInfoUpdate();

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

  return (
    <div className="mainBody">
      <Header name={"Landing"} />

      <div id="google">
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
      <button onClick={() => console.log(userInfo)}>Click me</button>
      <div className="landingTri">
        <ButtonGroup className="buttonGroup shadow-none"
          variant="contained"
          aria-label="outlined primary button group">
          {permission >= 2 && (
            <Link to="/manager">
              <Button class="button">Manager</Button>
            </Link>
          )}
          {permission >= 1 && (
            <Link to="/cashier">
              <Button class="button" >Cashier</Button>
            </Link>
          )}
        </ButtonGroup>
        {permission >= 0 && (
          <div className="landingTri">
            <Link to="/customer">
              <Button variant="contained" class="button">Customer</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
