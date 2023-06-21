import React from "react";
import SearchPhotos from "./components/SearchPhotos";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <header>
        <h1 className="headerName">Search Photos</h1>
      </header>
      <main>
        <SearchPhotos />
      </main>
    </div>
  );
};

export default App;