import React from 'react'
import p5 from 'p5';
import './css/styles.css';
import { sketch } from './tetris';

export class Tetris extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.myP5 = null;
    }

    async componentDidMount() {
        this.myP5 = await new p5(sketch, this.myRef.current)
        document.getElementById("tetris_viewport").oncontextmenu = function () { return false; }
    }

    async componentWillUnmount() {
        this.myP5.remove()
    }
    render() {

        return (
            <div id="tetris_component">
                <div id="tetris_viewport" ref={this.myRef} />
                <div id="instructions">
                    <h6> Mobile Controls </h6>
                    <ol>
                        <li> Tap - Rotate 90° Right</li>
                        <li> Swipe Down - Hard Drop </li>
                        <li> Swipe Left and Right - Move Horizontally</li>
                        <li> Swipe Up - Swap Tetromino</li>
                    </ol>

                    <h6> Keyboard Controls </h6>
                    <ol>
                        <li> E - Rotate 90° Right</li>
                        <li> Q - Rotate 90° Left </li>
                        <li> Left and Right Arrows - Move Horizontally</li>
                        <li> Down Arrow - Soft Drop </li>
                        <li> Space Bar - Hard Drop </li>
                        <li> Shift - Swap Tetromino</li>
                    </ol>
                </div>
            </div>
        );
    }
}
