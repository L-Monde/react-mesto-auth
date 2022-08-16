import React from "react";

function Popup({ isOpen, onClose, children }) {
  const popup = React.useRef();

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <article className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        {children}
        <h2 className="popup__heading"> {} </h2>
      </article>
    </div>
  );
}

export default Popup;
