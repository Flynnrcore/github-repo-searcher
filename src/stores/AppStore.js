import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class AppStore {
  repos = [];
  favoriteRepos = [];
  repoPage = '';

  constructor() {
    makeAutoObservable(this);
  }

  setRepos = (data) => {
    this.repos = [...data];
  }

  addFavoriteRepo = (repo) => {
    this.favoriteRepos = [...this.favoriteRepos, repo];
  }

  delFavoriteRepo = (repoId) => {
    this.favoriteRepos = this.favoriteRepos.filter(({ id }) => +id !== +repoId);
  }

  setRepoPage = (url) => {
    this.repoPage = url;
  }

  getRepoById = (id, isFavorite) => {
    const data = isFavorite ? this.favoriteRepos : this.repos;
    return data.find((repo) => repo.id === id);
  }
}

export const appStore = new AppStore();
export const AppContext = createContext(appStore);
