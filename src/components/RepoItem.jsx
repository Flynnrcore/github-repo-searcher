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
    const { 
      id, 
      name, 
      html_url, 
      url, 
      description, 
      forks_count,
      stargazers_count, 
      owner: { avatar_url },
      favorite,
    } = this.props;

    return (
      <article key={id}>
        <a href={html_url} className="repo-name">{name}</a>
        <img src={avatar_url} className="repo-avatar" alt="avatar" />
        <div className="repo-container">
          <p className="repo-description">Описание:<br/>{description}</p>
          <p className="repo-forks">Forks: {forks_count}</p>
          <p className="repo-stars">Stars: {stargazers_count}</p>
        </div>
        { favorite ? (
          <button onClick={() => this.handleDelFavorite(this.props.id)} className="repo-btn">
            Удалить из избранного
          </button> 
        ) : (
          <button onClick={() => this.handleAddFavorite(this.props)} className="repo-btn">
            Добавить в избранное
          </button> 
        )}
        <button 
          className="repo-btn"
          onClick={() => this.handleClick(url)}
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

