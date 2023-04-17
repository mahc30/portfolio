import React from 'react'
import './index.css'

export class ContactMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.canSend = this.canSend.bind(this);
    }

    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    canSend() {
        return this.state.name && this.validateEmail(this.state.email) && this.state.subject && this.state.message
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state)
    }

    handleSubmit(e) {
        this.setState({ is_loading: true });
        setTimeout(() => { this.setState({ is_loading: false }) }, 5000);
    }


    render() {
        return (
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">Contact Me</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body">
                    <form value={this.state.mail_form} id="mail_form">
                        <h4> Send Email </h4>

                        <div className="input-wrapper">
                            <label htmlFor="name">Your Name</label>
                            <input name="name" value={this.state.name} id="name" type="text" onChange={this.handleChange} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="email">Your E-Mail</label>
                            <input name="email" value={this.state.email} id="email" type="email" onChange={this.handleChange} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="subject">Subject</label>
                            <input name="subject" value={this.state.subject} id="subject" type="text" onChange={this.handleChange} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="message">Message</label>
                            <textArea name="message" value={this.state.message} id="message" type="text" onChange={this.handleChange} />
                        </div>

                        <div>
                            {this.state.is_loading ?
                                <progress></progress> :
                                <a id="send_email_btn" onClick={this.handleSubmit} href={`mailto:dahinkpie@gmail.com?subject=${this.state.subject}&body=¡Hi! i'm ${this.state.name} from=${this.state.email}. ${this.state.message}`}><button className={this.canSend() ? "" : "hidden"} type="button">Send Email</button></a>
                            }
                        </div>
                    </form>
                </div>
            </div>
        );


    }
}