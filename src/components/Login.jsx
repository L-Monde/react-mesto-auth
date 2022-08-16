import React from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    onLogin({ password, email });
  }

  return (
    <section className="authorize">
      <h2 className="authorize__heading">Войти</h2>
      <AuthForm
        formName={"login"}
        buttonText={"Войти"}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        handleFormSubmit={handleFormSubmit}
      ></AuthForm>
    </section>
  );
}

export default Login;
