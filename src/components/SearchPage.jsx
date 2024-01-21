import React from "react";
import {observer} from 'mobx-react';
import { AppContext } from "../stores/AppStore";
import RepoItem from "./RepoItem.jsx";
import CopyButton from "./CopyButton.jsx";

class SearchPageComponents extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = { 
      text: props.text || '',
      isLoading: false,
      hidden: false,
      errors: null,
    };
    this.timerId = null;
    this.delay = 500;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, errors: null });
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      const value = this.state.text;
      const url = `https://api.github.com/search/repositories?q=${value}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка загрузки данных. Попробуйте сделать запрос еще раз.')
          }
          return response.json();
        })
        .then((data) => {
          const { setRepos } = this.context;
          setRepos(data.items);
        })
        .catch((e) => {
          this.setState({ errors: e.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }, this.delay);
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value, errors: null });
  }

  toggleList = () => {
    this.setState((prevState) => ({
      hidden: !prevState.hidden,
    }))
  }

  render() {
    return (
      <main>
        <div className="main-form">
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              value={this.state.text}
              disabled={this.state.isLoading}
              placeholder=" введите наименование репозитория..."
            />
          </form>
          <CopyButton text={this.state.text} />
        </div>
        {this.state.errors ? (<div className="warning"> К сожалению произошла ошибка: {this.state.errors}</div>) : null}
        <section className="section-left">
          <h1>Список репозиториев:</h1>
          {this.context.repos.map((repo) => (
            <RepoItem
              key={repo.id}
              id={repo.id}
              isFavorite={false}
            />)
          )}
        </section>
        <section className="section-right">
          <div className="favorite-header">
            <h1>Избранные репозитории:</h1>
            <button
              className="hide-btn"
              onClick={this.toggleList}
            >
              &#711;
            </button>
          </div>
          {!this.state.hidden && (this.context.favoriteRepos.map((repo) => (
            <RepoItem
              key={repo.id}
              id={repo.id}
              isFavorite={true}
            />)
            )
          )}
        </section>
      </main>

    );
  }
}

const SearchPage = observer(SearchPageComponents);
export default SearchPage;
