import React from 'react'
import { Home } from './home/Home.jsx'
import { ShowOff } from './play/ShowOff.jsx';

let routes = {
    "portfolio": Home,
    "showoff": ShowOff
}

export class MyRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: Home,
            currentKey: 0
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