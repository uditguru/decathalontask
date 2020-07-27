import React from 'react';
import { Menu } from 'antd';
import { LinkOutlined, HomeOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Latests from './articles';
import DetailsPage from './details';

const { SubMenu } = Menu;

export default class MenuBar extends React.Component {
  state = {
    current: 'mail',
    sources: null
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };


  componentDidMount(){
      fetch('https://newsapi.org/v2/sources?apiKey=5733cfe169044d3bb4ae73313206992f')
      .then(res => res.json())
      .then( results => {
          this.setState({
              sources : results.sources
          })
      })
  }

  render() {
    const { current } = this.state;
    return (
      <Router>
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<HomeOutlined />}>
          <a href="/"> Home</a>
        </Menu.Item>

        <SubMenu icon={<LinkOutlined />} title="Sources">
          <Menu.ItemGroup style={{width: "100%"}}>
            {
                this.state.sources && this.state.sources.map( source => (
                <Menu.Item key={source.id}> <a href={source.url}>{source.name}</a></Menu.Item>
                ))
            }
          </Menu.ItemGroup>
        </SubMenu>

      </Menu>

<Switch>
<Route path="/details">
  <DetailsPage />
</Route>
<Route path="/">
    <Latests />
</Route>
</Switch>
</Router>
    );
  }
}

