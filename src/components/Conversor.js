import React, { Component } from 'react'
import Select from 'react-select'
import CurrencyFormat from 'react-currency-format';

// svg
import arrow from '../svg/arrow.svg'
import orientation from '../svg/orientation.svg'
import fullscreen from '../svg/fullscreen.svg'

// css
import './Conversor.css';

// json de lista
import coinList from './listOption'
const optionsSwitchFrom = coinList.coinList
const optionsSwitchTo = coinList.coinList

export default class Conversor extends Component {
	constructor(props) {
		super(props)
		
		// Define valores iniciais
		this.state = {
			value_from: '',
			value_to: 0,
			selectedCurrencies: '-',
			selectedOptionFrom: optionsSwitchFrom[0].options[0],
			selectedOptionTo: optionsSwitchFrom[0].options[3],
			currentQuote: 0,
			isToggleOn: false
		}
		
		this.converter = this.converter.bind(this)
		this.handleChangeFrom = this.handleChangeFrom.bind(this)
		this.handleChangeTo = this.handleChangeTo.bind(this)
		this.inverter = this.inverter.bind(this)
		this.queryValidator = this.queryValidator.bind(this)
		this.fullscreen = this.fullscreen.bind(this);
	}
	
	handleChangeFrom = selectedOptionFrom => {
		this.setState({ selectedOptionFrom },() => console.log(`valueFrom:`, this.state.selectedOptionFrom));
	};
	handleChangeTo = selectedOptionTo => {
		this.setState({ selectedOptionTo },() => console.log(`valueTo:`, this.state.selectedOptionTo));
	};	
	
	converter() {
		// busca moedas a serem convertidas   
		let de_para = `${this.state.selectedOptionFrom.value}_${this.state.selectedOptionTo.value}`
		
		this.setState({selectedCurrencies: de_para})
		
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

	queryValidator() {
		
		// valida a chamada da API
		let valueFrom = this.state.value_from >= 1
		let selectedCurrenciesEmpty = this.state.selectedCurrencies !== ''
		let selectedCurrenciesEqual = this.state.selectedCurrencies !== this.state.selectedOptionFrom.value+'_'+this.state.selectedOptionTo.value
		let equalCoins = this.state.selectedOptionFrom.value !== this.state.selectedOptionTo.value
		
		// Executa consulta da API mediante as seguintes condições
		// 1- Valor de inicial de consulta Maior ou igual a UM
		// 2- Valor de "selectedCurrencies" não for vazio
		// 3- Valor de "selectedCurrencies" diferente da consulta anterior
		// 4- Moeda A diferente de Moeda B
		if(valueFrom && selectedCurrenciesEmpty && selectedCurrenciesEqual && equalCoins) {
			this.converter()
		}
	}

	fullscreen() {
		this.setState(prevState => ({
		  isToggleOn: !prevState.isToggleOn
		}));

		console.log('isToggleOn', this.state.isToggleOn)
	}

	inverter() {
		// inverte valores de select
		this.setState({
			selectedOptionTo: this.state.selectedOptionFrom,
			selectedOptionFrom: this.state.selectedOptionTo,
			currentQuote: 0,
			value_to: 0
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
				boxShadow: 'none',
				cursor: 'pointer',
				paddingLeft: 40
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
			<div className={this.state.isToggleOn ? 'Conversor is-full' : 'Conversor'}>
				<div className="container">
					<div className="row">
						<div className="conversor__box conversor__box--from col-sm">
							<button className="conversor__trigger conversor__trigger--fullscreen" onClick={this.fullscreen}>
								Fullscreen 
								<span className="conversor__trigger--icon step-1">
									<img src={fullscreen} alt="fullscreen" />
								</span>
								<span className="conversor__trigger--icon step-2">
									<img src={fullscreen} alt="fullscreen" />
								</span>
							</button>
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
									{/* <input type="tel" onChange={(event) => {this.setState({value_from:event.target.value})}}/> */}
									<CurrencyFormat 
										thousandSeparator={true}
										mask="_"
										decimalSeparator="."
										allowNegative={false}
										fixedDecimalScale={true}
										// prefix={this.state.selectedOptionFrom.symbol}
										type="tel"
										decimalScale={2}
										placeholder={'0,00'}
										// onChange={(event) => {this.setState({value_from:event.target.value})}}
										onValueChange={(values) => {
											const {formattedValue, value} = values;
											// formattedValue = $2,223
											// value ie, 2223
											this.setState({value_from: formattedValue})
										}}
									/>
								</div>
							</div>

							<div className="conversor__line">
								{this.state.currentQuote === 0 ? '': 
									<div className="conversor__rate">
										<span>Taxa de câmbio</span>
										<em>
											{this.state.selectedOptionFrom.symbol + this.state.currentQuote}
										</em>
									</div>
								}
							</div>
							{/* Botão de submit */}
							<button className="conversor__trigger" onClick={this.queryValidator}>
								Converter 
								<span className="conversor__trigger--icon step-1">
									<img src={arrow} alt="logo" />
								</span>
								<span className="conversor__trigger--icon step-2">
									<img src={arrow} alt="logo" />
								</span>
							</button>
						</div>
						
						<div className="conversor__box conversor__box--to col-sm">
							<div className="conversor__line">
								{/* Botão para inverter moedas */}
								<button className="conversor__trigger conversor__trigger--inverter" onClick={this.inverter}>
									Inverter moeda 
									<span className="conversor__trigger--icon step-1">
										<img src={orientation} alt="logo" />
									</span>
									<span className="conversor__trigger--icon step-2">
										<img src={orientation} alt="logo" />
									</span>
								</button>
								<div className="">
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
									<div className="conversor__input conversor__input--result">
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
	