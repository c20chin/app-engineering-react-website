import React, { useEffect, useState } from "react";
import "./HomeSection.css";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function EventSection({
  bgimage,
  lightBg,
  lightText,
  headline,
  imgStart,
  orgText,
}) {
  const [events, setEvents] = useState([]);

  const getImagePath = (imageName) => `${imageName}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  useEffect(() => {
    axios.get("http://51.142.109.141/api/events").then((response) => {
      const sortedEvents = response.data.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      const displayedEvents =
        sortedEvents.length <= 2 ? sortedEvents : sortedEvents.slice(0, 2);
      setEvents(displayedEvents);
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
                {events.map((event) => (
                  <Col key={event.id} sm={12} md={6}>
                    <Link
                      to={`/showcaseevent/${event.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card
                        style={{
                          height: "400px",
                          width: "100%",
                          transition: "transform 0.2s",
                          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
                          transition: "transform 0.2s",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={getImagePath(event.media)}
                          style={{ maxWidth: "240px", maxHeight: "250px" }}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                        <Card.Body>
                          <Card.Title>
                            {event.title.slice(0, 50) +
                              (event.title.length > 50 ? "..." : "")}
                          </Card.Title>
                          <Card.Text>
                            <br />
                            <small className="text-muted">
                              {formatDate(event.datetime)}
                            </small>
                          </Card.Text>
                        </Card.Body>
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

export default EventSection;
