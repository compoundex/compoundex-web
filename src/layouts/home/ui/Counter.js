import React, { Component } from 'react'
import { LineChart } from 'react-chartkick';
import {Row, Col, Divider, InputNumber} from 'antd';

const data = [
    0,
    4,
    8,
    12,
    16,
    20,
    24,
    28,
    32,
    36,
     40,
     44,
     48,
     52,
     56,
     60,
     64,
     68,
     72,
     76,
     80,
     84,
     88,
     92,
     96,
     100,
     104,
     108,
     112,
     116,
     120,
]

export default class Counter extends Component {
  

    constructor(props) {
        super(props);
    
        this.state = {
            invested: 1,
            investedROI: 0,
            counter: 0,
            currentInvestment: {},
        }

        this.onChange = this.onChange.bind(this)
      }
    

    componentDidMount() {
        setInterval(() => {
            const {currentInvestment, counter, invested} = this.state;
            if (counter < data.length) {
                const current = currentInvestment;
                const roi = Math.round(invested * (data[counter] / 100 * 100)) / 100;
                current[counter] =  roi;
                this.setState({counter: this.state.counter + 1, investedROI: Math.round(roi * 1000) /1000});
            }
        }, 1000)
    }

    onChange(value) {
        this.setState({
            invested: value,
            investedROI: 0,
            counter: 0,
            currentInvestment: {},
        })
    }
    
    render() {
    const {currentInvestment} = this.state; 
    return (
      <Row>
          <Col span={12}>
            <h3>If you had invested Ξ{'  '}
                <InputNumber size="small" style={{width: '10x', marginLeft: '5px'}} min={0} max={10} step={0.1} defaultValue={this.state.invested} onChange={this.onChange} />
                {'  '} one Month Ago:
            </h3>
            <Divider >Return Of Investment at</Divider>
            <h1>Day {this.state.counter}: {this.state.investedROI} Ξ</h1>
          </Col>
          <Col span={12}>
            <LineChart colors={["#1890FF", "#1890FF"]}  data={currentInvestment} prefix="Ξ " height="150px"/>
          </Col>
      </Row>
    )
  }
}
