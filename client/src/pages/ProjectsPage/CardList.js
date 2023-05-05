import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function CardList(props) {
  const { projects, searchTerm, currentPage } = props;

  const publishedProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      project.publish
  );

  const getImagePath = (imageName) => `${imageName}`;
  const navigate = useNavigate();
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
      props.updateProjectViews(projectId, data.views);
    } catch (error) {
      console.error(error);
    }

    navigate(`/projects/${projectId}?page=${currentPage}`);
  };

  return (
    <Row className="card-list-row">
      {projects.map((project) => (
        <Col sm={12} md={6} lg={4} key={project.id}>
          <div
            className="card-wrapper"
            onClick={() => handleProjectClick(project.id)}
          >
            <Link
              to={`/projects/${project.id}?page=${currentPage}`}
              style={{
                maxWidth: "240px",
                maxHeight: "250px",
                textDecoration: "none",
                color: "black",
              }}
              className="card-link"
            >
              <Card className="standardized">
                <Card.Img
                  variant="top"
                  src={getImagePath(project.media)}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    {project.title.slice(0, 100) +
                      (project.title.length > 100 ? "..." : "")}
                  </Card.Title>
                  <Card.Text className="card-description">
                    {project.description.slice(0, 500) +
                      (project.description.length > 500 ? "..." : "")}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      {formatDate(project.createdAt)}
                    </small>
                    <small className="text-muted">Views: {project.views}</small>
                  </div>
                </Card.Footer>
              </Card>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default CardList;
