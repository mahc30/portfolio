import React from 'react'
import p5 from 'p5';
import './css/styles.css';
import { sketch } from './sketch';

export class Djikstra extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    async componentDidMount() {
        this.myP5 = await new p5(sketch, this.myRef.current)
        document.getElementById("djikstra_viewport").oncontextmenu = function () { return false; }
    }

    render() {

        return (
            <div id="djikstra_viewport" ref={this.myRef} />
        );
    }
}
