import React from 'react';
import { Modal, Button, Collapse } from 'antd';

const Panel = Collapse.Panel;

const text = `
    Compoundex is Community Fund relying on the Ethereum blockchain using Smart Contracts.
    It is fully automated and no one owns the contract. 
    Funds that are stored on the contract account are managed exclusively with a simple and reliable descentralized program that makes payments. 
    Code of the program guarantees lifetime payments. You can see the code and audit, verify it or ask community members.
`;

const text2 = `
    As long as the contract have Ethereum, you will keep receiving interest on your Ethereum.
    All the data is public on Compoundex and Etherscan so you can keep track of your investment.
`;

const text3 = `
    There's not a minimum amount, but we recommend investing more than 0.01 ETH since lower amounts
    won't generate enough interests to cover the gas fees.
`;

const text4 = `
    Compoundex is 100% Open Source, people can verify the code and change it as they want. 
    All the groups and communities around the project are supported by ordinary investors.
`;


export default class Faq extends React.Component {
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
          Learn More
        </Button>
        <Modal
          title="Frequently Asked Questions (FAQ)"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <Collapse accordion>
                <Panel header="How does it works?" key="1">
                <p>{text}</p>
                </Panel>
                <Panel header="How long will I receive interests?" key="2">
                <p>{text2}</p>
                </Panel>
                <Panel header="What is the minimum amount to invest?" key="3">
                <p>{text3}</p>
                </Panel>
                <Panel header="Who is developing CompoundEx?" key="4w">
                <p>{text4}</p>
                </Panel>
            </Collapse>
          </div>
        </Modal>
      </div>
    );
  }
}
