import './projectsMain.scss'
import { Input, Table, Button, Layout, Space, Popconfirm, } from 'antd'
import axios from 'axios'
import { saveAs } from 'file-saver'
import React, { useState, useEffect, useRef } from 'react'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
const { Search } = Input

const Projects = () => {
  const [list, setList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: '100px',
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      width: '100px',
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '150px',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => PublishProject(record.id, record.publish)}>
            {record.publish === 'False' ? 'Publish' : 'Unpublish'}
          </Button>
          <Button onClick={() => FeatureProject(record.id, record.feature)}>
            {record.feature === 'False' ? 'Highlight' : 'UnHighlight'}
          </Button>
          <Button>
            <Link to={'/admin/editProject/' + record.id}>Edit</Link>
          </Button>
          <Popconfirm title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const PublishProject = async (pId, what) => {
    what = what === 'True' ? 'False' : 'True'
    const res = await axios.post('http://51.142.109.141/api/projects/change/publish/' + what + '/' + pId)
    loadList()
    console.log(res.data)
  }

  const FeatureProject = async (pId, what) => {
    what = what === 'True' ? 'False' : 'True'
    const res = await axios.post('http://51.142.109.141/api/projects/change/feature/' + what + '/' + pId)
    console.log("front")
    loadList()
    console.log(res.data)
    if (res.data.message === 'no') {
      alert('Max highlight 2 projects')
    }
    console.log("begind")
  }

  const loadList = async () => {
    const res = await axios.get('http://51.142.109.141/api/projects')
    console.log(res)
    setList(res.data)
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const onSearch = async (value) => {
    console.log(value)
    const url = 'http://51.142.109.141/api/projects/find/title/' + value
    const res = await axios.get(url)
    console.log(res)
    setList(res.data)
  }

  const Export = async () => {
    console.log(selectedRowKeys)
    const response = await axios.post('http://51.142.109.141/api/projects/export/project', {
      ids: selectedRowKeys,
    })
    if (response.data === 'no') {
      alert('No data')
    } else {
      const blob = new Blob([response.data], { type: 'text/csv' })
      saveAs(blob, 'projects.csv')
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://51.142.109.141/api/projects/${id}`)
    loadList()
  }
  const fileInputRef = useRef(null)


  const handleImport = async () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        console.log('Parsed CSV:', results.data)
        axios.put('http://51.142.109.141/api/projects/add/CSV', results.data)
        window.location.reload()
      }
    })

  }


  useEffect(() => {
    loadList()
  }, [])

  return (
    <div className="ban">
      <div className="eight">
        <div className="prop"></div>

        <div className="search_export">
          <div className="search-box">
            <Search
              className="search"
              placeholder="search projects"
              allowClear
              size="middle"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onSearch={onSearch}
            />
          </div>
          <Button className="add" type="primary">
            <Link to="/admin/addProject"> Add Project </Link>
          </Button>
          <Button className="export" type="primary"
            onClick={Export}>
            Export Projects
          </Button>
          <Button className="export" type="primary" onClick={handleImport}>
            Import Projects
          </Button>
          <input type="file" accept=".csv" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
        </div>

        <div className="table">
          <Table
            bordered
            dataSource={list}
            columns={columns}
            pagination={{ pageSize: 8, showTotal: (total) => `Total ${total} projects` }}
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

export default Projects
