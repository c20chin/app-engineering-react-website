import './index.scss'
import React from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Button, DatePicker, Form, Input, Select, Upload } from 'antd'
import { useState, useEffect } from 'react'
import { http } from '../../../../utils'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import ImgCrop from 'antd-img-crop'
const { TextArea } = Input
dayjs.extend(customParseFormat)
const dateFormat = 'YYYY/MM/DD'
const EditEvent = () => {

  const path = window.location.pathname
  const pathParts = path.split('/')
  const eventId = pathParts.pop()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values)
    const { title, description, category, datee } = values
    var datetime = dada
    if (datee != null) {
      datetime = datee.format('YYYY/MM/DD')
    }
    console.log(datee)
    await http.put('/api/events/' + eventId, {
      title, description, category, datetime, media: uploadedUrl
    })
    navigate('/admin/websiteEditing/')
  }

  const [initialValues, setInitialValues] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const [dada, setdada] = useState('')
  const loadList = async () => {
    const res = await http.get('api/events/' + eventId)
    console.log(res)
    setInitialValues({ ...res.data })
    const imageUrl = res.data.media
    setdada(res.data.datetime)
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
  useEffect(() => {
    loadList()
  }, [])


  const [fileList, setFileList] = useState()

  const [uploadedUrl, setUploadedUrl] = useState('')
  const handleChange = (info) => {
    const { response } = info.file
    console.log(response)
    setUploadedUrl(response)
    setFileList(info.fileList)
  }

  const Back = async () => {
    navigate('/admin/websiteEditing')
  }
  return (
    <div className='nine'>
      <div className='addPro'>
        Edit Event
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

            <Form.Item label="Title" name="title">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Input />
            </Form.Item>

            <Form.Item label="DateTime" name="datee">
              <DatePicker format="YYYY/MM/DD"
                defaultValue={dayjs(initialValues.datetime, dateFormat)}
                initialValue={initialValues.datetime}
                value={initialValues.datetime} />
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

export default EditEvent