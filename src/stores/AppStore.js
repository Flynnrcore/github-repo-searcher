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

  setRepoPage = (url) => {
    this.repoPage = url;
  }
}

export const appStore = new AppStore();
export const AppContext = createContext(appStore);
