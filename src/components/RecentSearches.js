import React from "react";

const RecentSearches = ({
  recentSearches,
  handleRecentSearchClick,
  handleClearRecentSearches,
}) => {
  return (
    // Render recent searches section if there are recent searches available
    recentSearches.length > 0 && (
      <div className="recent-searches">
        <span>Recent Searches:</span>
        <ul className="search-list">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              onClick={() => handleRecentSearchClick(search)}
              className="search-item"
            >
              {search}
            </li>
          ))}
        </ul>
        <button onClick={handleClearRecentSearches} className="clear-button">
          Clear
        </button>
      </div>
    )
  );
};

export default RecentSearches;
