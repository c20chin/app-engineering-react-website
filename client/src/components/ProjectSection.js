import React, { useEffect, useState } from "react";
import "./HomeSection.css";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";

function ProjectSection({
  bgimage,
  lightBg,
  lightText,
  headline,
  imgStart,
  orgText,
}) {
  const [projects, setProjects] = useState([]);
  const getImagePath = (imageName) => `${imageName}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handleProjectClick = async (projectId) => {
    try {
      const response = await fetch(
        `http://51.142.109.141/api/projects/${projectId}/views`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log(`Updated view count for project ${projectId}:`, data.views);
      setProjects(
        projects.map((project) =>
          project.id === projectId ? { ...project, views: data.views } : project
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get("http://51.142.109.141/api/projects").then((response) => {
      const highlightedProjects = response.data.filter(
        (project) => project.feature === "True"
      );
      setProjects(highlightedProjects);
    });
  }, []);

  return (
    <>
      <div
        className={
          bgimage
            ? "home__hero-section bgimage"
            : lightBg
            ? "home__hero-section"
            : "home__hero-section darkBg"
        }
      >
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <h1
                  className={`${
                    lightText
                      ? "heading"
                      : orgText
                      ? "heading orange"
                      : "heading dark"
                  } text-left`}
                >
                  {headline}
                </h1>
              </div>
            </div>
            <div className="col">
              <Row>
                {projects.slice(0, 2).map((project) => (
                  <Col
                    key={project.id}

                    sm={12}
                    md={12}
                    className="project-space"
                  >
                    <div onClick={() => handleProjectClick(project.id)}>
                      <Link
                        className="my-link"
                        to={`/projects/${project.id}`}
                        style={{ color: "#000000", textDecoration: "none" }}
                      >
                        <Card style={{ height: "460px", width: "100%", transition: "transform 0.2s",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                          transition: "transform 0.2s" }}>
                          <Card.Img
                            variant="top"
                            src={getImagePath(project.media)}
                            onError={(e) => {
                              e.target.src =
                                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                            }}
                          />
                          <Card.Body >
                            <Card.Title>
                              {project.title.slice(0, 50) +
                                (project.title.length > 50 ? "..." : "")}
                            </Card.Title>
                          </Card.Body>
                          <Card.Footer>
                            <div className="d-flex justify-content-between">
                              <small className="text-muted">
                                {formatDate(project.createdAt)}
                              </small>
                              <small className="text-muted">
                                Views: {project.views}
                              </small>
                            </div>
                          </Card.Footer>
                        </Card>
                        <style>
                          {`
                            a:hover .card {
                              transform: translateY(-5px);
                              box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
                            }
                          `}
                        </style>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectSection;
