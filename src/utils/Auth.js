const base_url = "https://auth.nomoreparties.co";
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  if (res.status === 400) {
    return Promise.reject(`Ошибка передачи данных`);
  } else if (res.status === 401) {
    return Promise.reject(`Ошибка передаваемыч данных`);
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserData = (token) => {
  return fetch(base_url + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
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
  }).then(checkResponse);
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
  }).then(checkResponse);
};
