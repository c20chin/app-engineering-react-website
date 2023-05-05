import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./indexShowCase.css";
import { Card } from "antd";

function ShowCaseNews() {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);
  const navigate = useNavigate();
  console.log("newsId:", newsId);

  const goBack = () => {
    navigate(-1);
  };

  const getImagePath = (imageName) => `${imageName}`;

  useEffect(() => {
    axios
      .get(`http://51.142.109.141/api/news/${newsId}`)
      .then((response) => {
        console.log("Response:", response);
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error.message);
        console.error("Error response:", error.response);
        console.error("Error request:", error.request);
      });
  }, [newsId]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="showcase-container">
      <button onClick={goBack} className="back-button">
        <span className="arrow">&larr;</span> Back
      </button>
      <div className="text-title">
        <p> News / {news.title}</p>
      </div>
      {news.media && (
        <img
          src={getImagePath(news.media)}
          alt={news.title}
          className="media"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
          }}
        />
      )}
      <div className="event-details">
        <h1>{news.title}</h1>
        <p className="event-description">{news.description}</p>
        <p>Category: {news.category}</p>
      </div>
    </div>
  );
}

export default ShowCaseNews;
