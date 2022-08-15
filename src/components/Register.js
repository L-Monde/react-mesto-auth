import React from "react";
import { Link } from "react-router-dom";

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
      <form
        className="authorize__form"
        name="login"
        onSubmit={handleFormSubmit}
      >
        <input
          className="authorize__input authorize__input_email"
          type="email"
          placeholder="Email:"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="authorize__input authorize__input_password"
          type="password"
          placeholder="Password:"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className="authorize__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
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
