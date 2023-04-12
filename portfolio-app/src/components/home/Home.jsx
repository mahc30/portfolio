import React from 'react'
import { ContactMe } from './ContactMe.jsx'
import { Djikstra } from '../play/djikstra/Djikstra.jsx'

import home_config from './home_config.json'
import { home_config_parser, map_cards } from '../../helpers/config_parser.js'
import TabMenu from '../molecules/TabMenu/TabMenu.jsx'


export class Home extends React.Component {

  render() {
    home_config_parser(home_config);
    map_cards(home_config);
    return (
      <div>
        <Djikstra />
        <TabMenu articles={home_config.articles} />
      </div>
    );


  }
}