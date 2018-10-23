import React, { Component } from 'react';
import { Button, Card, message, Row, Col, Menu, Icon, Dropdown, Tooltip, Progress } from 'antd';
import store from '../../../store';
import axios from 'axios';

const rate = 4;
const secondRate = rate / 24 / 60 / 60 / 100; // Interest -> Hours -> Minutes -> Seconds 


const noInfo = (error) => {
	message.error(error);
  };


const pairs = [
	"CAD", "CNY", "BTC", "EUR", "GBP", "HKD", "USD", "JPY", "KRW", "MXN"
	//"AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR" 
]

const PairsMenu = (props) => (
	<Menu >
		{pairs.map(marketPair => {
			return (
				<Menu.Item key={marketPair} onClick={() => props.changePair(marketPair)}>
					<a>{marketPair}</a>
				</Menu.Item>
			)
		})}
	</Menu>
)

export default class Balance extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pair: 'USD',
			rate: 0, 
			account: null,
			totalWithdrawn: null,
			totalInterest: null,
			totalInvested: null,
		}
	}
	

	componentWillMount() {
		const {pair} = this.state;
		axios.get('https://api.coinmarketcap.com/v2/ticker/1027/?convert=' + pair)
		.then(res => {
			this.setState({
				rate: res.data.data.quotes[pair].price
			})
		})
	}

	changePair = (newPair) => {
		axios.get('https://api.coinmarketcap.com/v2/ticker/1027/?convert=' + newPair)
		.then(res => {
			this.setState({
				pair: newPair,
				rate: res.data.data.quotes[newPair].price
			})
		})
	}

	calculateROI = (transactions, account) => {
		const acctTransactions = transactions.filter(tx => {
			return tx.from === account;
		});

		let totalInvested = 0;
		let totalAmount = 0;
		let totalWithdrawn = 0;
		let lastTransaction = false;
		
		acctTransactions.forEach(transaction => {
			const txDate = new Date(transaction.timeStamp  * 1000);
			const secondDiff = (Date.now() - txDate) / 1000;
			const totalInterest = (secondDiff * secondRate);
			const ethValue = transaction.value / 1e18;

			if (lastTransaction) {
				const lastDate = new Date(lastTransaction.timeStamp * 1000);
				const interestDelta = (txDate - lastDate) / 1000 ;
				const withdrawn = ( totalInvested ) * (secondRate * interestDelta);
				totalWithdrawn += withdrawn;
			}
			lastTransaction = transaction;

			totalInvested += ethValue;
			totalAmount += totalInterest * ethValue;
		})

		const roundedWithdrawn = Math.round(totalWithdrawn * 1000000) / 1000000
		const roundedInterest = Math.round(totalAmount * 1000000) / 1000000
		const roundedTotal = Math.round(totalInvested * 1000000) / 1000000
		
		return {account, roundedWithdrawn, roundedInterest, roundedTotal};
	}

	showBalance = () => {
		const web3 = store.getState().web3.web3Instance;
		if (typeof web3 !== 'undefined') {
			web3.eth.getAccounts((error, accounts) => {
				if (accounts[0]) {
					axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=0x04ee4af9082746db738e7e5b49b733493a6bd81f&startblock=0&endblock=999999999&sort=asc&apikey=NVA31HN7N1FSDQ9SUS3PI5EJ12VFN36CXW`)
      				.then(res => {
						const data = this.calculateROI(res.data.result, accounts[0]);
						if (data.roundedTotal) {
							this.setState({
								account: accounts[0],
								totalWithdrawn: data.roundedWithdrawn,
								totalInterest: data.roundedInterest,
								totalInvested: data.roundedTotal,
							})
						} else {
							return noInfo('No deposits from this account');
						}
					})
				} else {
					noInfo('No metamask Detected');
				}
			})
		} else {
			this.setState({account: 'No Metamask Detected'});
		}
	}

	render() {
		const {rate, pair, account, totalInterest, totalInvested, totalWithdrawn} = this.state;
		return (
			<div>
				<Card
					style={{ width: '100%', minHeight: '25vh', marginTop: '-50px' }}
					title="Stats"
    				extra={
						<span>
							<a style={{marginTop: '15px'}} onClick={this.showBalance}>Refresh</a>
							{' - '}
							<Dropdown overlay={(<PairsMenu changePair={this.changePair}/>)} trigger={['hover']}>
								<a >
								{pair}<Icon type="down" />
								</a>
							</Dropdown>
						</span>
					}
				>
					{ account ?
						(<div>
							<Row >
								<Col span={3}>
									<h4>Investment: </h4>
								</Col>
								<Col span={5}>
									<b>{pair}</b> {(Math.round(totalInvested * rate * 100) / 100).toLocaleString()}
								</Col>
								<Col span={3}>
									<h4>Interest: </h4>
								</Col>
								<Col span={5}>
									<b>{pair}</b> {(Math.round(totalInterest * rate * 100) / 100).toLocaleString()} ({(Math.round((totalInterest - totalWithdrawn) * rate * 100) / 100).toLocaleString()})
								</Col>
								<Col span={3}>
									<h4>Withdrawn: </h4>
								</Col>
								<Col span={5}>
									<b>{pair}</b> {(Math.round(totalWithdrawn * rate * 100) / 100).toLocaleString()}
								</Col>
							</Row>
							<Row >
								<Col span={3}>
									<h4>Investment: </h4>
								</Col>
								<Col span={5}>
									<b>Ξ</b> {totalInvested}
								</Col>
								<Col span={3}>
									<h4>Interest: </h4>
								</Col>
								<Col span={5}>
									<b>Ξ</b> {totalInterest} ({Math.round((totalInterest - totalWithdrawn) * 1000) /1000})
								</Col>
								<Col span={3}>
									<h4>Withdrawn: </h4>
								</Col>
								<Col span={5}>
									<b>Ξ</b> {totalWithdrawn}
								</Col> 
							</Row>
							<Row>
								<Col span={24}>
								<Tooltip title={
									"You have generated " 
									+ (Math.round(totalInterest * 100) / 100) 
									+ " Ξ (" + Math.round((totalInterest / totalInvested * 100) * 100) / 100 
									+ "%)"
									}>
									<Progress percent={Math.round((totalInterest / totalInvested * 100) * 100) / 100} successPercent={ Math.round((totalWithdrawn / totalInvested * 100) * 100) / 100} />
								</Tooltip>
								</Col>
							</Row>
						</div>) : 
						(
							<div>
								<h3>No info</h3>
								<p>Check your balance here</p>
							</div>
						)	
					}
				</Card>,
			</div>
		)
	}
}
