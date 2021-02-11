import React from 'react';
import { Menu } from 'antd';


function AboutMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="about">
        <a href="/aboutUs">About Us</a>
        
      </Menu.Item>
    </Menu>
  )
}

export default AboutMenu