import { Button } from "antd";
import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import axios from "axios";
import OrgInfoEdit from "../pages/OrgInfoEdit/OrgInfoEdit";

const centeredStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh', 
};

export default class OrgInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      list: [],
      orgInfoDone: ""
    };
  }

  loadList = async (req) => {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const url = 'http://51.142.109.141/api/orginfo/user/' + id ;
    const res = await axios.get(url);
    console.log(id);
    console.log(res.data);
    this.setState({
      list: res.data
    })
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.loadList();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
        <div className="container" style={centeredStyle}>
        {(this.state.list.length == 0) ? (<div className="jumbotron" style={{
              backgroundColor: "rgb(50, 50, 50)",
              color: "white",
              textAlign: "center",
            }}
>
            <h3>Please fill in organization info first! </h3>
            <p><Link to="/orginfo-add"><Button> Add Organization Info </Button></Link></p>
            </div> )
        :( 
            <div>
             <OrgInfoEdit />
            
        </div>
      

        )}
      </div>
    );
  } 
}