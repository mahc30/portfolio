import React from 'react'
import p5 from 'p5';
import './css/styles.css';
import {sketch} from './aliensweeper';
import alienImg from './assets/ailen8.png';
import flagImg from './assets/ailen_flag.png';
import restartImg1 from './assets/death2.png'
import restartImg2 from './assets/alive1.png'
import { Separador } from '../../atoms/Separador';

export class Ailensweeper extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
    }
   
    async componentDidMount() {
       this.myP5 = await new p5(sketch, this.myRef.current)
       document.getElementById("viewport").oncontextmenu = function() { return false; }
    }
    
    render() {

        return(
           

<div className="bg-custom-ailensweeper w-screen h-screen">
<div className="w-full h-full grid grid-cols-1 grid-rows-5 md:grid-cols-5 md:grid-rows-1 ">
    <div className="h-full row-span-3 md:col-span-4">
    <div id="viewport">
                <div id="gamebar" ref={this.myRef}></div>
                <div id="ailensweeper" ref={this.myRef}></div>
            </div>
    </div>

    <div id="instructions" className="row-span-4 overflow-y-scroll xl:overflow-hidden">

        <div className="w-full bg-custom-ailensweeper hidden md:block md:mt-16 xl:mt-20">
             <Separador/>
        </div>

        <h1 className="color-custom-ailensweeper-shine text-xl font-extrabold underline ml-2"> How To Play </h1>
        <ol className="color-custom-ailensweeper-dark text-lg list-disc ml-6 mt-3">
            <li> The number in each square represents the amount of ailens adjacent to it.</li>
            <li> Click or Tap on a square to reveal it ¡and try not to reveal the ailens! </li>
            <li> The big number on top-left corner is the number of ailens left, it will go down when you <strong>flag</strong> an ailen.</li>
            <li> Use the <img className="w-7 inline" src={alienImg} alt="ailen Icon"/> and <img className="w-7 inline" src={flagImg} alt="Flag Icon"/> buttons to switch between <strong>flag</strong> mode and <strong>ailen</strong> revealing mode </li>
            <li> Click or Tap the <img className="w-7 inline" src={restartImg2} alt="Explosion Icon"/> or <img className="w-7 inline" src={restartImg1} alt="Rocket Icon"/> buttons to restart the game     </li>
        </ol>

        <div className="w-full bg-custom-ailensweeper">
             <Separador/>
        </div>

        {
        <div id="TemporalNav" className="w-full bg-custom-ailensweeper">
            <h1 className="color-custom-ailensweeper-shine text-lg font-extrabold ml-2 underline hover:cursor-pointer" onClick={ () => this.props.handleRedirect("portfolio")}> Take me Back to Home </h1>
        </div>
        }

        <div className="w-full bg-custom-ailensweeper">
             <Separador/>
        </div>
    </div>
</div>
</div>
        );
    }
}
