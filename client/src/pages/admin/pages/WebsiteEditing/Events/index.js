import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd'
import './index.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Events = () => {
  const [list, setList] = useState([])

  const loadList = async () => {
    const res = await axios.get('http://51.142.109.141/api/events')
    console.log(res)
    setList(res.data)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://51.142.109.141/api/events/${id}`)
    loadList()
  }

  useEffect(() => {
    loadList()
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '200px',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '100px',
    },
    {
      title: 'Datetime',
      dataIndex: 'datetime',
      key: 'datetime',
      width: '150px',
    },
    {
      title: 'Edit',
      dataIndex: 'delete',
      key: 'delete',
      width: '150px',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>

          <Button>
            <Link to={"/admin/editEvent/" + record.id}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div className='eight'>
        <span className='events_box'>

        </span>
        <Button className='add_new' type='primary'>
          <Link to={"/admin/addEvent"}> ADD NEW EVENT </Link>
        </Button>
        <div className='table'>
          <Table bordered dataSource={list} columns={columns}
            pagination={{ pageSize: 5, showTotal: total => `Total ${total} events` }}
            onChange={(pagination) => {
              setCurrentPage(pagination.current)
              setPageSize(pagination.pageSize)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Events
