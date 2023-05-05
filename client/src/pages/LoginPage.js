import React, { Component } from "react";
import Login from "../components/login.component";
import BgCrop from '../img/bg.png';


class LoginPage extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${BgCrop})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    };

    return (
      <div style={styles}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginPage;

