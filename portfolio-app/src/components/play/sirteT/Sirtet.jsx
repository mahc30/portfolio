import React from 'react'
import p5 from 'p5';
import './css/styles.css';
import { sketch } from './tetris';

export class Tetris extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }

    async componentDidMount() {
        this.myP5 = await new p5(sketch, this.myRef.current)
        document.getElementById("tetris_viewport").oncontextmenu = function () { return false; }
    }

    render() {

        return (
            <div className="w-screen h-screen bg-custom-tetris">
                <div className="w-full h-full grid grid-cols-1 grid-rows:2 md:grid-rows-1 md:grid-cols-3">


                    <div className="w-full h-full md:col-span-2 flex justify-center">
                        <div className="md:m-auto">
                            <div id="tetris_viewport" ref={this.myRef} />
                        </div>
                    </div>

                    <div id="instructions" className="overflow-y-scroll">

                        <h1 className="color-custom-tetris-light text-xl font-extrabold underline ml-2 mt-3"> Mobile Controls </h1>
                        <ol className="color-custom-tetris-dark text-lg list-disc ml-6 mt-3">
                            <li> Tap - Rotate 90° Right</li>
                            <li> Swpe Down - Rotate 90° Left </li>
                            <li> Swipe Left and Right - Move Horizontally</li>
                            <li> Swipe Up - Swap piece</li>
                        </ol>

                        <h1 className="color-custom-tetris-light text-xl font-extrabold underline ml-2 mt-3"> Keyboard Controls </h1>
                        <ol className="color-custom-tetris-dark text-lg list-disc ml-6 mt-3">
                            <li> E - Rotate 90° Right</li>
                            <li> Q - Rotate 90° Left </li>
                            <li> Left and Right Arrows - Move Horizontally</li>
                            <li> Down Arrow - Fast Drop </li>
                            <li> Shift - Swap piece</li>
                        </ol>

                        {
                            <div id="TemporalNav" className="w-full bg-custom-tetris-dark my-3">
                                <h1 className="color-custom-tetris-dark text-lg font-extrabold ml-2 underline hover:cursor-pointer" onClick={() => this.props.handleRedirect("portfolio")}> Take me Back to Home </h1>
                            </div>
                        }

                    </div>
                </div>
            </div>

        );
    }
}
