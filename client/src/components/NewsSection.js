import React, { useEffect, useState } from "react";
import "./HomeSection.css";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";

function NewsSection({
  bgimage,
  lightBg,
  lightText,
  headline,
  imgStart,
  orgText,
}) {
  const [news, setNews] = useState([]);
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
    console.log("Fetching news data...");
    axios.get("http://51.142.109.141/api/news").then((response) => {
      const sortedNews = response.data.sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      );
      const displayedNews =
        sortedNews.length <= 2 ? sortedNews : sortedNews.slice(0, 2);
      setNews(displayedNews);
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
                {news.map((news) => (
                  <Col key={news.id} sm={12} md={12} className="project-space">
                    <Link
                      className="my-link"
                      to={`/showcasenews/${news.id}`}
                      style={{ color: "#000000", textDecoration: "none" }}
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
                          src={getImagePath(news.media)}
                          style={{ maxWidth: "240px", maxHeight: "250px" }}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
                          }}
                        />
                        <Card.Body>
                          <Card.Title>
                            {news.title.slice(0, 30) +
                              (news.title.length > 30 ? "..." : "")}
                          </Card.Title>
                          <Card.Text>
                            <br />
                            <small className="text-muted">
                              {formatDate(news.datetime)}
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

export default NewsSection;
