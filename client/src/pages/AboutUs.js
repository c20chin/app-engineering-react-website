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
  padding-left: 100px;
  padding-top: 100px;
`;
const Title = styled.p`
  font-size: 55px;
  color: #ffac0b;
  font-weight: bold;
`;

const Row = styled.div`
  display: grid;
  grid-row: auto;
`;

const Desc1 = styled.p`
  width: 100%;
  font-size: 20px;
  color: white;
  line-height: 30px;
  margin-top: 58px;
  font-weight: bold;
`;

const Desc2 = styled.p`
  width: 100%;
  font-size: 20px;
  color: white;
  line-height: 30px;
  margin-top: 58px;
  font-weight: bold;
`;

export default class AdminAboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  loadInfo = async (req) => {
    const url = "http://51.142.109.141/api/webconfig/4";
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
            <Title>About Us</Title>
            <Row>
              <Desc1>{this.state.list}</Desc1>
            </Row>
          </Left>
        </Content>
      </Section>
    );
  }
}
