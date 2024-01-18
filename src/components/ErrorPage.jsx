import React from "react";

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="error-page">
        <p>К сожалению такой страницы не существует...</p>
        <button className="repo-btn"><a href="/">Вернутся на главную страницу</a></button>
      </div>
    );
  }
}
