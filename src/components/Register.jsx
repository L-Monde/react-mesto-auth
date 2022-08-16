import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <section className="authorize">
      <h2 className="authorize__heading">Регистрация</h2>
      <AuthForm
        formName={"register"}
        buttonText={"Зарегистрироваться"}
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        handleFormSubmit={handleFormSubmit}
      ></AuthForm>
      <p className="authorize__question">
        Уже есть аккаунт?&nbsp;&nbsp;&nbsp;
        <Link to="/sign-in" className="authorize__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
