import React, { useState, useEffect } from 'react'
import './about.scss'
import { Button, Form, Input } from 'antd'
import { http } from '../../../utils'
const { TextArea } = Input

const WorkWithUs = () => {
  const onFinish = async (values) => {
    const { description } = values
    const title = 'workWithUs'
    console.log(values)
    await http.put('/api/webconfig/3', { title, description })
  }

  const [initialValues, setInitialValues] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const loadList = async () => {
    const res = await await http.get('/api/webconfig/3')
    console.log(res)
    console.log(res.description)
    setInitialValues({ description: res.data.description })
    setDataLoaded(true)
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <div>
      <div className='eeii'>
        <div className='about_text'></div>
        <div className='form'>
          {dataLoaded && (
            <Form onFinish={onFinish} initialValues={initialValues}>
              <Form.Item label='Description' name='description'>
                <TextArea rows={10} />
              </Form.Item>

              <Form.Item>
                <div className='submit'>
                  <Button className='work-save' htmlType='submit' type='primary'>
                    SAVE
                  </Button>
                </div>
              </Form.Item>
            </Form>)}
        </div>
      </div>
    </div>
  )
}

export default WorkWithUs
