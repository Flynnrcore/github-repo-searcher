import React from "react";
import {observer} from 'mobx-react';
import { AppContext } from "../stores/AppStore";
import RepoItem from "./RepoItem.jsx"

class SearchPageComponents extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = { 
      text: props.text || '',
      isLoading: false,
    };
    this.timerId = null;
    this.delay = 500;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      const value = this.state.text;
      const url = `https://api.github.com/search/repositories?q=${value}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const { setRepos } = this.context;
          setRepos(data.items);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.setState({ isLoading: false })
        });
    }, this.delay);
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value});
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.text}
            disabled={this.state.isLoading}
            placeholder=" введите наименование репозитория..."
          />
        </form>
        <section className="section-left">
          <h1>Список репозиториев:</h1>
          {this.context.repos.map((repo) => (
            <RepoItem
              key={repo.id}
              favorite={false}
              {...repo}
            />)
          )}
        </section>
        <section className="section-right">
          <h1>Избранные репозитории:</h1>
          {this.context.favoriteRepos.map((repo) => {
            const newProps = { ...repo, favorite: true };
            return (
              <RepoItem key={repo.id} {...newProps}/>
            );
          })}
        </section>
      </main>

    );
  }
}

const SearchPage = observer(SearchPageComponents);
export default SearchPage;
