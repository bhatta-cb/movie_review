import React from 'react';
import { Menu } from 'antd';


function SearchMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="search">
        <a href="/searchMovie">Search Movies</a>
        
      </Menu.Item>
    </Menu>
  )
}

export default SearchMenu