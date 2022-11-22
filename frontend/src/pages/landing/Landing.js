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
import { useEffect, useState } from "react";
import { url } from "../../config/global";
import axios from "axios";

export default function Landing() {
  const [googleIdentityID, setGoogleIdentityID] = useState(null);
  const [permission, setPermission] = useState(-1);
  // const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    let options = {
      method: "GET",
      url: `${url}/googleIdentity`,
    };
    axios.request(options).then((res) => {
      setGoogleIdentityID(res.data.id);
    });
  }, []);

  return (
    <div>
      <Header name={"Landing"} />

      <div id="google">
        <GoogleOAuthProvider clientId={googleIdentityID}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              let p = googleSignIn(credentialResponse);
              setPermission(p);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>

      <Button variant="contained" onClick={() => console.log(permission)}>
        Click me
      </Button>

      <div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {permission >= 2 && (
            <Link to="/manager">
              <Button>Manager</Button>
            </Link>
          )}
          {permission >= 1 && (
            <Link to="/cashier">
              <Button>Cashier</Button>
            </Link>
          )}
          {permission >= 0 && (
            <div>
              <Link to="/customer">
                <Button variant="contained">Customer</Button>
              </Link>
            </div>
          )}
        </ButtonGroup>
      </div>
    </div>
  );

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
      let permission = res.data.permission; // permission (0 = customer, 1 = cashier / driver, 2 = manager)
      let err = res.data.err; // will send error if there was an error
      let message = res.data.message; // will send a message if user is returned
      if (err) console.log(err);
      console.log(message);
      console.log(permission);
      return permission;
      // setUserInfo({name: name, email: email, permission: permission})
      // probably want to save permission somewhere and also probably want to move this stuff to its own page
    });
  }
}
