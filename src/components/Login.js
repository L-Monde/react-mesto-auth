import React from "react";

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
      <form
        className="authorize__form"
        name="login"
        onSubmit={handleFormSubmit}
      >
        <input
          className="authorize__input authorize__input_email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="authorize__input authorize__input_password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button className="authorize__submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
