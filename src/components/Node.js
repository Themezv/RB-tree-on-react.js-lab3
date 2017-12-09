import React from 'react';

class Node extends React.Component {

    calcX(index){
        return 600/this.getCountInLevel(this.getLevel(index)) +
            2*(600/this.getCountInLevel(this.getLevel(index)))*this.getNumInRow(index);
    }

    calcY(index){
        return 130*Math.floor(Math.log2(index+1));
    }

    calcWidth(index){
        return 100/Math.pow(1.2, this.getLevel(index));
    }

    calcHeight(index){
        return 100/Math.pow(1.2, this.getLevel(index));
    }

    getLevel(index) {
      return Math.floor(Math.log2(index + 1));
    }

    getCountInLevel(level) {
      return Math.pow(2, level);
    }

    renderTree(){

    }

    getNumInRow(index) {
      let i = 1;
      let index2 = index;
      while (i < this.getCountInLevel(this.getLevel(index))) {
        index2 -= i;
        i *= 2;
      }
      return index2;
    }

    render() {
        const {index} = this.props;
        return(
            <rect
                width={this.calcWidth(index)}
                height={this.calcHeight(index)}
                fill={this.props.color}
                x={this.calcX(index)}
                y={this.calcY(index)}
                stroke={this.props.stroke}
            />
        )
    }
}

Node.defaultProps = {
    width: 100,
    height: 100,
    color: '#000',
    stroke: 2,
    x: 0,
    y: 0,
};

export default Node;
