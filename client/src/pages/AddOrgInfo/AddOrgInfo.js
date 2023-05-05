import "./OrgInfo.scss";
import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import OrgInfoDataService from "../../services/orginfo.service";

const { TextArea } = Input;

export default class AddOrgInfo extends Component {
  constructor(props) {
    super(props);
    this.onChangeOrgName = this.onChangeOrgName.bind(this);
    this.onChangeIntro = this.onChangeIntro.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeContactEmail = this.onChangeContactEmail.bind(this);
    this.onChangeContactPhone = this.onChangeContactPhone.bind(this);
    this.saveOrgInfo = this.saveOrgInfo.bind(this);
    this.newOrgInfo = this.newOrgInfo.bind(this);

    this.state = {
      id: null,
      orgName: "",
      intro: "",
      address: "",
      contactName: "",
      jobTitle: "",
      contactEmail: "",
      contactPhone: "",
      userID: "",

      submitted: false,
    };
  }

  onChangeOrgName(e) {
    this.setState({
      orgName: e.target.value,
    });
  }

  onChangeIntro(e) {
    this.setState({
      intro: e.target.value,
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeContactName(e) {
    this.setState({
      contactName: e.target.value,
    });
  }

  onChangeJobTitle(e) {
    this.setState({
      jobTitle: e.target.value,
    });
  }

  onChangeContactEmail(e) {
    this.setState({
      contactEmail: e.target.value,
    });
  }

  onChangeContactPhone(e) {
    this.setState({
      contactPhone: e.target.value,
    });
  }

  saveOrgInfo() {
    var data = {
      orgName: this.state.orgName,
      intro: this.state.intro,
      address: this.state.address,
      contactName: this.state.contactName,
      jobTitle: this.state.jobTitle,
      contactEmail: this.state.contactEmail,
      contactPhone: this.state.contactPhone,
      userID: JSON.parse(localStorage.getItem("user")).id,
    };

    OrgInfoDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          orgName: response.data.orgName,
          intro: response.data.intro,
          address: response.data.address,
          contactName: response.data.contactName,
          jobTitle: response.data.jobTitle,
          contactEmail: response.data.contactEmail,
          contactPhone: response.data.contactPhone,
          userID: JSON.parse(localStorage.getItem("user")).id,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOrgInfo() {
    this.setState({
      id: null,
      orgName: "",
      intro: "",
      address: "",
      contactName: "",
      jobTitle: "",
      contactEmail: "",
      contactPhone: "",
      userID: JSON.parse(localStorage.getItem("user")).id,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <br />
            <h4>Saved successfully!</h4>
            <br />
            <div>
              <Link to="/profile">
                <Button className="btn" margin="5px" onClick={this.newOrgInfo}>
                  Back
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div class="container">
            <div className="nine">
              <div className="addPro">Add Organization Information</div>

              <div className="form">
                <Form
                  /* onFinish={onFinish} */
                  labelCol={{
                    span: 10,
                  }}
                  wrapperCol={{
                    span: 40,
                  }}
                  layout="horizontal"
                  style={{
                    maxWidth: 800,
                  }}
                >
                  <Form.Item label="Organization Name" name="orgName">
                    <Input
                      id="orgName"
                      requiredvalue={this.state.orgName}
                      onChange={this.onChangeOrgName}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Introduction to Organization"
                    name="orgIntro"
                  >
                    <TextArea
                      rows={5}
                      id="intro"
                      requiredvalue={this.state.intro}
                      onChange={this.onChangeIntro}
                    />
                  </Form.Item>

                  <Form.Item label="Organization Address" name="orgAddress">
                    <TextArea
                      rows={5}
                      id="address"
                      requiredvalue={this.state.address}
                      onChange={this.onChangeAddress}
                    />
                  </Form.Item>

                  <Form.Item label="Contact Name" name="contactName">
                    <Input
                      id="contactName"
                      requiredvalue={this.state.contactName}
                      onChange={this.onChangeContactName}
                    />
                  </Form.Item>

                  <Form.Item label="Contact Job Title" name="jobTitle">
                    <Input
                      id="jobTitle"
                      requiredvalue={this.state.jobTitle}
                      onChange={this.onChangeJobTitle}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Contact Email"
                    type="email"
                    name="contactEmail"
                  >
                    <Input
                      id="contactEmail"
                      requiredvalue={this.state.contactEmail}
                      onChange={this.onChangeContactEmail}
                    />
                  </Form.Item>

                  <Form.Item label="Contact Phone Number" name="phoneNumber">
                    <Input
                      id="contactPhone"
                      requiredvalue={this.state.contactPhone}
                      onChange={this.onChangeContactPhone}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      onClick={this.saveOrgInfo}
                      htmlType="submit"
                      type="primary"
                    >
                      SAVE
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}