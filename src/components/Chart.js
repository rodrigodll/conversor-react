import React, { Component } from 'react'
import { Bar, Line } from 'react-chartjs-2';

export default class Chart extends Component {
	constructor(props) {
        super(props)
        
		// Define valores iniciais
		this.state = {
			chartData: {
				labels: ['01', '02', '03', '04', '5', '6', '7', '8', '9', '10', '11'],
				datasets : [
					{
						label: 'Cotação',
						data: [
                            1.1969,
                            1.1633,
                            1.1754,
                            1.1616,
                            1.1588,
                            1.1708,
                            1.2235,
                            1.1684,
                            1.1878,
                            1.1794,
                            1.179,
                        ],
                        borderWidth: 0,
                        borderCorlor: 'red',
                        hoverBorderWidth: 2,
                        hoverborderCorlor: 'green',
                        borderColor: '#09b3d0',
                        pointBackgroundColor: '#09b3d0',
                        pointHitRadius: 25,
                        backgroundColor: 'transparent',
                        lineTension: 0,
                        pointRadius: 0,
                        borderCapStyle: 'square'
					}
				]
			} 
		}
	}

	render() {
		return(
			<div className="Chart">
				<Line
					data={this.state.chartData}
                    height={200}
					options={{ maintainAspectRatio: false }}
				/>
			</div>
		)
	}
}
