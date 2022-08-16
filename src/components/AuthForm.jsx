function AuthForm({
  formName,
  buttonText,
  email,
  setEmail,
  password,
  setPassword,
  handleFormSubmit,
}) {
  return (
    <form
      className="authorize__form"
      name={formName}
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
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
