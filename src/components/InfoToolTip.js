import Popup from "./Popup";

function InfoToolTip({ isOpen, onClose, success }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div
        className={`popup__image ${
          success ? "popup__image_yep" : "popup__image_nope"
        }`}
      ></div>
      <p className="popup__message">
        {success
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </p>
    </Popup>
  );
}

export default InfoToolTip;
