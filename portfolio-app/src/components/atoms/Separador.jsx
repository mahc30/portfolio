import React from 'react'

export class Separador extends React.Component {

    render() {
        let backgroundImage = Math.floor(Math.random() * 3 + 1)
        return (<div className={`w-full h-24 max-h-24 bg-repeat-x opacity-50 bg-separador-${backgroundImage}`}/>);
    }
}
