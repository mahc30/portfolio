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
                    <form value={this.state.mail_form} id="mail_form" className="mx-auto my-4 rounded-sm h-full sm:w-3/4 md:w-1/2 2xl:w-2/5 px-6 py-4 border-4 border-gray-500">
                        <h5 className="font-bold text-2xl my-8 underline"> Send Email </h5>

                        <div className="w-11/12">
                            <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text pointer-events-none" htmlFor="name">Your Name</label>
                            <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-4 pb-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="name" value={this.state.name} id="name" type="text" onChange={this.handleChange} required />
                        </div>
                        <div className="w-11/12">
                            <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text pointer-events-none" htmlFor="email">Your E-Mail</label>
                            <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-4 pb-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="email" value={this.state.email} id="email" type="email" onChange={this.handleChange} required />
                        </div>
                        <div className="w-11/12">
                            <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text pointer-events-none" htmlFor="subject">Subject</label>
                            <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-4 pb-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="subject" value={this.state.subject} id="subject" type="text" onChange={this.handleChange} />
                        </div>
                        <div className="w-11/12">
                            <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text pointer-events-none" htmlFor="message">Message</label>
                            <input className="input h-36 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-4 pb-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="message" value={this.state.message} id="message" type="text" onChange={this.handleChange} />
                        </div>

                        <div className="w-11/12 flex justify-end 2xl:justify-start xl:justify-start">
                            <button type="button" className="my-4 bg-custom-900 border-2 border-custom-100 hover:bg-blue-dark text-gray-900 font-bold py-3 xl:px-6 2xl:px-6 rounded w-1/2 md:w-1/4 h-3/5" onClick={this.handleSubmit}><a id="send_email_btn" href={`mailto:dahinkpie@gmail.com?subject=${this.state.subject}&body=¡Hi! i'm ${this.state.name} from=${this.state.email}. ${this.state.message}`}>Send Email</a></button>
                        </div>
                    </form>
                </div>
            </div>
        );


    }
}