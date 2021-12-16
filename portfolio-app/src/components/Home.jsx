import React from 'react'
import { SectionWraper }  from './SectionWraper.jsx' 
import { Landing } from './Landing.jsx'
import { ContactMe } from './ContactMe.jsx'

import home_config from './home_config';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            };  }

    render() {
        return(
            <div>
                <Landing></Landing>

                <>
                    {home_config.sections.map(section => {
                      return React.createElement(SectionWraper, {
                        key: section.title,
                        title:section.title, 
                        hasImg: section.hasImg,
                        img: section.img,
                        cards:section.cards
                      }); 
                    })}
                </>
                <ContactMe/>

            </div>     
        );


    }
}