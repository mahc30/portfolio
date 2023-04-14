import React from 'react'
import './index.css'

export class ContactMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        let send_btn = document.getElementById("send_email_btn");
        send_btn.click();
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
                            <button type="button" onClick={this.handleSubmit}><a id="send_email_btn" href={`mailto:dahinkpie@gmail.com?subject=${this.state.subject}&body=¡Hi! i'm ${this.state.name} from=${this.state.email}. ${this.state.message}`}>Send Email</a></button>
                        </div>
                    </form>
                </div>
            </div>
        );


    }
}