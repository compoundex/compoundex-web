import React, { Component } from 'react'
import {Row, Col, Layout, Divider, BackTop} from 'antd';
import ReactChartkick, { LineChart, AreaChart  } from 'react-chartkick';
import Highcharts from 'highcharts';
import axios from 'axios';
import _ from 'lodash';
import FadeIn from 'react-fade-in';
import Faq from './ui/Faq';
import RandomQuote from './ui/RandomQuote';



import Calculator from './ui/Calculator.js';
import InvestingSteps from './ui/InvetingSteps';
import Balance from './ui/Balance';

ReactChartkick.addAdapter(Highcharts)

const { Content } = Layout;

/* const data = {
  "2017-05-13":	1,
  "2017-05-14":	2,
  "2017-05-15":	4,
  "2017-05-16":	5,
  "2017-05-17":	7,
  "2017-05-18":	10,
  "2017-05-19":	14,
}*/

class Home extends Component {

  constructor(){
    super();
    this.state = {
      loading: false,
      transactions: null,
      data: null,
    }
  }

  componentDidMount(){
    axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=0x04ee4af9082746db738e7e5b49b733493a6bd81f&startblock=0&endblock=999999999&sort=asc&apikey=NVA31HN7N1FSDQ9SUS3PI5EJ12VFN36CXW`)
      .then(res => {
        if(res.data.status === '1'){
          
          const graphData = [];

          const transactions = res.data.result.map(transaction => {
            const dateObj = new Date(transaction.timeStamp * 1000); // Multiplied by 1000 so its in miliseconds.

            const dateFormat = dateObj.getFullYear()+ "-" + (dateObj.getMonth() + 1)+ "-" + dateObj.getDate() + ' ' + dateObj.getHours() ;  // YYYY-MM-DD
            const valueObj = transaction.value / 1e18 ; // Wei to Eth
            const valueFormat = valueObj;

            //Prepare graphData
            graphData.push({date: dateFormat, value: valueFormat});

            // Transactional Data per User
            return Object.assign({}, {
              date: dateFormat,
              value: valueFormat,
              block: transaction.blockNumber,
              from: transaction.from,
              gasPrice: transaction.gasPrice,
              gasUsed: transaction.gasUsed,
            });
          });

          const data = _(graphData)
                          .groupBy('date')
                          .map((objs, key) => ({
                            'date': key,
                            'value': _.sumBy(objs, 'value')}))
                          .value()
          const formatData = {};
          let sum = 0;
          data.forEach(day => {
            sum += day.value;
            formatData[day.date] = Math.round(sum * 100) / 100;
          });
          console.log(formatData)
          this.setState({transactions, data: formatData});
        } else {
          console.log('Failed to get Transactions');
        }
      })
  }
  
  render() {
    const { data } = this.state;
    return(
      <div>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Row gutter={24} type="flex" justify="space-around" align="top">
            <Col span={12}>
                <h1>Compoundex</h1>
                <h3>Get compound interest from your Ethereum</h3>
                <RandomQuote />
                <Faq />
                <Divider><h2>4% Daily Return</h2></Divider>
                <Calculator />
            </Col>
            <Col span={12} style={{textAlign: 'center'}}>
              <Balance />
              <AreaChart  colors={["#1890FF", "#1890FF"]} data={data} prefix="Ξ " />
              Check out our contract <a href="https://etherscan.io/address/0x04ee4af9082746db738e7e5b49b733493a6bd81f"> at Etherscan</a>
            </Col>
          </Row>
        </Content>
        <Divider />
        <Content >
          <Row style={{textAlign: "center"}}>
            <Col >
              <h1>How to start</h1>
            </Col>
          </Row> 
          <Row>
            <Col style={{marginLeft: '10%', width: '80%'}}>
              <InvestingSteps />
            </Col>
          </Row>
        </Content>
        <Divider />
        <div>
        <BackTop />
          <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
        </div>,
      </div>
    )
  }
}

export default Home
