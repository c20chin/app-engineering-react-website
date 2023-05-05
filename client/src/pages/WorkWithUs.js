import React, { Component } from "react";
import styled from "styled-components";
import BgCrop from "../img/bg.png";
import axios from "axios";

const Section = styled.section`
  padding: 50px 0;
  background-image: url(${BgCrop});
  height: 100vh;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;
`;

const Content = styled.section`
  width: 100%;
`;

const Left = styled.div`
  padding-left: 150px;
  padding-top: 100px;
`;

const Title = styled.p`
  font-size: 55px;
  color: orange;
  font-weight: bold;
`;

const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin: 0;
  font-weight: semi-bold;
`;

const Desc1 = styled.p`
  padding-top: 43px;
  margin: 0;
  width: 1000px;
  font-size: 40px;
  color: #000;
  line-height: 30px;
  font-weight: bold;
`;

const Link = styled.a`
  margin-top: 50px;
  font-size: 24px;
  background-color: #fff;
  color: #000;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: semi-bold;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ff8717;
    color: #fff;
    text-decoration: none;
  }
`;

export default class WorkWithUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  loadInfo = async (req) => {
    const url = "http://51.142.109.141/api/webconfig/3";
    const res = await axios.get(url);
    console.log(res.data.description);
    this.setState({
      list: res.data.description,
    });
  };

  componentDidMount() {
    this.loadInfo();
  }

  render() {
    return (
      <Section>
        <Content>
          <Left>
            <Title>Work With Us</Title>
            <Heading>{this.state.list}</Heading>
            <br />
            <br />
            <Link href="/register">SEND NEW PROPOSAL</Link>
          </Left>
        </Content>
      </Section>
    );
  }
}
