import './webEdit.scss'
import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function WebsiteEditing () {
   const path = window.location.pathname
   const pathParts = path.split('/')
   const endFix = pathParts.pop()
   const [activeButton, setActiveButton] = useState(endFix)

   const handleLinkClick = (key) => {
      setActiveButton(key)
   }



   return (
      <div className='ban'>
         <div className='banner'>
            <div className='eight'>
               <div className='t'>
                  {/* Website Editing */}
               </div>

               <Menu className='mm'
                  triggerSubMenuAction="hover"
                  theme="dark" mode="horizontal" defaultSelectedKeys={['websiteEditing/events']} >
                  <Menu.Item key="/websiteEditing/events">
                     <Button
                        onClick={() => handleLinkClick('event')}
                        className={(activeButton === 'websiteEditing' || activeButton === 'event') ? 'link-active' : 'b'}>
                        <Link
                           to={""}
                        >
                           Events
                        </Link>
                     </Button>
                  </Menu.Item>

                  <Menu.Item key="/websiteEditing/news">
                     <Button
                        onClick={() => handleLinkClick('news')}
                        className={activeButton === 'news' ? 'link-active' : 'b'} >
                        <Link
                           to={"news"}
                        >
                           News
                        </Link>
                     </Button>
                  </Menu.Item>

                  <Menu.Item key="/websiteEditing/workWithUs">
                     <Button
                        onClick={() => handleLinkClick('workWithUs')}
                        className={activeButton === 'workWithUs' ? 'link-active' : 'b'}>
                        <Link to={"workWithUs"}>Work with Us</Link>
                     </Button>
                  </Menu.Item>

                  <Menu.Item key="/websiteEditing/aboutUs">
                     <Button
                        onClick={() => handleLinkClick('aboutUs')}
                        className={activeButton === 'aboutUs' ? 'link-active' : 'b'}>
                        <Link to={"aboutUs"}>About us</Link>
                     </Button>
                  </Menu.Item>
               </Menu>
            </div>
         </div>
         <Outlet />
      </div>
   )
}

export default WebsiteEditing
