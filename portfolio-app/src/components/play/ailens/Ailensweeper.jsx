import React from 'react'
import p5 from 'p5';
import './css/styles.css';
import { sketch } from './aliensweeper';

export class Ailensweeper extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.myP5 = null;    
    }
    
    async componentDidMount() {
        this.myP5 = await new p5(sketch, this.myRef.current);
        document.getElementById("viewport").oncontextmenu = function () { return false; }
    }

    async componentWillUnmount() {
        this.myP5.remove()
    }

    render() {

        return (

            <div id="viewport">
                <div id="gamebar" ref={this.myRef}></div>
                <div id="ailensweeper" ref={this.myRef}></div>
            </div>
        );
    }
}
