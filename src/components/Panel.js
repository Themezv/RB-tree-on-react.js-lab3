import React from 'react';
import {Input, InputGroup, InputGroupButton} from 'reactstrap';

export default class Panel extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            input: '',
            value: '',
        };
        this.addNode = this.addNode.bind(this)
    }

    addNode(){
        this.props.addNode({skey: +this.state.input, value: this.state.value})
    }

    render() {
        return (
            <div>
                <h1>
                    <span style={{color: '#f00', fontWeight: 'bold'}}>R</span>
                    <span style={{color: '#000', fontWeight: 'bold'}}>B</span> дерево поиска
                </h1>
                <InputGroup>
                    <Input onChange={(e) => {this.setState({value: e.target.value})}} value={this.state.value} placeholder="Значение"/>
                </InputGroup>
                <InputGroup>
                    <Input onChange={(e) => {this.setState({input: e.target.value})}} value={this.state.input} placeholder="Ключ"/>
                    <InputGroupButton color="success" onClick={this.addNode}>Добавить</InputGroupButton>
                    <InputGroupButton color="info" onClick={this.addNode}>Получить</InputGroupButton>
                    <InputGroupButton color="danger" onClick={this.addNode}>Удалить</InputGroupButton>
                </InputGroup>
            </div>
        )
    }
}
