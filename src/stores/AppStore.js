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
}

export const appStore = new AppStore();
export const AppContext = createContext(appStore);
