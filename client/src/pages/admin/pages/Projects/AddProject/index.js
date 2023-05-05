import './index.scss'
import React from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { Button, DatePicker, Form, Input, Select, } from 'antd'
import { useState } from 'react'
import { http } from '../../../utils/http'
import { useNavigate } from 'react-router-dom'
const { TextArea } = Input
const AddProject = () => {

 const navigate = useNavigate()
 const onFinish = async (values) => {
  console.log(values)
  const { category, description, link, partner, title, users, year, partnerType } = values
  await http.post('/api/projects', {
   category, description, link, partner, partnerType, title, users, year, media: uploadedUrl
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

 const Back = async () => {
  navigate('/admin/projects')
 }


 return (
  <div className='nine'>
   <div className='addPro'>
    Add Project
   </div>

   <div className='form'>
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
    >

     <Form.Item label="Title" name="title"
      rules={[
       {
        required: true,
        message: 'Please input title!',
       },
      ]}
     >
      <Input />
     </Form.Item>

     <Form.Item label="Description" name="description"
      rules={[
       {
        required: true,
        message: 'Please input description!',
       },
      ]}>
      <TextArea rows={5} />
     </Form.Item>

     <Form.Item label="YouTube Link" name="link"
      rules={[
       {
        required: true,
        message: 'Please input link!',
       },
      ]}>
      <Input />
     </Form.Item>

     <Form.Item label="Upload Cover" valuePropName="fileList"
      rules={[
       {
        required: true,
        message: 'Please upload cover!',
       },
      ]}
     >
      <ImgCrop aspect={4 / 3}>
       <Upload action="http://51.142.109.141/api/projects/upload/pic"
        name='image'
        listType="picture-card"
        fileList={fileList && fileList.length > 0 ? fileList.slice(-1) : []}
        onChange={(info) => {
         handleChange(info)
         setFileList(info.fileList)
        }}
       >
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

     <Form.Item label="Year" name="year"
      rules={[
       {
        required: true,
        message: 'Please input year!',
       },
      ]}>
      <Input />
     </Form.Item>

     <Form.Item label="Category" name="category"
      rules={[
       {
        required: true,
        message: 'Please input category!',
       },
      ]}>
      <Select>
       <Select.Option value="mobile">Mobile</Select.Option>
       <Select.Option value="web">Web</Select.Option>
       <Select.Option value="both">Both</Select.Option>
      </Select>
     </Form.Item>

     <Form.Item label="Partner" name="partner"
      rules={[
       {
        required: true,
        message: 'Please input partner!',
       },
      ]}>
      <Input />
     </Form.Item>

     <Form.Item label="PartnerType" name="partnerType"
      rules={[
       {
        required: true,
        message: 'Please input partnerType!',
       },
      ]}>
      <Select>
       <Select.Option value="University">University</Select.Option>
       <Select.Option value="Charity">Charity</Select.Option>
       <Select.Option value="Company">Company</Select.Option>
       <Select.Option value="Others">Others</Select.Option>
       <Select.Option value="HealthCare">Health care</Select.Option>
      </Select>
     </Form.Item>


     <Form.Item>
      <Button htmlType='submit' type='primary' className="pro-custom-button">SAVE</Button>
      <Button className='backButton' type="primary" onClick={Back}>
       BACK
      </Button>
     </Form.Item>
    </Form>
   </div>



  </div>
 )

}

export default AddProject