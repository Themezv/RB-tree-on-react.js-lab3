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
            <g>
                <rect
                    width={this.calcWidth(index)}
                    height={this.calcHeight(index)}
                    fill={this.props.color}
                    x={this.calcX(index)}
                    y={this.calcY(index)}
                    stroke={this.props.stroke}
                />
                <text
                    fill="#fff"
                    x={this.calcX(index) + 0.15 * this.calcWidth(index)}
                    y={this.calcY(index) + this.calcHeight(index) - 0.2 * this.calcHeight(index)}
                    style={{fontSize: String(this.calcWidth) + 'px'}}
                >{this.props.skey}</text>
            </g>
        )
    }
}

Node.defaultProps = {
    width: 100,
    height: 100,
};

export default Node;
