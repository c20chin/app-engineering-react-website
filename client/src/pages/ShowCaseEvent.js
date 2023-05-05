import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";

function ShowcaseEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const getImagePath = (imageName) => `${imageName}`;

  useEffect(() => {
    axios
      .get(`http://51.142.109.141/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      });
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="showcase-container">
      <button onClick={goBack} className="back-button">
        <span className="arrow">&larr;</span> Back
      </button>
      <div className="text-title">
        <p> Events / {event.title}</p>
      </div>
      {event.media && (
        <img
          src={getImagePath(event.media)}
          alt={event.title}
          className="media"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
          }}
        />
      )}
      <div className="event-details">
        <h1>{event.title}</h1>
        <p className="event-description">{event.description}</p>
        <p>Category: {event.category}</p>
      </div>
    </div>
  );
}

export default ShowcaseEvent;
