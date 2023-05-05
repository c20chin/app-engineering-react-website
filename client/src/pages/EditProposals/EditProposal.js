import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { Button, Form, Input, Select, Upload } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;
const EditProposal = () => {
  const path = window.location.pathname;
  const pathParts = path.split("/");
  const proposalId = pathParts.pop();
  const navigate = useNavigate();
  const updateProposal = async (id, updatedProposal) => {
    try {
      await axios.put(
        `http://51.142.109.141/api/proposals/update/${id}`,
        updatedProposal
      );
      navigate("/user-proposals");
    } catch (error) {
      console.error("Error updating proposal:", error);
    }
  };

  const onFinish = async (values) => {
    const { description, title, projectType, targetDevice } = values;
    await updateProposal(proposalId, {
      title,
      description,
      projectType,
      targetDevice,
    });
  };

  const [fileList, setFileList] = useState();

  const [uploadedUrl, setUploadedUrl] = useState("");
  const handleChange = (info) => {
    const { response } = info.file;
    console.log(response);
    setUploadedUrl(response);
    setFileList(info.fileList);
  };

  const [list, setList] = useState([]);

  const [initialValues, setInitialValues] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const loadList = async () => {
    const res = await axios.get(
      "http://51.142.109.141/api/proposals/" + proposalId
    );
    setList(res.data);
    setInitialValues({ ...res.data });
    setDataLoaded(true);
  };

  const Back = async () => {
    navigate("/user-proposals");
  };

  useEffect(() => {
    loadList();
  }, []);

  return (
    <div className="nine">
      <div className="addPro">Edit Proposals</div>

      <div className="form">
        {dataLoaded && (
          <Form
            onFinish={onFinish}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 40,
            }}
            layout="horizontal"
            style={{
              maxWidth: 800,
            }}
            initialValues={initialValues}
          >
            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item label="projectType" name="projectType">
              <Select placeholder={list.projectType}>
                <Select.Option value="mobile">Mobile</Select.Option>
                <Select.Option value="web">Web</Select.Option>
                <Select.Option value="both">Both</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Target Device" name="targetDevice">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                className="pro-custom-button"
                htmlType="submit"
                type="primary"
              >
                SAVE
              </Button>
              <Button className="backButton" type="primary" onClick={Back}>
                BACK
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditProposal;
