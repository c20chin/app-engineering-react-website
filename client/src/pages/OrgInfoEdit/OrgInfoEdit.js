import "./OrgInfo.scss"
import React, { Component } from "react"
import { Button, Form, Input } from "antd"
import { useNavigate, Link } from "react-router-dom"
import OrgInfoDataService from "../../services/orginfo.service"

const { TextArea } = Input

export default class OrgInfoEdit extends Component {
  constructor(props) {
    super(props)
    this.onChangeOrgName = this.onChangeOrgName.bind(this)
    this.onChangeIntro = this.onChangeIntro.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onChangeContactName = this.onChangeContactName.bind(this)
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this)
    this.onChangeContactEmail = this.onChangeContactEmail.bind(this)
    this.onChangeContactPhone = this.onChangeContactPhone.bind(this)
    this.saveOrgInfo = this.saveOrgInfo.bind(this)
    this.newOrgInfo = this.newOrgInfo.bind(this)

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
      loading: true,
    }
  }

  onChangeOrgName (e) {
    this.setState({
      orgName: e.target.value,
    })
  }

  onChangeIntro (e) {
    this.setState({
      intro: e.target.value,
    })
  }

  onChangeAddress (e) {
    this.setState({
      address: e.target.value,
    })
  }

  onChangeContactName (e) {
    this.setState({
      contactName: e.target.value,
    })
  }

  onChangeJobTitle (e) {
    this.setState({
      jobTitle: e.target.value,
    })
  }

  onChangeContactEmail (e) {
    this.setState({
      contactEmail: e.target.value,
    })
  }

  onChangeContactPhone (e) {
    console.log("Contact phone value: ", e.target.value)
    this.setState({
      contactPhone: e.target.value,
    })
  }

  saveOrgInfo (values) {
    console.log("Form values: ", values)
    var data = {
      orgName: values.orgName,
      intro: values.intro,
      address: values.address,
      contactName: values.contactName,
      jobTitle: values.jobTitle,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone,
      userID: JSON.parse(localStorage.getItem("user")).id,
    }

    OrgInfoDataService.update(JSON.parse(localStorage.getItem("user")).id, data)
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
        })
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getOrgInfo () {
    const userId = JSON.parse(localStorage.getItem("user")).id
    console.log("User ID:", userId)
    OrgInfoDataService.get(userId)
      .then((response) => {
        console.log("Response data:", response.data)
        this.setState({
          id: response.data[0].id,
          orgName: response.data[0].orgName,
          intro: response.data[0].intro,
          address: response.data[0].address,
          contactName: response.data[0].contactName,
          jobTitle: response.data[0].jobTitle,
          contactEmail: response.data[0].contactEmail,
          contactPhone: response.data[0].contactPhone,
          userID: String(userId),
          loading: false,
        }, () => {
          console.log("State after update:", this.state)
        })
      })
      .catch((e) => {
        console.log("Error fetching data:", e)
      })
  }


  componentDidMount () {
    this.getOrgInfo()
  }

  newOrgInfo () {
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
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <div className="submit-form">
          <div>Loading...</div>
        </div>
      )
    } else {
      const isDataLoading = !this.state.id
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <div className="success-container2">
                <h4>Saved successfully!</h4>
                <div>
                  <Link
                    to="/user-proposals"
                    className="custom-button-link"
                  >
                    <Button
                      className="custom-button2"
                      margin="5px"
                    >
                      Back
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="nine2">
                <div className="addPro2">
                  Edit Organization Information
                </div>

                <div className="form2">
                  <Form
                    onFinish={this.saveOrgInfo}
                    labelCol={{
                      span: 13,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    layout="horizontal"
                    style={{
                      maxWidth: 900,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    initialValues={{
                      orgName: this.state.orgName,
                      intro: this.state.intro,
                      address: this.state.address,
                      contactName: this.state.contactName,
                      jobTitle: this.state.jobTitle,
                      contactEmail: this.state.contactEmail,
                      contactPhone: this.state.contactPhone,
                    }}

                  >
                    <Form.Item
                      label="Organization Name"
                      name="orgName"
                      rules={[{ required: true, message: "Please input your organization name!" }]}
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    >
                      <Input
                        id="orgName"
                        value={this.state.orgName}
                        onChange={this.onChangeOrgName}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Introduction to Organization"
                      name="intro"
                      rules={[{ required: true, message: "Please input the organization introduction!" }]}
                    >
                      <TextArea
                        rows={5}
                        id="intro"
                        value={this.state.intro}
                        onChange={this.onChangeIntro}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Organization Address"
                      name="address"
                      rules={[{ required: true, message: "Please input your organization address!" }]}
                    >
                      <TextArea
                        rows={5}
                        id="address"
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Contact Name"
                      name="contactName"
                      rules={[{ required: true, message: "Please input the contact name!" }]}
                    >
                      <Input
                        id="contactName"
                        value={this.state.contactName}
                        onChange={this.onChangeContactName}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Contact Job Title"
                      name="jobTitle"
                      rules={[{ required: true, message: "Please input the contact job title!" }]}
                    >
                      <Input
                        id="jobTitle"
                        value={this.state.jobTitle}
                        onChange={this.onChangeJobTitle}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Contact Email"
                      name="contactEmail"
                      rules={[
                        { required: true, message: "Please input your contact email!" },
                        { type: "email", message: "The input is not a valid email!" },
                      ]}
                    >
                      <Input
                        id="contactEmail"
                        value={this.state.contactEmail}
                        onChange={this.onChangeContactEmail}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Contact Phone Number"
                      name="contactPhone"
                      rules={[
                        { required: true, message: "Please input your contact phone number!" },
                      ]}
                    >
                      <Input
                        id="contactPhone"
                        value={this.state.contactPhone}
                        onChange={this.onChangeContactPhone}
                      />
                    </Form.Item>


                    <Form.Item>
                      <Button
                        htmlType="submit"
                        type="primary"
                        className="pro-custom-button"
                      >
                        SAVE
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Link to="/user-proposals">
                        <Button
                          className='cancelButton'
                          type="primary"
                        >
                          CANCEL
                        </Button>
                      </Link>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          )}
        </div>

      )
    }
  }
}