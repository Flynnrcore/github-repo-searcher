import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { appStore, AppContext } from './stores/AppStore.js';
import './App.css';
import Header from './components/Header.jsx';
import SearchPage from './components/SearchPage.jsx';
import RepoPage from './components/RepoPage.jsx';
import ErrorPage from './components/ErrorPage.jsx';

export default class App extends React.Component {
  render() {
    return (
      <AppContext.Provider value={appStore}>
        <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/repo" element={<RepoPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        </div>
      </AppContext.Provider>
    );
  }
}

