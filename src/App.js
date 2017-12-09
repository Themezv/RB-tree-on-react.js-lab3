import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Panel from './components/Panel';
import Main from './components/Main';
import Tree from './components/tree';

const tree = new Tree({empty: true});

class App extends Component {

    constructor(props){
        super(props);
        this.addNode = this.addNode.bind(this);
    }

    addNode(data){
        // this.setState((oldState) => {
        //     const oldTree = oldState.tree;
        //     oldTree.push(data);
        //     return {
        //         ...oldState,
        //         tree: oldTree,
        //     }
        // })
        tree.insert(data);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="8"><Main tree={tree} /></Col>
                    <Col xs="4"><Panel addNode={this.addNode}/></Col>
                </Row>
            </Container>
        );
    }
}

export default App;
