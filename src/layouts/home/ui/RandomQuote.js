import React, { Component } from 'react'

const quoteList = [
    "Compound interest is the eighth wonder of the world. He who understands it, earns it ... he who doesn't ... pays it. -Albert Einstein",
    "Compound interest is the most powerful force in the universe. -Albert Einstein",
    "Compound interest is the greatest mathematical discovery of all time. -Albert Einstein",
    "My wealth has come from a combination of living in America, some lucky genes, and compound interest. ~ Warren Buffett",
    "If you understand compound interest, you basically understand the universe. ~ Robert Breault",
    "Put God in your debt. Every stroke shall be repaid. The longer the payment is with-held, the better for you; for compound interest on compound interest is the rate and usage of this exchequer. ~ Ralph Waldo Emerson",
    "Compound interest is proof of gods existence. ~ Jeff Rich",
    "Good and evil increase at compound interest. That's why the little decisions we make every day are of infinite importance. ~ C. S. Lewis",
    "Mathematically, debts grow exponentially at compound interest. Banks recycle the interest into new loans, so debts grow exponentially, faster than the economy can afford to pay. ~ Michael Hudson"
]

export default class RandomQuote extends Component {

    constructor(props) {
		super(props);
		this.state = {
            quote: null,
		}
	  }

    componentWillMount() {
        this.setState({
            quote: Math.floor(Math.random() * (quoteList.length - 1))  
        })
    }

    /* componentDidMount(){
        setInterval(() => {
            this.setState({
                quote: Math.floor(Math.random() * (quoteList.length - 1))  
            })
        }, 5000)
    } */

    render() {
        const {quote} = this.state;
        return (
                <p>
                    <i>{quoteList[quote]}</i>
                </p>
        )
    }
}
