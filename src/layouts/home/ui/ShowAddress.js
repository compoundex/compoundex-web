import React, { Component } from 'react';
import { Modal, Button, Divider } from 'antd';
import QRCode from 'qrcode.react';

export default class ShowAddress extends Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Show Address
        </Button>
        <Modal
          title="Sent ETH to this address"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            <div style={{textAlign: "center"}}>
                <QRCode value="0x04ee4af9082746db738e7e5b49b733493a6bd81f" size={200}/>,
                <Divider>or Copy</Divider> 
                <p>0x04ee4af9082746db738e7e5b49b733493a6bd81f</p>
            </div>
        </Modal>
      </div>
    );
  }
}