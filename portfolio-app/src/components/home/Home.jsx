import React from 'react'
import { SectionWrapper }  from './SectionWrapper.jsx' 
import { Landing } from './Landing.jsx'
import { ContactMe } from './ContactMe.jsx'
import { Separador } from './Separador.jsx'
import home_config from './home_config';

export class Home extends React.Component {

    render() {
        return(
            <div>
                <Landing/>
                <Separador/>

                <>
                    {home_config.sections.map(section => {
                      return <div>
                        {React.createElement(SectionWrapper, {
                        key: section.title,
                        title:section.title, 
                        hasImg: section.hasImg,
                        img: section.img,
                        cards:section.cards,
                        handleRedirect: this.props.handleRedirect
                      })}
                        <Separador key={this.props.currentKey}/>
                      </div>

                    })}
                </>
                <ContactMe/>

            </div>     
        );


    }
}