import React, { Component } from 'react';
import './index.css'
import TreeView from '../TreeView/TreeView';
import { treemap } from '../../../helpers/config_parser';

const img_route = "/";

class Article extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: this.props.tab.title,
            hasImg: this.props.tab.hasImg,
            img: this.props.tab.img,
            cards: this.props.tab.cards,
            currentCard: this.props.tab.cards.get(this.props.tab.cards.keys().next().value)
        };
        this.childClickedProjectLink = this.childClickedProjectLink.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.tab.cards !== prevProps.tab.cards) {
            this.setState({
                cards: this.props.tab.cards,
                currentCard: this.props.tab.cards.get(this.props.tab.cards.keys().next().value)
            });
        }
    }

    childClickedProjectLink(cardIndex) {
        this.setState({ currentCard: this.props.tab.cards.get(cardIndex) })
    }

    render() {
        return (
            <article role="tabpanel">
                <section id={`section-${this.props.tab.title})`} className="sidebar-layout">
                    <div className="sidebar">
                        <TreeView
                            clickedProjectLink={this.childClickedProjectLink}
                            cards={treemap(this.props.tab)}
                        />
                    </div>
                    <div className="content">
                    
                        <h3>{this.state.currentCard.title}</h3>

                        {this.state.currentCard.link ?
                            <a target="blank" href={this.state.currentCard.link}>
                                <img className="max-h-48 md:max-h-64 2xl:max-h-56 w-full mx-auto" src={img_route + this.state.currentCard.img} alt={this.state.currentCard.title} />
                            </a>
                            : //Custom routing
                            <a onClick={() => this.props.handleRedirect("showoff")}>
                                <img className="max-h-48 md:max-h-64 2xl:max-h-56 w-full mx-auto" src={img_route + this.state.currentCard.img} alt={this.state.currentCard.title} />
                            </a>
                        }

                        <p>
                            {this.state.currentCard.description}
                        </p>
                        <p>
                            <a onClick={this.handleClick} href={this.state.currentCard.link} target="_blank">Click here to learn more</a>.
                        </p>
                    </div>
                </section>
            </article>
        );
    }
}

export default Article;

