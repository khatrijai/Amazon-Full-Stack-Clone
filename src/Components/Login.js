import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  function updateChange(e) {
    console.log(e.target.value);

    setCredentials(() => {
      return {
        ...credentials,
        [e.target.type]: e.target.value,
      };
    });
  }
  function signInGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (result) {
          history.push("/");
        }
        // ...
      })
      .catch((error) => alert(error.message));
  }

  function signIn(e) {
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  }

  function registerAccount(e) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  }

  return (
    <>
      <Link to="/">
        <div className="amz-img">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" />
        </div>
      </Link>
      <div className="amz-login">
        <h3>Sign-in</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              <b>E-mail</b>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
              value={credentials.email}
              onChange={(e) => updateChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              <b>Password</b>
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => updateChange(e)}
              required
            />
          </Form.Group>
          <Button
            className="signin-btn"
            variant="warning"
            type="submit"
            onClick={(e) => signIn(e)}
          >
            Sign in
          </Button>

          {/* <Button
            className="signin-btn"
            variant="warning"
            type="submit"
            onClick={(e) => signInGoogle(e)}
          >
            Sign in with Google
          </Button> */}
          <img className="google-sign-in" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" onClick={(e) => signInGoogle(e)}/>
        </Form>
        <p>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of Use and
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>
        <Button
          className="create-new-account-btn"
          type="submit"
          onClick={(e) => registerAccount(e)}
        >
          Create a new account
        </Button>
      </div>
    </>
  );
}
