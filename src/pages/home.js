import React from "react";
import logo from "../LOGO.png";

export const Home = () => {
  const imgContainerStyle = {
    position: "fixed",
    width: "100%",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Noto Sans Hebrew",
  };

  const imgStyle = {
    maxWidth: "700px",
    maxHeight: "450px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div id="homePage" style={imgContainerStyle}>
      <img src={logo} alt="Logo" style={imgStyle} />
    </div>
  );
};
