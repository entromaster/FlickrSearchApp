import React, { useState, useEffect } from "react";
import axios from "axios";
import Suggestions from "./Suggestions";
import RecentSearches from "./RecentSearches";
import PhotoList from "./PhotoList";
import LoadingIndicator from "./LoadingIndicator";
import Modal from "./Modal";

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchPhotos = () => {
  // State variables
  const [photos, setPhotos] = useState([]); // Holds the recent photos
  const [searchQuery, setSearchQuery] = useState(""); // Holds the current search query
  const [searchResults, setSearchResults] = useState([]); // Holds the search results
  const [page, setPage] = useState(1); // Keeps track of the pagination for search results
  const [loading, setLoading] = useState(false); // Indicates if data is being loaded
  const [suggestions, setSuggestions] = useState([]); // Holds search suggestions
  const [modalPhoto, setModalPhoto] = useState(null); // Holds the photo data for the modal
  const [recentSearches, setRecentSearches] = useState([]); // Holds recent search queries

  // Fetches the most recent photos
  const fetchRecentPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&safe_search=1`
      );
      setPhotos(response.data.photos.photo);
    } catch (error) {
      console.error("Error fetching recent photos:", error);
    }
    setLoading(false);
  };

  // Fetches search results for a given query
  const fetchSearchResults = async (query, newSearch = false) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&safe_search=1&text=${query}`
      );
      const results = response.data.photos.photo;
      if (newSearch) {
        setSearchResults(results);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...results]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  // Handles the search input and initiates a search
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0 || event.key === "Enter") {
      fetchSearchResults(query, true);
    } else {
      setSearchResults([]);
    }
  };

  // Loads more search results for pagination
  const loadMoreResults = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Opens the modal with the clicked photo
  const handleModalOpen = (photo) => {
    setModalPhoto(photo);
  };

  // Closes the modal
  const handleModalClose = () => {
    setModalPhoto(null);
  };

  // Handles a click on a search suggestion
  const handleSuggestionClick = (query) => {
    setSearchQuery(query);
    fetchSearchResults(query, true);
  };

  // Handles a click on a recent search query
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    fetchSearchResults(query, true);
  };

  // Clears the recent search queries
  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Fetches recent photos and retrieves saved suggestions and recent searches on component mount
  useEffect(() => {
    fetchRecentPhotos();
    const savedSuggestions = localStorage.getItem("searchSuggestions");
    if (savedSuggestions) {
      setSuggestions(JSON.parse(savedSuggestions));
    }
    const savedRecentSearches = localStorage.getItem("recentSearches");
    if (savedRecentSearches) {
      setRecentSearches(JSON.parse(savedRecentSearches));
    }
  }, []);

  // Fetches additional search results when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchSearchResults(searchQuery);
    }
  }, [page]);

  // Saves suggestions and recent searches to local storage
  useEffect(() => {
    localStorage.setItem("searchSuggestions", JSON.stringify(suggestions));
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [suggestions, recentSearches]);

  // Retrieves and fetches search results for a saved search query on component mount
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem("searchQuery");
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
      fetchSearchResults(savedSearchQuery, true);
    }
  }, []);

  // Saves the current search query to local storage
  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search photos..."
          className="search-input"
        />
        <Suggestions
          suggestions={suggestions}
          handleSuggestionClick={handleSuggestionClick}
        />
        <RecentSearches
          recentSearches={recentSearches}
          handleRecentSearchClick={handleRecentSearchClick}
          handleClearRecentSearches={handleClearRecentSearches}
        />
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <PhotoList
          photos={searchResults}
          handleModalOpen={handleModalOpen}
          loadMoreResults={loadMoreResults}
        />
      )}
      {modalPhoto && <Modal photo={modalPhoto} handleModalClose={handleModalClose} />}
    </>
  );
};

export default SearchPhotos;
