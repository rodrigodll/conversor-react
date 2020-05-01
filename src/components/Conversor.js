import React, { Component } from 'react'
import Select from 'react-select'
import coinList from './listOption'

import './Conversor.css';

const optionsSwitchFrom = coinList.coinList

const optionsSwitchTo = [
	{ value: 'USD', label: 'USD - Dólar' , symbol: '$'},
	{ value: 'BRL', label: 'BRL - Real Brasileiro' , symbol: 'R$'},
	{ value: 'EUR', label: 'EUR - Euro', symbol: '€' }
]

export default class Conversor extends Component {
	constructor(props) {
		super(props)
		
		// Define valores iniciais
		this.state = {
			value_from: '',
			value_to: 0,
			selectedOptionFrom: 'ddd',
			selectedOptionTo: '',
			currentQuote: 0,
		}
		
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
		let de_para = `${this.props.moedaA}_${this.props.moedaB}`
		
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
		const { selectedOption } = this.state;

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
				// textAlign: 'left',
			}),
		  
			control: (provided, state) => ({
				...provided,
				// border: '1px solid red',
				padding: 0,
				border: 0,
				background: 'none',
				// fontWeight: '700'
			}),

			dropdownIndicator: () => ({
				fill: 'blue',
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
				fontWeight: '700'
			}),

			placeholder: () => ({
				fontWeight: '400'
			}),
		  
			singleValue: (provided, state) => {
				const opacity = state.isDisabled ? 0.5 : 1;
				const transition = 'opacity 300ms';
		  
				return { ...provided, opacity, transition };
				return {...provided, color: state.isFocused ? 'blue' : 'red' }
			}
		  }
		return (
			<div className="Conversor">
				<div class="container">
					<div className="row">
						<div class="conversor__box col-sm">
							<div className="conversor__line">
								<div className={`currency-flag currency-flag-lg currency-flag-${this.state.selectedOptionFrom.value ? this.state.selectedOptionFrom.value : 'USD'}`}></div>
								
								{/* Seletor de moeada */}
								<Select
									className="input--text"
									options={optionsSwitchFrom}
									noOptionsMessage={() => "Moeda não encontrada"}
									isSearchable
									value={this.state.selectedOptionFrom}
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

								{/* Botão de submit */}
								<button className="conversor__trigger" onClick={this.converter}>Converter</button>
							</div>

							<div className="conversor__line">
								<p>{this.state.selectedOptionFrom.symbol} {this.state.currentQuote}</p>
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
								{/* Resultado */}
								<p>{this.state.value_to !== 0 ? this.state.selectedOptionTo.symbol +' '+ this.state.value_to : ''}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		}
	}
	