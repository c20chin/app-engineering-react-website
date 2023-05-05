import "./NewProposal.scss";
import React, { useState, useEffect } from "react";
import ProposalDataService from "../../services/proposal.service";
import { Button, Form, Input, Select, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service"; 


const { TextArea } = Input;
const { Option } = Select;

export default function NewProposal() {
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(AuthService.getCurrentUserId());


  const navigate = useNavigate();

  const user = AuthService.getCurrentUser();
  const userEmail = user ? user.username : null;

  const saveProposal = (values) => {
    const data = {
      ...values,
      userId: userId,
    };

    ProposalDataService.create(data)
      .then((response) => {
        setSubmitted(true);
        notification.success({
          message: "Success",
          description: "You submitted successfully!",
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    ProposalDataService.send();
  };

  const newProposal = () => {
    setSubmitted(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const goBack = () => {
    navigate("/user-proposals");
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <>
          <div style={{ textAlign: "center" }}>
            <br />
            <Button className="custom-button" onClick={newProposal}>
              Add Another Proposal
            </Button>
            <Button
              className="custom-button"
              onClick={goBack}
              style={{ marginLeft: "5px" }}
            >
              Back
            </Button>
          </div>
          <div
            className="footer"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          />
        </>
      ) : (
        <div class="container">
          <div className="nine">
            <div className="addPro">New Proposal</div>
            <div className="form">
              <Form
                onFinish={saveProposal}
                onFinishFailed={onFinishFailed}
                labelCol={{
                  span: 9,
                }}
                wrapperCol={{
                  span: 40,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 900,
                }}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input the title!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the description!",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Please describe the problem to be solved and list the key required functionalities."
                  />
                </Form.Item>

                <Form.Item
                  label="Users of the Project"
                  name="usersType"
                  rules={[
                    {
                      required: true,
                      message: "Please input the users of the project!",
                    },
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="i.e. parents, clinicians, patients, students, etc."
                  />
                </Form.Item>

                <Form.Item
                  label="Project Type"
                  name="projectType"
                  rules={[
                    {
                      required: true,
                      message: "Please select the project type!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="mobile">Mobile</Select.Option>
                    <Select.Option value="web">Web</Select.Option>
                    <Select.Option value="both">Both</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Target Device"
                  name="targetDevice"
                  rules={[
                    {
                      required: true,
                      message: "Please input the target device!",
                    },
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="i.e. PC, tablet, Android or iOS phone"
                  />
                </Form.Item>

                <Form.Item
                  label="Webhosting Server (Optional)"
                  name="webServer"
                >
                  <TextArea
                    rows={3}
                    placeholder="Please tell us if you have a web hosting server to host the web application or the database of the app project if applicable."
                  />
                </Form.Item>

                <Form.Item
                  label="Reference Projects (Optional)"
                  name="reference"
                >
                  <TextArea
                    rows={7}
                    placeholder="To help our students understand your preference about the user interface or layout of the app, please tell us the similar existing projects as references. If it is a website, please tell us the web address. If it is an app in Google or Apple store, please tell us the app name and which app store we can find the app in."
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="pro-custom-button"
                    type="primary"
                    htmlType="submit"
                  >
                    SAVE
                  </Button>
                  <Button
                    className="backButton"
                    type="primary"
                    onClick={goBack}
                  >
                    BACK
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
