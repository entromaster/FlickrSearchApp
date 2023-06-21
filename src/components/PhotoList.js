import React from "react";

const PhotoList = ({ photos, handleModalOpen, loadMoreResults }) => {
  return (
    <>
      {/* Check if there are photos */}
      {photos.length > 0 ? (
        <div className="photos-container">
          {/* Render each photo */}
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
              alt={photo.title}
              onClick={() => handleModalOpen(photo)}
              className="photo"
            />
          ))}
        </div>
      ) : (
        // Render message when no results are found
        <div className="no-results">No results found.</div>
      )}
      {/* Button to load more results */}
      <button onClick={loadMoreResults} className="load-more">
        Load More
      </button>
    </>
  );
};

export default PhotoList;
