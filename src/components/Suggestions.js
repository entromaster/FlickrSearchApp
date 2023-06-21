import React from "react";

const Suggestions = ({ suggestions, handleSuggestionClick }) => {
  return (
    // Render suggestions section if there are suggestions available
    suggestions.length > 0 && (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="suggestion"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )
  );
};

export default Suggestions;
