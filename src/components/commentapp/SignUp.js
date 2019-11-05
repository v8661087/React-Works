import React, { useCallback,useContext } from "react";
import { withRouter } from "react-router";
import firebase from "../../firebase";
import { AuthContext } from "./Auth.js";
import {Redirect,Link} from "react-router-dom"

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/CommentApp");
    } catch (error) {
      alert(error);
    }
  }, [history]);
  
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/CommentApp" />;
  }

  return (
    <div className="login-page">
      <form action="" className="login-form" onSubmit={handleSignUp}>
        <h1>註冊</h1>
        <div className="login-form__field">
          <input name="email" type="email" placeholder="Email" autoComplete="off"/>
        </div>
        <div className="login-form__field">
          <input name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-form__button">註冊</button>
        <div className="bottom-text">
           <li>已經有帳號了? <Link to="./Login">登入</Link></li>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
