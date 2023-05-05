import './index.scss';
import { Input, Table, Button, Layout, Space, Popconfirm, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Footer } = Layout;

const UserProposals = () => {
  const [org, setOrg] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
    },
    {
      title: '',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            className="edit-button"
            onClick={(e) => {
              if (record.status !== 'Pending') {
                e.preventDefault();
                showNotification('Cannot Edit Proposal', 'You can only edit proposals with "Pending" status.');
              } else {
                navigate(`/editProposal/${record.id}`);
              }
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Are you sure you want to delete this proposal?"
            onConfirm={async () => {
              await deleteProposal(record.id);
            }}
            okText="Yes"
            cancelText="No"
            disabled={record.status !== 'Pending'}
          >
            <Button
              className="delete-button"
              danger
              disabled={record.status !== 'Pending'}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const updateProposal = async (id, updatedProposal) => {
    console.log('updateProposal called with id:', id);
    try {
      await axios.put(`http://51.142.109.141/api/proposals/update/${id}`, updatedProposal);
      loadList();
    } catch (error) {
      console.error('Error updating proposal:', error);
    }
  };
    const deleteProposal = async (id) => {
    console.log('deleteProposal called with id:', id);
    try {
      await axios.delete(`http://51.142.109.141/api/proposals/delete/${id}`);
      loadList();
    } catch (error) {
      console.error('Error deleting proposal:', error);
    }
  };

  const loadOrgInfo = async () => {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const url = 'http://51.142.109.141/api/orginfo/user/' + id;
    const res = await axios.get(url);
    setOrg(res.data);
  };

  const loadList = async () => {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const url = 'http://51.142.109.141/api/proposals/user/' + id;
    const res = await axios.get(url);
    setList(res.data);
  };


  const onSearch = async (value) => {
    const id = JSON.parse(localStorage.getItem('user')).id;
    const url = `http://51.142.109.141/api/proposals?title=${value}&user=${id}`;
    const res = await axios.get(url);
    const filteredData = res.data.filter((proposal) => proposal.userId === id);
    setList(filteredData);
  };

  const showNotification = (title, message) => {
    notification.warning({
      message: title,
      description: message,
    });
  };

  useEffect(() => {
    loadOrgInfo();
    loadList();
  }, []);

  return (
    <div className="container">
      {org.length === 0 ? (
        <div className="jumbotron" style={{
          backgroundColor: "white",
          color: "white",
          textAlign: "center",
          justifyContent: 'center',
          alignItems: 'center',
        }}
>
          <h3 style={{ color: 'black' }}>Please fill in organization info before adding proposals! </h3>
          <p>
            <Link to="/orginfo-add">
              <Button> Add Organization Info </Button>
            </Link>
          </p>
        </div>

      ) : (
        <div className="ban">
          <div className="eight">
            <div className="prop"></div>

            <div className="search_export">
              <div className="search-box">
                <Search
                  className="search"
                  placeholder="Search proposals"
                  allowClear
                  size="middle"
                  onSearch={onSearch}
                />
              </div>
              <Button className="export" type="primary">
                <Link to="/new-proposal">New Proposal </Link>
              </Button>
            </div>
            <div className="table">
              <Table
                rowKey={(record) => record.id}
                bordered
                dataSource={list}
                columns={columns}
                expandable={{}}
                pagination={{
                  pageSize: 5,
                  showTotal: (total) => ` ${total} items shown`,
                }}
              />
            </div>
            </div>
            </div>
            )}
    </div>
  );
};

export default UserProposals;