import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../stores/AppStore";

export default class RepoPage extends React.Component {
  static contextType = AppContext;

  state = {
    repoData: {},
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    const { repoPage } = this.context;
    if (repoPage) {
      this.fetchRepoData(repoPage);
    }
  }

  fetchRepoData = async (url) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      this.setState({ repoData: result, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  formatDate = (dateString) => {
    if (!dateString) return "Не указана";
    const date = new Date(dateString);
    return date
      .toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  renderNotFound = (message) => (
    <main className="not-found">
      <h1>{message}</h1>
      <p>Пожалуйста, вернитесь на главную страницу и выберите репозиторий</p>
      <button className="repo-btn">
        <Link to="/">Назад</Link>
      </button>
    </main>
  );

  renderError = (error) => (
    <main className="not-found">
      <h1>Ошибка при загрузке данных</h1>
      <p>{error}</p>
      <button className="repo-btn">
        <Link to="/">Назад</Link>
      </button>
    </main>
  );

  renderLoading = () => (
    <main className="not-found">
      <div>Загрузка данных...</div>
    </main>
  );

  render() {
    const { repoPage } = this.context;
    const { repoData, isLoading, error } = this.state;

    if (!repoPage) {
      return this.renderNotFound("Репозиторий для просмотра не выбран");
    }

    if (error) {
      return this.renderError(error);
    }

    if (isLoading || !repoData.owner) {
      return this.renderLoading();
    }

    return (
      <main className="repo-page">
        <a
          href={repoData.html_url}
          className="repo-page-name"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>
            <span className="breadcrumbs">Репозиторий / </span>
            {repoData.name}
          </h1>
          <img className="github-icon" alt="github-logo" src="./github-mark.svg" />
        </a>
        <div className="repo-page-wrapper">
          <div className="repo-page-header">
            <img
              src={repoData.owner.avatar_url}
              alt={`Аватар ${repoData.owner.login}`}
              className="repo-page-avatar"
            />
            <h2 className="repo-page-author">{repoData.owner.login}</h2>
          </div>
          <div className="repo-page-info">
            <div>
              <p>Дата создания</p>
              <p>{this.formatDate(repoData.created_at)}</p>
            </div>
            <div>
              <p>Последнее обновление</p>
              <p>{this.formatDate(repoData.updated_at)}</p>
            </div>
          </div>
          <div className="repo-page-codingLang">
            <p>Язык программирования</p>
            <p>{repoData.language || "Не указан"}</p>
          </div>
          <p>{repoData.description || "Описание отсутствует"}</p>
          <div className="repo-pages-badges">
            <div className="badge">
              <p>Forks</p>
              <p>{repoData.forks_count}</p>
            </div>
            <div className="badge">
              <p>Stars</p>
              <p>{repoData.stargazers_count}</p>
            </div>
            <div className="badge">
              <p>Open issues</p>
              <p>{repoData.open_issues_count}</p>
            </div>
            <div className="badge">
              <p>Подписки</p>
              <p>{repoData.subscribers_count}</p>
            </div>
          </div>
          <button className="repo-btn back-btn">
            <Link to="/">Назад</Link>
          </button>
        </div>
      </main>
    );
  }
}