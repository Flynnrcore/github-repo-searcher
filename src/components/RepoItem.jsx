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
    const { isFavorite } = this.props;

    return (
      <article key={repo.id}>
        <img src={repo.owner.avatar_url} className="repo-avatar" alt="avatar" />
        <div className="repo-container">
          <a href={repo.html_url} className="repo-name">{repo.name}</a>
          <div className="repo-details">
            <p className="repo-description">Описание:<br/>{repo.description}</p>
          </div>
          <div className="btns-group">
            <button onClick={() => isFavorite ? this.handleDelFavorite(repo.id): this.handleAddFavorite(repo)} className="repo-btn addfavourite-btn">
              {isFavorite ? "Удалить из избранного" : "Добавить в избранное" }
            </button> 
            <button 
              className="repo-btn"
              onClick={() => this.handleClick(repo.url)}
            >
              <Link to="/repo">
                Подробнее
              </Link>
            </button>
          </div>
        </div>
      </article>
    );
  }
}

const RepoItem = observer(Repo);
export default RepoItem;

