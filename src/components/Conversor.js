import React, { Component } from 'react'
import Select from 'react-select'
import coinList from './listOption'

import arrow from '../svg/arrow.svg'

import './Conversor.css';

const optionsSwitchFrom = coinList.coinList

const optionsSwitchTo = coinList.coinList

export default class Conversor extends Component {
	constructor(props) {
		super(props)
		
		// Define valores iniciais
		this.state = {
			value_from: '',
			value_to: 0,
			selectedOptionFrom: optionsSwitchFrom[0].options[0],
			selectedOptionTo: optionsSwitchFrom[0].options[3],
			currentQuote: 0
		}
		console.log(`valueFrom:`, this.state.selectedOptionFrom)
		
		this.converter = this.converter.bind(this)
		this.handleChangeFrom = this.handleChangeFrom.bind(this)
		this.handleChangeTo = this.handleChangeTo.bind(this)
	}
	
	handleChangeFrom = selectedOptionFrom => {
		this.setState({ selectedOptionFrom }, () => console.log(`valueFrom:`, this.state.selectedOptionFrom));
	};
	handleChangeTo = selectedOptionTo => {
		this.setState({ selectedOptionTo }, () => console.log(`valueTo:`, this.state.selectedOptionTo));
	};	
	
	converter() {
		// busca moedas a serem convertidas   
		let de_para = `${this.state.selectedOptionFrom.value}_${this.state.selectedOptionTo.value}`
		console.log(de_para)
		
		// monta url de consulta de api
		let get_api = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=y&apiKey=df9d1631139b8415d2e1`
		
		// consulta api
		fetch(get_api)
		.then(res => {
			// transforma resultado da busca em Json
			return res.json()
		})
		.then(json => {
			// Isola resultado de cotação
			let quote = json[de_para].val
			let currentQuote = (quote).toFixed(2)
			
			// Cálculo de conversão
			// valor-inserido * valor-cotação-atual
			let value_to = (parseFloat(this.state.value_from) * quote).toFixed(2)
			
			// Define resultado da conversão
			this.setState({currentQuote})
			this.setState({value_to})
		})
	}
	
	render() {
		const customStyles = {
			menu: (provided, state) => ({
				...provided,
				width: state.selectProps.width,
				borderBottom: '1px dotted pink',
				color: state.selectProps.menuColor,
				textAlign: 'left',
			}),

			input: () => ({
				// backgroundColor: 'red',
				// width: '100%',
				borderRadius: 0,
				appearance: 'none'
			}),
		  
			control: (provided, state) => ({
				...provided,
				padding: 0,
				border: 0,
				background: 'none',
				boxShadow: 'none'
			}),

			indicatorSeparator: () => ({
				border: 0
			}),

			group: () => ({
				// border: '1px solid blue',
				backgroundColor: '#f7f7f7',
			}),
			groupHeading: () => ({
				// border: '1px solid blue',
				fontWeight: '700',
				padding: '20px 10px',
			}),

			singleValue: (provided, state) => {
				const opacity = state.isDisabled ? 0.5 : 1;
				const transition = 'opacity 300ms';
		  
				return { ...provided, opacity, transition };
			}
		  }
		return (
			<div className="Conversor">
				<div class="container">
					<div className="row">
						<div class="conversor__box conversor__box--from col-sm">
							<div className="conversor__line">
								<div className={`currency-flag currency-flag-lg currency-flag-${this.state.selectedOptionFrom.value}`}></div>
								
								{/* Seletor de moeada */}
								<Select
									className="input--text"
									defaultValue={optionsSwitchFrom[0].options[0]}
									options={optionsSwitchFrom}
									noOptionsMessage={() => "Moeda não encontrada"}
									isSearchable
									// value={this.state.selectedOptionFrom}
									onChange={this.handleChangeFrom}
									styles={customStyles}
									placeholder={this.state.placeholder}
								/>
							</div>

							<div className="conversor__line">
								{/* input de Valor */}
								<div className="conversor__input">
									<label>{this.state.selectedOptionFrom.symbol}</label>
									<input type="tel" onChange={(event) => {this.setState({value_from:event.target.value})}}></input>
								</div>
							</div>

							<div className="conversor__line">
								{this.state.currentQuote === 0 ? '': 
									<div class="conversor__rate">
										<span>Taxa de câmbio</span>
										<em>
											{this.state.selectedOptionFrom.symbol + this.state.currentQuote}
										</em>
									</div>
								}
								{/* Botão de submit */}
								<button className="conversor__trigger" onClick={this.converter}>
									Converter 
									<span className="conversor__trigger--icon step-1">
										<img src={arrow} className="App-logo" alt="logo" />
									</span>
									<span className="conversor__trigger--icon step-2">
										<img src={arrow} className="App-logo" alt="logo" />
									</span>
								</button>
							</div>
						</div>
						
						<div class="conversor__box conversor__box--to col-sm">
							<div className="conversor__line">
								<div class="">
									<div className={`currency-flag currency-flag-lg currency-flag-${this.state.selectedOptionTo.value ? this.state.selectedOptionTo.value : 'BRL'}`}></div>

									{/* Seletor de moeada */}
									<Select
										className="input--text"
										options={optionsSwitchTo}
										noOptionsMessage={() => "Moeda não encontrada"}
										value={this.state.selectedOptionTo}
										onChange={this.handleChangeTo}
										styles={customStyles}
										/>
								</div>
							</div>
							<div className="conversor__line">
								{/* Resultado */}
								{this.state.value_to !== 0 ? 
									<div class="conversor__input conversor__input--result">
										<p>
											<span>{this.state.selectedOptionTo.symbol}</span>
											{this.state.value_to}
										</p>
									</div> : ''
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		}
	}
	