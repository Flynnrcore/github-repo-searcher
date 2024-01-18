import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../stores/AppStore";

export default class RepoPage extends React.Component {
  static contextType = AppContext;

  render() {
    const { repoPage } = this.context;
    return (
      <div>
        { repoPage ? (
        <div>
          <h1>Страница репозитория</h1>
        </div>
        ) : (
        <div>
          <h1>Репозиторий для просмотра не выбран</h1>
          <p>Пожалуйста вернитесь на главную страницу и выберите репозиторий</p>
        </div>
        )}
        <button className="repo-btn"><Link to="/">Назад</Link></button>
      </div>
    );
  }
}
