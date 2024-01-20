import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../stores/AppStore";

export default class RepoPage extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = { 
      repoData: {},
    };
  }

  componentDidMount() {
    const { repoPage } = this.context;
    if (repoPage) {
      fetch(repoPage)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ repoData: result });
      });
    }
  }

  render() {
    const { repoPage } = this.context;
    const { repoData } = this.state;
    if(!repoPage) {
      return (
        <main className="not-found">
          <h1>Репозиторий для просмотра не выбран</h1>
          <p>Пожалуйста вернитесь на главную страницу и выберите репозиторий</p>
          <button className="repo-btn"><Link to="/">Назад</Link></button>
      </main>
      );
    }

    if (!repoData.owner) {
      return <main className="not-found">
        <div>Загрузка данных...</div>
      </main>;
    }
  
    return (
      <main className="repo-page">
        <div className="repo-page-wrapper">
          <div className="repo-page-header">
            <img src={repoData.owner.avatar_url} alt="Avatar" className="repo-page-avatar" />
            <a href={repoData.html_url} className="repo-page-name">
             <h1>Репозиторий /{repoData.name}</h1>
            </a>
          </div>
          <ul className="repo-information-list">
            <li>Автор: {repoData.owner.login}</li>
            <li>Создан: {repoData.created_at}<br/>Последнее обновление: {repoData.updated_at}</li>
            <li>Язык программирования: {repoData.language ? repoData.language : 'Не указан' }</li>
            <li>
              Описание:<br/>{repoData.description}
            </li>
            <li className="repo-page-forks">Forks: {repoData.forks_count}</li>
            <li className="repo-page-stars">Stars: {repoData.stargazers_count}</li>
            <li>Open issues: {repoData.open_issues_count}</li>
            <li>Подписки на уведомления: {repoData.subscribers_count}</li>
          </ul>
          <button className="repo-btn"><Link to="/">Назад</Link></button>
        </div>
      </main>
    );

  }
}
