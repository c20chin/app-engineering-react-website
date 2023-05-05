import './index.scss'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Button, Form, Input, Select, Upload } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { http } from '../../../utils/http'
import { useNavigate } from 'react-router-dom'
const { TextArea } = Input
const EditProject = () => {

  const path = window.location.pathname
  const pathParts = path.split('/')
  const projectId = pathParts.pop()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    const { category, description, link, partner, title, partnerType, year } = values
    await http.put('/api/projects/' + projectId, {
      category, partnerType, description, link, partner, title, year, media: uploadedUrl
    })
    navigate('/admin/projects')
  }
  const [fileList, setFileList] = useState()

  const [uploadedUrl, setUploadedUrl] = useState('')
  const handleChange = (info) => {
    const { response } = info.file
    console.log(response)
    setUploadedUrl(response)
    setFileList(info.fileList)
  }

  const [list, setList] = useState([])

  const [initialValues, setInitialValues] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const [imgURL, setImgURL] = useState('')
  const loadList = async () => {
    const res = await axios.get('http://51.142.109.141/api/projects/' + projectId)
    setList(res.data)
    setInitialValues({ ...res.data })
    const imageUrl = res.data.media
    console.log(imageUrl + "-----")
    setImgURL(imageUrl)
    setUploadedUrl(imageUrl)
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: imageUrl,
      },
    ])
    setDataLoaded(true)
  }

  const Back = async () => {
    navigate('/admin/projects')
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <div className='nine'>
      <div className='addPro'>
        Edit Project
      </div>

      <div className='form'>
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
              maxWidth: 800
            }}
            initialValues={initialValues}
          >

            <Form.Item label="Title" name="title"
            >
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item label="YouTube Link" name="link">
              <Input />
            </Form.Item>

            <Form.Item label="Upload Cover" valuePropName="fileList">
              <ImgCrop aspect={4 / 3}>
                <Upload action="http://51.142.109.141/api/projects/upload/pic"
                  name='image'
                  listType="picture-card"
                  fileList={fileList.slice(-1)}
                  onChange={(info) => {
                    handleChange(info)
                    setFileList(info.fileList)
                  }}>
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </ImgCrop>
            </Form.Item>

            <Form.Item label="Year" name="year">
              <Input />
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Select placeholder={list.category}>
                <Select.Option value="mobile">Mobile</Select.Option>
                <Select.Option value="web">Web</Select.Option>
                <Select.Option value="both">Both</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Partner" name="partner">
              <Select placeholder={list.partner}>
                <Select.Option value="partner1">partner1</Select.Option>
                <Select.Option value="partner2">partner2</Select.Option>
                <Select.Option value="partner3">partner3</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="PartnerType" name="partnerType">
              <Select placeholder={list.partnerType}>
                <Select.Option value="University">University</Select.Option>
                <Select.Option value="Charity">Charity</Select.Option>
                <Select.Option value="Company">Company</Select.Option>
                <Select.Option value="Others">Others</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button className="pro-custom-button" htmlType='submit' type='primary'>SAVE</Button>
              <Button className='backButton' type="primary" onClick={Back}>
                BACK
              </Button>
            </Form.Item>
          </Form>)}
      </div>



    </div>
  )

}

export default EditProject