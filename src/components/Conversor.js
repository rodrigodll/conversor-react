import React, { Component } from 'react';

import './Conversor.css';

export default class Conversor extends Component {
    constructor(props) {
        super(props)

        // Define valores iniciais
        this.state = {
            moedaA_valor: '',
            moedaB_valor: 0
        }

        this.converter = this.converter.bind(this)
    }

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
            let cotacao = json[de_para].val

            // Cálculo de conversão
            // valor-inserido * valor-cotação-atual
            let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)

            // Define resultado da conversão
            this.setState({moedaB_valor})
        })
    }
    
    render() {
        return (
            <div className="Conversor">
                {/* titulo */}
                <h1>USD para BRL</h1>

                {/* input de Valor */}
                <input type="tel" onChange={(event) => {this.setState({moedaA_valor:event.target.value})}}></input>
                
                {/* Botão de submit */}
                <input type="button" value="Converter" onClick={this.converter}></input>
                
                {/* Resultado */}
                <p>{this.state.moedaB_valor !== 0 ? 'Resultado: ' + this.state.moedaB_valor : ''}</p>
            </div>
            )
        }
    }
    