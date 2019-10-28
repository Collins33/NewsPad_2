import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <>
      <div className="header__generic">
        <div>
          <div className="header__content" id="name">
            Contranet
          </div>
        </div>
        <div className="header__generic__first">
          <div className="header__content">Home</div>
          <div className="header__content">How it works</div>
        </div>
        <div className="header__generic__second">
          <button className="header__content header__button">Sign Up</button>
          <button className="header__content header__button">Login</button>
        </div>
      </div>
      <hr />
    </>
  );
};
