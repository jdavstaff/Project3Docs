import "../../styles/master.scss";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useEffect, useState } from "react";
import { url } from '../../config/global'
import axios from 'axios'


export default function Landing() {

  const [googleIdentityID, setGoogleIdentityID] = useState(null)
  // const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    let options = {
      method: 'GET',
      url: `${url}/googleIdentity`
    }
    axios.request(options).then((res) => {
      setGoogleIdentityID(res.data.id)
    })
  }, [])

  return (
    <div className="mainBody">
      <Header name={"Landing"} />
      <div className="landingTri">
        <ButtonGroup className="buttonGroup shadow-none"
          variant="contained"
          aria-label="outlined primary button group">
          <Link to="/manager">
            <Button class="button">Manager</Button>
          </Link>
          <Link to="/cashier">
            <Button class="button" >Cashier</Button>
          </Link>
          <Link to="/driver">
            <Button class="button" >Driver</Button>
          </Link>
        </ButtonGroup>
      </div>
      <div className="landingTri">
        <Link to="/customer">
          <Button variant="contained" class="button">Customer</Button>
        </Link>
      </div>
    </div>
  );

  function googleSignIn(response) {
    let decoded = jwt_decode(response.credential)
    let name = {first: decoded.given_name, last: decoded.family_name}
    let email = decoded.email
    let options = {
      method: 'GET',
      url: `${url}/permission`,
      params: {email: email, name: name}
    }
    axios.request(options).then((res) => {
      let permission = res.data.permission // permission (0 = customer, 1 = cashier / driver, 2 = manager)
      let err = res.data.err // will send error if there was an error
      let message = res.data.message // will send a message if user is returned
      console.log(message)
      console.log(permission)
      // setUserInfo({name: name, email: email, permission: permission})
      if(err) console.log(err)
      // probably want to save permission somewhere and also probably want to move this stuff to its own page
    })
  }
}

