import React from "react";

const titleStyle = {
  background: "#1E2773",
  color: "white",
  height: "65px",
  borderRadius: "8px, 8px, 0px, 0px",
  padding: "16px",
};

const Header = (props) => {
  return <div style={titleStyle}>{props.title}</div>;
};

export default Header;
