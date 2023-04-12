import React, { Component } from 'react';
import Article from '../Article/Article';
import './index.css'

class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      articles: this.props.articles,
      currentSelectedTab: this.props.articles[0]
    };

    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(e) {
    e.preventDefault();
    this.setState({ currentSelectedTab: this.state.articles[e.target.id] })
  }

  render() {
    return (
      <article id="tabMenu" className="tabs">
        <menu role="tablist" aria-label="tabs ">
          {
            this.state.articles.map((article, index) => {
              return <button role="tab" id={index} onClick={this.handleClick}>{article.title}</button>
            })}
        </menu>

        <Article id={`article-${this.state.currentSelectedTab.title}`} tab={this.state.currentSelectedTab}></Article>

      </article>
    );
  }
}

export default TabMenu;