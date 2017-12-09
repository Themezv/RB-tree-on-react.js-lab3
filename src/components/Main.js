import React from 'react';
// import Node from './Node';

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scale: 1100,
        };
        this.resize = this.resize.bind(this);
    }

    resize(e) {
        e.preventDefault();
        const delta = e.deltaY;
        this.setState((oldState) => {
            return {
                scale: oldState.scale + delta,
            }
        })
    }

    render() {
        return(
            <svg width="100%" height="600" onWheel={this.resize} viewBox={`0 0 ${this.state.scale} ${this.state.scale}`}>
                {/*{this.props.tree.getArray().map((node, index) => {*/}
                    {/*return (*/}
                        {/*<Node {...node} index={index} key={index}/>*/}
                    {/*)*/}
                {/*})}*/}
            </svg>
        )
    }
}

Main.defaultProps = {
    tree: [],
};

export default Main;
