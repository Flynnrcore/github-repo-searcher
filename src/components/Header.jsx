import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <a href="/" className="header-logo">Github Repository Searcher</a>
        <img src="./magnifier.svg" alt="logo" />
      </header>
    );
  }
}
