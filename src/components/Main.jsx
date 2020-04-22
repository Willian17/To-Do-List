import React, { Component } from 'react'
import axios from 'axios'
import './Main.css'

const baseUrl = 'http://localhost:3001'
const initialState = {
    assignment: { title: '' },
    list: []
}

export default class Main extends Component {
    state = { ...initialState }
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
        this.save = this.save.bind(this)
    }

    componentDidMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }


    update(event) {
        const assignment = this.state.assignment
        assignment.title = event.target.value
        this.setState({ assignment })
    }
    save() {
        const assignment = this.state.assignment
        const method = assignment.id ? 'put' : 'post'
        const url = assignment.id ? `${baseUrl}/${assignment.id}` : baseUrl

        axios[method](url, assignment)
            .then(resp => {
                const list = resp.data
                this.setState({ assignment: initialState.assignment, list })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    removedList(item){
      return this.state.list.filter(ite => ite.id !== item.id)
    }

    remove(assignment){
        axios.delete(`${baseUrl}/${assignment.id}`).then(resp => {
            const list = this.removedList(assignment)
            this.setState({list})
        })
    }

    load(assignment){
        this.setState({assignment})
    }
    

    renderList() {
        return (
            <ul className="list-group mt-3">
                {this.renderLi()}
            </ul>
        )
    }

    renderLi() {
        return this.state.list.map(assignment => {
            return (
                <li className="list-group-item">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                            id={assignment.id} onClick={()=> this.remove(assignment)}  />
                        <label htmlFor={assignment.id} className="custom-control-label">
                            {assignment.title}
                        </label>

                        <div className="d-inline float-right ">
                            <button className="btn btn-warning btn-sm" 
                            onClick={() => this.load(assignment)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div>

                    </div>
                </li>
            )
        })
    }

    app(){
        return(
        <div className="container">
        <form className="form">
            <div className="input-group mt-3">
                <div className="input-group-prepend">
                    <button className="btn btn-primary" onClick={this.save}
                        type="submit">
                        <i className="fa fa-plus-square"></i>
                    </button>
                </div>

                <input className="form-control" type="text"
                    aria-describedby="basic-addon1" onChange={this.update}
                    placeholder="Adcionar uma tarefa..." value={this.state.assignment.title} />
            </div>
        </form>
        {this.renderList()}
    </div>
        )
    }



    render() {
        return (
         this.app()
        )
    }
}