import React from 'react'
import { Home } from './pages/home/Home.jsx'
import { Ailensweeper } from './play/ailens/Ailensweeper'
import { Tetris } from './play/sirteT/Sirtet'
import { Djikstra } from './play/djikstra/Djikstra'

let routes = {
    "portfolio": Home,
    "ailensweeper": Ailensweeper,
    "tetris": Tetris,
    "djikstra": Djikstra
}

export class MyRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: Home,
            currentKey: 0,
            play_pick: false
        };

        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleRedirect(component) {
        this.setState({
            currentPage: routes[component],
            currentKey: this.state.currentKey + 1
        })
    }

    render() {
        return(
           React.createElement(this.state.currentPage, {currentKey:this.state.currentKey, handleRedirect: this.handleRedirect})
        );
    }
}