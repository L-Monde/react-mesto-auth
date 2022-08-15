const base_url = "https://auth.nomoreparties.co";

export const getUserData = (token) => {
  return fetch(base_url + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 400) {
        return Promise.reject(`Ошибка передачи токена`);
      } else if (res.status === 401) {
        return Promise.reject(`Ошибка передаваемого токена`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log("Ошибка:", err));
};

export const signUp = ({ email, password }) => {
  return fetch(base_url + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 400) {
        return Promise.reject(`Ошибка заполнения формы`);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log("Ошибка:", err));
};

export const signIn = ({ password, email }) => {
  return fetch(base_url + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      if (res.status === 400) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else if (res.status === 401) {
        return Promise.reject(
          `Ошибка: пользователь с email ${email} не найден`
        );
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log("Ошибка:", err));
};
