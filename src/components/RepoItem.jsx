import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { AppContext } from "../stores/AppStore";

class Repo extends React.Component {
  static contextType = AppContext;

  handleAddFavorite = (repo) => {
    const { context: { favoriteRepos, addFavoriteRepo }} = this;
    const favoriteReposIds = favoriteRepos.map(repo => repo.id);
    if(!favoriteReposIds.includes(repo.id)) {
      addFavoriteRepo(repo);
    }
  }

  handleDelFavorite = (repoId) => {
    const { delFavoriteRepo } = this.context;
    delFavoriteRepo(repoId);
  }

  handleClick = (url) => {
    const { setRepoPage } = this.context;
    setRepoPage(url);
  }

  render() {
    const { getRepoById } = this.context;
    const repo = getRepoById(this.props.id, this.props.isFavorite);

    return (
      <article key={repo.id}>
        <a href={repo.html_url} className="repo-name">{repo.name}</a>
        <img src={repo.owner.avatar_url} className="repo-avatar" alt="avatar" />
        <div className="repo-container">
          <p className="repo-description">Описание:<br/>{repo.description}</p>
          <p className="repo-forks">Forks: {repo.forks_count}</p>
          <p className="repo-stars">Stars: {repo.stargazers_count}</p>
        </div>
        {this.props.isFavorite ? (
          <button onClick={() => this.handleDelFavorite(repo.id)} className="repo-btn">
            Удалить из избранного
          </button> 
        ) : (
          <button onClick={() => this.handleAddFavorite(repo)} className="repo-btn">
            Добавить в избранное
          </button> 
        )}
        <button 
          className="repo-btn"
          onClick={() => this.handleClick(repo.url)}
        >
          <Link to="/repo">
            Подробнее
          </Link>
        </button>
      </article>
    );
  }
}

const RepoItem = observer(Repo);
export default RepoItem;

