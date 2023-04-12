import React, { Component } from 'react';

class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            isChild: this.props.isChild,
            rendered: new Map()
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(e) {
        e.preventDefault();
        this.props.clickedProjectLink(Number(e.target.id));
    }

    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.setState({
                cards: this.props.cards
            });
        }
    }

    render() {
        
        return (
            <ul className={this.state.isChild ? "" : "tree-view"}>
                {
                    Array.from(this.state.cards).map(([i, obj]) => {

                        return obj.cards && !this.state.rendered.has(obj.id) ?
                            <li id={`item-${obj.title}`}>
                                <details open>
                                    <summary>{obj.title}</summary>
                                    <TreeView id={`treeview-${obj.id}`}
                                        cards={obj.cards}
                                        isChild={true}
                                        clickedProjectLink={this.props.clickedProjectLink} />
                                </details>
                            </li>
                            : 
                            <li id={`item-${obj.title}`}>
                                <a id={obj.id} onClick={this.handleClick}>{obj.title}</a>
                            </li>
                    })
                }
            </ul>
        );
    }
}

export default TreeView;