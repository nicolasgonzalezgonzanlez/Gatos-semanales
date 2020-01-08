import React,{Component} from 'react'
import '../css/App.css'
import Header from './Header'
import Formulario from './Formulario'
import Listado from './Listado'
import ControlPresupuesto from './ControlPresupuesto'
import {validarPresupuesto} from '../herlper'

class App extends Component {
	state = {
		gastos: {},
		presupuesto: '',
		restante: ''
	}
	componentDidMount () {
		this.obtenerPresupuesto()
	}
	obtenerPresupuesto = () => {
		let presupuesto = prompt('Cual es tu presupuesto')
		let resultado = validarPresupuesto(presupuesto)
		if (resultado) {
			this.setState({
				restante: presupuesto,
				presupuesto

			})
		} else {
			this.obtenerPresupuesto()
		}
	}
    agregarGasto = (gasto) => {
		// crea un arreglo (spread)
		const gastos = {...this.state.gastos}
		//agregar gasto al objeto del state(time stamp)
		gastos[`gasto${Date.now()}`] = gasto
		//mandar el gasto para ser restado del presupuesto
		this.restarPresupuesto(gasto.cantidadGasto)
		//manda la informacion al state
		this.setState({
			gastos
		})
	}
	//restar del presupuesto
	restarPresupuesto = (cantidad) => {
		//let restar = Number(cantidad)
		//tomar una copia del state
		//let restante = this.state.restante
		/*
		el cambio debe de hacerse en el setState ya que los props
		y el state hacen cambios asincronicos y no podes confiar en que
		muten el estado de forma correcta por eso se hace el cambio
		diractamente en el state y ademas te ahorras memoria
		*/
		this.setState({
			restante: this.state.restante - Number(cantidad)
		})
	}
    render () {
        return (
            <div className="App container">
                <Header 
                  titulo = 'Gastos semanal'
                />
                <div className="contenido-principal contenido">
                  <div className="row">
                    <div className="one-half column">
                      <Formulario 
                        agregarGasto={this.agregarGasto}
                      />
                    </div>
                    <div className="one-half column">
                    	<Listado 
					  		gastos = {this.state.gastos}
					  	/>
					  	<ControlPresupuesto 
							presupuesto = {this.state.presupuesto}
							restante = {this.state.restante}
					  	/>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

export default App
