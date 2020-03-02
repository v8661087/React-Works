import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../../firebase.js";
import { AuthContext } from "./Auth";

const Login = () => {
  const handleLogin = async e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/CommentApp" />;
  }

  return (
    <div className="login-page">
      <form action="" className="login-form" onSubmit={handleLogin}>
        <h1>登入</h1>
        <div className="login-form__field">
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
            defaultValue="kuo1228@gmail.com"
          />
        </div>
        <div className="login-form__field">
          <input
            name="password"
            type="password"
            placeholder="Password"
            defaultValue="kuo1228"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="login-form__button">
          登入
        </button>
        <div className="bottom-text">
          <li>
            還沒帳號嗎? <Link to="./SignUp">註冊</Link>
          </li>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
