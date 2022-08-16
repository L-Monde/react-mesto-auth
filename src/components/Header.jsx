import React from "react";

import { Link } from "react-router-dom";

function Header({ isLoggedIn, userEmail, text, path, onLogOut }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__info">
        {isLoggedIn ? <p className="">{userEmail}&nbsp;&nbsp;</p> : ""}
        {isLoggedIn ? (
          <p className="header__link" onClick={onLogOut}>
            &nbsp;&nbsp;{text}
          </p>
        ) : (
          <Link to={path} className="header__link">
            {text}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
