import React from 'react'

const Input = ({ label, type, field, value, onChange }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            className="form-control"
            type={type || 'text'}
            onChange={(ev) => onChange(field, ev)}
            value={value} />
    </div>
)

export default class App extends React.Component {

    state = {
        aluguel: 850,
        parcela: 1850,
        mes: 180,
        inflacao: 6
    }

    onChange = (field, ev) => this.setState({ [field]: ev.target.value })

    renderFields(){
        return (
            <div>
                <div className="flex horizontal">
                        <div className="flex-1">
                            <Input
                                value={this.state.aluguel}
                                label={"Aluguel (R$)"}
                                onChange={this.onChange.bind(this)}
                                type={'number'}
                                field={'aluguel'}
                                />
                        </div>
                        <div className="flex-1">
                            <Input
                                value={this.state.parcela}
                                label={"Parcela mensal do Financiamento (R$)"}
                                onChange={this.onChange.bind(this)}
                                type={'number'}
                                field={'parcela'}
                                />
                        </div>
                    </div>
                    <div className="flex horizontal">
                        <div className="flex-1">
                            <Input
                                value={this.state.mes}
                                label={"Quantidade de meses do financiamento"}
                                onChange={this.onChange.bind(this)}
                                type={'number'}
                                field={'mes'}
                                />
                        </div>
                        <div className="flex-1">
                            <Input
                                value={this.state.inflacao}
                                label={"Reajuste Anual de Aluguel (%)"}
                                onChange={this.onChange.bind(this)}
                                type={'number'}
                                field={'inflacao'}
                                />
                        </div>
                    </div>
                    
            </div>
        )
    }

    renderResults(){
        const { aluguel, parcela, mes, inflacao } = this.state;
        
        let valorTotalAluguel = 0;
        let valorAluguelAtual = aluguel;
        for(var i = 1; i <= mes; i++){
            valorTotalAluguel += ( valorAluguelAtual ) 
            if( i % 12 === 0 ) valorAluguelAtual = valorAluguelAtual * ( 1 + ( inflacao/100 ) )
        }
        const valorTotalFinanciamento = parcela * mes;

        const diff = valorTotalFinanciamento - valorTotalAluguel

        return (
            <div className="flex vertical">
                <h4>Valor pago em Aluguel (todo o tempo): R$ {valorTotalAluguel.toFixed(2)} </h4>
                <h4>Valor pago em Financiamento (todo o tempo): R$ {valorTotalFinanciamento.toFixed(2)} </h4>
                <h4 className="text-center">
                    RESULTADO: { 
                            diff < 0 ? 
                            "Vale mais a pena financiar" 
                            : 
                            "Vale mais a pena alugar" 
                        }
                </h4>
            </div>
        )
    }

    render(){
        return (
            <div className="App flex flex-center">        
                <div className="Panel">        
                    <h1 className="text-center">Aluguel x Financeiro</h1>        
                    <hr />        
                    {this.renderFields()}
                    <br /><hr /><br />
                    {this.renderResults()}
                </div>        
            </div>
        )
    }
}