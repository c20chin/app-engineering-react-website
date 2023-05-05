import React, { useState, useEffect } from "react";
import "../../App.css";
import "../indexShowCase.css";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import useVideo from "./useVideo";
import { Breadcrumb } from "antd";

function ShowCaseProjects(props) {
  const { id } = useParams();
  const apiUrl = `http://51.142.109.141/api/projects/${id}`;
  const apiKey = "AIzaSyDIri2h41doNGYBnRGO0YgAqkmRzerj6bw";
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectYear, setProjectYear] = useState("");
  const [projectTags, setProjectTags] = useState("");
  const [partnername, setPartnerName] = useState("");
  const [partnerDescription, setPartnerDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Project data:", data);
        setProjectTitle(data.title);
        setProjectDescription(data.description);
        setProjectYear(data.year);
        setProjectTags(data.category);
        setPartnerName(data.partner);
        setPartnerDescription(data.partner.description);
        setVideoUrl(data.link);
      });
  }, [apiUrl]);

  const { videoSrc, isYoutube } = useVideo(videoUrl);

  const getProjectTagsDisplay = (tags) => {
    switch (tags) {
      case "both":
        return "Web App & Mobile App";
      case "web":
        return "Web App";
      case "mobile":
        return "Mobile App";
      default:
        return "";
    }
  };

  const handleBackClick = () => {
    const page = new URLSearchParams(location.search).get("page") || 1;
    navigate(`/all-projects?page=${page}`);
  };

  return (
    <div className="showcase-container">
      <button onClick={handleBackClick} className="back-button">
        <span className="arrow">&larr;</span> Back
      </button>
      <div className="text-title">
        <p>Projects / {projectTitle}</p>
      </div>
      <div className="video-container">
        <div className="video-wrapper">
          {isYoutube ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoSrc}`}
              frameBorder="0"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          ) : (
            <iframe
              src={videoSrc}
              frameBorder="0"
              allowFullScreen
              title="Video player"
              width="100%"
              height="100%"
            ></iframe>
          )}
        </div>
      </div>
      <div className="project-details">
        <div className="text-show">
          <h3>
            {projectTitle} / {partnername}
          </h3>
          <p className="project-description">{projectDescription}</p>
          <div className="year-tags">
            <p>Year: {projectYear}</p>
            <span className="separator">|</span>
            <p>Tags: {getProjectTagsDisplay(projectTags)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCaseProjects;
