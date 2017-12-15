import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Panel from './components/Panel';
import Main from './components/Main';
import Tree from './components/tree';


class App extends Component {

    constructor(props){
        const tree = new Tree({empty: true});
        super(props);
        this.state = {
            tree: [],
            mainTree: tree,
        };
        this.addNode = this.addNode.bind(this);
    }

    addNode(data){
        this.setState((oldState) => {
            const {tree, mainTree} = this.state.mainTree.insert(data);
            return {
                ...oldState,
                tree,
                mainTree
            }
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="8"><Main tree={this.state.tree} /></Col>
                    <Col xs="4"><Panel addNode={this.addNode}/></Col>
                </Row>
            </Container>
        );
    }
}

export default App;
