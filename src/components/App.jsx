//Надеюсь, теперь ошибка исправлена)
//Не совсем понимаю, что её вызывает

import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import * as auth from "../utils/Auth";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

function App() {
  //popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isActive: false });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, renderCards] = useState([]);

  const [isLoggedIn, switchIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("Email address");
  const [success, switchSuccess] = useState(false);
  const history = useHistory();

  const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-40",
    headers: {
      authorization: "f6e30d96-a451-4ec9-81ba-5b034a8c8256",
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    Promise.all([api.getCardsArray(), api.getProfileInfo()])
      .then((res) => {
        renderCards(res[0]);
        setCurrentUser(res[1]);
      })
      .catch((err) => console.log("Ошибка:", err));
  }, []);

  //card like switch
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        renderCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log("Ошибка:", err));
  }

  //card deletion stuff
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        renderCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log("Ошибка:", err));
  }

  //avatar popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleUpdateAvatar(data) {
    api
      .changeProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка:", err));
  }

  //profile popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleUpdateUser(data) {
    api
      .changeProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка:", err));
  }

  //content popup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((res) => {
        renderCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка:", err));
  }

  //image popup
  function handleCardClick(card) {
    setSelectedCard({
      isActive: true,
      ...card,
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isActive: false });
    setIsConfirmPopupOpen(false);
  }

  //authorization functions
  function handleProfileRegister({ email, password }) {
    auth
      .signUp({ email, password })
      .then(() => {
        switchSuccess(true);
        handleConfirmRegister();
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log("Ошибка:", err);
        switchSuccess(false);
        setIsConfirmPopupOpen(true);
      });
  }
  function handleConfirmRegister() {
    setIsConfirmPopupOpen(true);
  }
  function handleProfileLogin({ password, email }) {
    auth
      .signIn({ password, email })
      .then((res) => {
        switchIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("jwt", JSON.stringify(res.token));
        history.push("/");
      })
      .catch((err) => {
        handleLoginError();
        console.log(err);
      });
  }
  function handleLoginError() {
    switchSuccess(false);
    setIsConfirmPopupOpen(true);
  }
  function handleProfileTokenLogin() {
    console.log();
    //"если проблема именно с json, то должно работать всё, кроме токена"
    /*
      if (localStorage.getItem("jwt")) {
      const preToken = localStorage.getItem("jwt");
      const token = JSON.parse(preToken);
      auth
        .getUserData(token)
        .then((res) => {
          console.log(res);
          setUserEmail(res.data.email);
          switchIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log("Ошибка:", err);
        });
    }
      */
  }
  function handleProfileLogout() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    switchIsLoggedIn(false);
  }

  useEffect(() => {
    handleProfileTokenLogin();
  }, []);
  /*
        
     <ProtectedRoute
            
            element={
              
            }
          ></ProtectedRoute>       
*/
  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/sign-up">
            <Header path="/sign-in" text="Войти" isLoggedIn={isLoggedIn} />
            <Register onRegister={handleProfileRegister} />
          </Route>
          <Route path="/sign-in">
            <Header
              path="/sign-up"
              text="Регистрация"
              isLoggedIn={isLoggedIn}
            />
            <Login onLogin={handleProfileLogin} />
          </Route>

          <ProtectedRoute
            path="/"
            isLoggedIn={isLoggedIn}
            onLogOut={handleProfileLogout}
            userEmail={userEmail}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            component={Main}
          />
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          success={success}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
