import React from 'react'
import { SectionWrapper } from './SectionWrapper.jsx'
import { Landing } from './Landing.jsx'
import { ContactMe } from './ContactMe.jsx'
import { Separador } from './Separador.jsx'
import { ShowOff } from '../play/ShowOff.jsx'
import { Djikstra } from '../play/djikstra/Djikstra.jsx'
import Button from '../molecules/buttons/button.jsx'
import TabMenu from '../molecules/tabMenu.jsx'
import home_config from './home_config.json'
import { home_config_parser, map_cards } from '../../helpers/config_parser.js'


export class Home extends React.Component {

  render() {
    home_config_parser(home_config);
    map_cards(home_config);
    return (
      <TabMenu articles={home_config.articles} />
    );


  }
}