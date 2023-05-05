// THIS FILE IS NOT IS USE
import React, { Component } from "react";

export default class Error extends Component {
  

  render() {
    
    return (
      <div
        className="new-container"
        align="center"
        width="100"
            height="1280px"
            margin-top="100px"
      >
            <h3>Unauthorized content</h3>
            <p>Use the navigation bar for available content.</p>
            <p>Some content may acquire you to log in / log out first!</p>
        <img
          height="300px"
          src="https://img.freepik.com/free-vector/404-error-searching-webpage_24908-77773.jpg?w=1480&t=st=1681083503~exp=1681084103~hmac=d6cf0f1d794d30ba39ce6c6581ac32fdfa287eab8751296176b90530849ab174"
        ></img>
      </div>
    );
  }
}
