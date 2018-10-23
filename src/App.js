import React, { Component } from 'react'
import { Link } from 'react-router'

// Styles
import { Menu, Icon, Badge, Modal } from 'antd';
import './App.css'

const confirm = Modal.confirm;

class App extends Component {

  state = {
    current: 'portfolio',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  showConfirm = () => {
    confirm({
      title: 'CompoundEx',
      content: (<p>By clicking 'Agree' you accept the terms and conditions<br /><a href="/tos">Terms and Conditions</a></p>),
      onOk() {
        localStorage.setItem('tos', "agreed");
      },
    });
  }

  render() {
    const tos = localStorage.getItem('tos');
    console.log(tos);
    return (
      <div className="App">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
            <Menu.Item key="portfolio">
              <Link to="/"><Icon type="stock" />My Portfolio</Link>
            </Menu.Item>
            <Menu.Item key="funds" disabled>
              <Link to="/"><Icon type="fund" /><Badge dot >Funds</Badge></Link>
            </Menu.Item>
            <Menu.Item key="dashboard" disabled>
              <Link to="/"><Icon type="pie-chart" /><Badge dot >Dashboard</Badge></Link>
            </Menu.Item>            
          </Menu>
        { this.props.children }
        { tos !== "agreed" &&
           this.showConfirm()
        }
      </div>
    );
  }
}

export default App
