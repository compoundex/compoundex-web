import React, { Component } from 'react';
import { InputNumber, Row, Col, Card, Button, Icon} from 'antd';
import Compoundex from '../../../../build/contracts/Compoundex.json';
import store from '../../../store';
import contract from 'truffle-contract';

export default class Calculator extends Component {

	constructor(props) {
		super(props);
		this.state = {
			investment: null,
			interest: 0.04,
			txReceipt: null,
			loading: null, 
			message: '',
		}
	  }

	onChange = (value) => {
		this.setState({investment: value});
	}

	formatDate = (dateObj) => {
		return dateObj.getFullYear()+ "/" + (dateObj.getMonth() + 1)+ "/" + dateObj.getDate() + ' \n' + dateObj.getHours() + ':00';
	}

	sendEthereum = () => {
		const {investment} = this.state; 
		const web3 = store.getState().web3.web3Instance;
		this.setState({loading: true, message: 'Sending Transaction...'});
		if (typeof web3 !== 'undefined') {
    
			// Using truffle-contract we create the authentication object.
			const compoundex = contract(Compoundex)
			compoundex.setProvider(web3.currentProvider)

			web3.eth.getAccounts((error, accounts) => {
				compoundex.deployed()
				.then((instance) => {
					const compoundexInstance = instance
					console.log(compoundexInstance, accounts)
					//return compoundexInstance.balanceOf.call(web3.eth.accounts[0])
					return compoundexInstance.sendTransaction({from: accounts[0], value: web3.toWei(investment, "ether")});
				}).then((receipt) => {
					this.setState({txReceipt: receipt.tx, loading: false});
				}).catch(e => {
					this.setState({loading: false});
				})
			})
		}
	}

	render() {
		const {investment, interest, txReceipt, loading, message} = this.state;
		const currentDate = new Date();
		return (
		<div>
			<Card>
				<Row>
					<Col span={12}>
						<h3>Calculate your gains</h3>
					</Col>
					<Col span={12}>
						<InputNumber size="large" min={0} max={100} step={0.1} defaultValue={0} onChange={this.onChange} />	 ETH
					</Col>
				</Row>
				<br />
				<Row>
					<Col span={6}>
						<h3>Daily</h3>
					</Col>
					<Col span={6}>
						<h3>{ investment ? Math.round(investment * interest * 1 * 100) / 100 : '--'} Ξ</h3>
					</Col>
					<Col span={6}>
						<h3>One Month</h3>
					</Col>
					<Col span={6}>
						<h3>{ investment ? Math.round(investment * interest * 30 * 100) / 100 : '--'} Ξ</h3>
					</Col>
				</Row>
				<br />
				<Row>	
					<Col span={6}>
						<h3>Weekly</h3>
					</Col>
					<Col span={6}>
						<h3>{ investment ? Math.round(investment * interest * 7 * 100) / 100 : '--'} Ξ</h3>
					</Col>
					<Col span={6}>
						<h3>Breakeven Date</h3>
					</Col>
					<Col span={6}>
						<h3>{this.formatDate(new Date(currentDate.setDate(currentDate.getDate() + 25)))}</h3>
					</Col>
				</Row>
			</Card>
			<br/>
			<Row style={{textAlign: 'center'}}>
				{loading ? (<span><Icon type="loading" theme="outlined" /><p>{message}</p></span>) : (
				<div>
				{!txReceipt ? (
					<Col span={24}>
						{investment ?
							(<span>
								<p>Or sent ETH to <a href="https://etherscan.io/address/0x04ee4af9082746db738e7e5b49b733493a6bd81f">0x04ee4af9082746db738e7e5b49b733493a6bd81f</a></p>
								<Button size="large" type="primary" onClick={this.sendEthereum}>{'Invest ' + investment + ' Ξ'}</Button>
							</span>) 
							: 
							(<span>
								<p>{'Calculate your ROI'}</p>
								<Button size="large" disabled type="primary">Try it!</Button>
							</span>)
						}
					</Col>
				): (
					<Col span={24}>
						<span>
							<p>Transaction Sent! (<a href={"https://etherscan.io/tx/" + txReceipt}>{txReceipt}</a>)</p>
						</span>
					</ Col>
				)}
				</div>
				)}
			</Row>
		</div>
		)
	}
}
