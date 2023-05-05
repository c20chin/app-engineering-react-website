import './res.scss'
import React from 'react'
import { Button, DatePicker, Form, Input, } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Response = () => {
    const navigate = useNavigate()

    const path = window.location.pathname
    const pathParts = path.split('/')
    const proposalsId = pathParts.pop()

    const [fileList, setFileList] = useState()
    const [list, setList] = useState([])

    const [listInfo, setListInfo] = useState([])

    const [orgINfos, setOrgINfos] = useState([])

    const handleChange = ({ fileList }) => {
        setFileList(fileList)
    }

    const loadList = async () => {
        const res = await axios.get('http://51.142.109.141/api/proposals/' + proposalsId)
        console.log(res.data)
        setList(res.data)
        loadListInfo(res.data.userId)
        loadOrgListInfo(res.data.userId)
    }

    const loadListInfo = async (id) => {
        console.log(id)
        const res = await axios.get('http://51.142.109.141/api/proposals/find/user/' + id)
        console.log(res.data[0])
        setListInfo(res.data[0])
    }

    const loadOrgListInfo = async (id) => {
        console.log(id)
        const res = await axios.get('http://51.142.109.141/api/orginfo/user/' + id)
        console.log(res.data[0])
        setOrgINfos(res.data[0])
    }

    const onFinish = async (values) => {
        console.log('Success:', values)
        const msg = values.msg
        navigate("/admin/proposals")
        await axios.post('http://51.142.109.141/api/proposals/respond/proposal', { msg, proposalsId: proposalsId })
    }

    useEffect(() => {
        loadList()
    }, [])

    return (
        <div className='nine'>
            <div className='NO'>
                Proposal Information
            </div>

            <div className='bigBox'>
                <div className='ProInfo'>
                    <ul>
                        <li>
                            <span className="project-item-title">Title:</span>
                            <span className="project-item">{list.title}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Category:</span>
                            <span className="project-item">{list.projectType}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Description:</span>
                            <span className="project-item">{list.description}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Users of the project:</span>
                            <span className="project-item">{list.targetDevice}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Project Type:</span>
                            <span className="project-item">{list.projectType}</span>
                        </li>
                    </ul>
                </div>

                <div className="OrgInfo">
                    {/* <h3>Organization Information</h3> */}
                    <ul>
                        <li>
                            <span className="project-item-title">Organization Name:</span>
                            <span className="project-item">{orgINfos.orgName}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Contact Name:</span>
                            <span className="project-item">{orgINfos.contactName}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Contact Job Title:</span>
                            <span className="project-item">{orgINfos.jobTitle}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Contact Email:</span>
                            <span className="project-item">{orgINfos.contactEmail}</span>
                        </li>
                        <li>
                            <span className="project-item-title">Contact Phone Number:</span>
                            <span className="project-item">{orgINfos.contactPhone}</span>
                        </li>
                    </ul>
                </div>
            </div>


            <div className='text'>
                <Form
                    onFinish={onFinish}>
                    <Form.Item>
                        <Button className='checkback-button' type="primary" htmlType="submit">
                            BACK
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )

}

export default Response