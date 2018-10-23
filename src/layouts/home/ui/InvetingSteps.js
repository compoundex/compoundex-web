import React, { Component } from 'react'
import { Steps, Button, message, Card, Row, Col, Divider, Icon } from 'antd';
import ShowAddress from './ShowAddress';
import Counter from './Counter';

const Step = Steps.Step;

const steps = [{
  title: 'Invest',
  content: 0,
}, {
  title: 'Get Interest',
  content: 1,
}, {
  title: 'Collect',
  content: 2,
}];

export default class InvestingSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Card style={{textAlign: "center", marginTop: '10px', height: '50vh'}}>
          <div className="steps-content">
              {steps[current].content === 0 &&
                <div>
                  <h1>Send Ethereum to the Smart Contract</h1>
                  <ShowAddress />
                  <Row style={{marginTop: '5vh'}}>
                    <Col span={6}><img className="wallets" role="presentation" 
                      src="https://www.myetherwallet.com/images/myetherwallet-logo.png"></img>
                    </Col>
                    <Col span={6}><img className="wallets" role="presentation"
                      src="https://theme.zdassets.com/theme_assets/2214825/dadf29713d456c21cbef888cd5fc706dfd212b74.svg"></img>
                    </Col>
                    <Col span={6}><img className="wallets" role="presentation" 
                      src="https://www.canalcripto.com/uploads/monthly_2018_04/Metamask.png.5d59b9c7affcd5cb43ec425b824aad1c.png"></img>
                    </Col>
                    <Col span={6}><img className="wallets" role="presentation" 
                      src="https://kuna.ua/wp-content/uploads/2017/10/jaxx.png"></img>
                    </Col>
                  </Row>
                  <Row style={{marginTop: '2vh'}}>
                    <Col>
                      <p>The wallet is not on the list? Just send the Ethereum amount to this <a>SmartContract</a></p>
                    </Col>
                  </Row>
                </div>
              } 
              {steps[current].content === 1 &&
                <div>
                  <h1>4% Daily Interest</h1>
                  <Row style={{marginTop: '5vh'}}>
                    <Counter />
                  </Row>
                </div>
              } 
              {steps[current].content === 2 &&
                <div>
                  <h1>Profit</h1>
                  <Row style={{marginTop: '5vh'}}>
                    <h2><Icon type="dollar" theme="outlined" /> Send a 0 ETH transaction to withdraw</h2>
                    <Divider><ShowAddress /></Divider>
                    <h2>Send more ETH to withdraw and reinvest <Icon type="rise" theme="outlined" /></h2>                   
                  </Row>
                </div>
              } 
          </div>
          <div className="steps-action" style={{marginTop: '2vh'}}>
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
              )
            }
            {
              current < steps.length - 1
              && <Button type="primary" onClick={() => this.next()}>Next</Button>
            }
            {
              current === steps.length - 1
              && <Button type="primary" onClick={() => message.success('Start to invest in CompoundEx!')}>Done</Button>
            }
          </div>
        </Card>
      </div>
    );
  }
}