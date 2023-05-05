import React, { Component } from "react";
import Register from "../components/register.component";
import BgCrop from '../img/bg.png';

class RegisterPage extends Component {
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
        <Register />
        </div>
      </div>
    );
  }
}

export default RegisterPage;