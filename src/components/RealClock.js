import React from 'react';
import Moment from 'moment-timezone';

var tz = "Etc/GMT-0";
var tzArray = [ '-0', '-1', '-2', '-3', 
                '-4', '-5', '-6', '-7',
                '-8', '-9', '-10', '-11',
                '-12', '+11', '+10', '+9',
                '+8', '+7', '+6', '+5',
                '+4', '+3', '+2', '+1'
              ];
var currIndex = 0;

class RealClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          time: new Moment().format('HH:mm:ss')
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    
    tick() {
        this.setState({
            time: new Moment().tz(tz).format('HH:mm:ss')
        });
        this.handleTime(this.state.time);
    }

    handleTime(date){
        if(date.substring(0,2) !== "17"){
            currIndex++;
            if(currIndex === tzArray.length){
                currIndex = 0;
            }
            tz = tz.substring(0, 7) + tzArray[currIndex];
        }
    }

    render() {
        return (
        <p className="App-clock">
            {this.state.time}
        </p>
        );
    }
}
export default RealClock;