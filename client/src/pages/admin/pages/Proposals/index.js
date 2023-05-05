import './index.scss'
import { Input, Table, Button, Layout, Space } from 'antd'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
const { Search } = Input

const Proposals = () => {
  const [list, setList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [keyword, setKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      width: '80px',
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '150px',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '115px',
    },
    {
      title: '',
      dataIndex: 'do',
      key: 'do',
      width: '75px',
      render: (text, record) => (
        <Space>
          <Button>
            <Link to={'/admin/respondProposals/' + record.id}>Check</Link>
          </Button>
          <Button disabled={record.status === 'Accept'} onClick={() => record.status !== 'Accept' && accept(record.id)}>
            {record.status === 'Accept' ? 'Accept' : 'Accept'}
          </Button>

          <Button disabled={record.status === 'Decline'} onClick={() => record.status !== 'Decline' && decline(record.id)}>
            {record.status === 'Decline' ? 'Decline' : 'Decline'}
          </Button>

        </Space>
      ),
    },
  ]
  const decline = async (value) => {
    await axios.post('http://51.142.109.141/api/proposals/respond/decline/' + value)
    loadList()
  }
  const accept = async (value) => {
    await axios.post('http://51.142.109.141/api/proposals/respond/accept/' + value)
    loadList()
  }
  const loadList = async () => {
    var res = await axios.get('http://51.142.109.141/api/proposals')
    console.log(res.data[0].createdAt)
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createdAt = res.data[0].createdAt.split("T")[0]
      // do something with item
    }
    console.log(res)
    setList(res.data)
  }

  const onSearch = async (value) => {
    console.log(value)
    const url = 'http://51.142.109.141/api/proposals/find/title/' + value
    const res = await axios.get(url)
    console.log(res)
    for (let i = 0; i < res.data.length; i++) {
      res.data[i].createdAt = res.data[0].createdAt.split("T")[0]
      // do something with item
    }
    setList(res.data)
    setKeyword(value)
  }


  const Export = async () => {
    console.log(selectedRowKeys)
    const response = await axios.post('http://51.142.109.141/api/proposals/export/proposal', {
      ids: selectedRowKeys,
    })
    if (response.data === 'no') {
      alert('No data')
    } else {
      const blob = new Blob([response.data], { type: 'text/csv' })
      saveAs(blob, 'proposals.csv')
    }
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  useEffect(() => {
    loadList()
  }, [])

  return (
    <div className='ban'>
      <div className='eight'>
        <div className='prop'>
        </div>

        <div className='search_export'>
          <div className="search-box">
            <Search
              className='search'
              placeholder="search proposals"
              allowClear
              size="middle"
              value={keyword}
              onSearch={onSearch}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <Button className='export' type='primary' onClick={Export}>
            Export to CSV
          </Button>
        </div>

        <div className='table'>

          <Table
            bordered
            dataSource={list}
            columns={columns}
            pagination={{ pageSize: 8, showTotal: total => `Total ${total} proposals` }}
            rowSelection={rowSelection}
            rowKey='id'
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
export default Proposals