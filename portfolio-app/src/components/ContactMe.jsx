import React from 'react'

export class ContactMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message:""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e){
        let send_btn = document.getElementById("send_email_btn");
        send_btn.click();
    }


    render() {
        return(
            <section value={this.state.contact} id="contact">
        <div className="mx-auto w-11/12">

            <form value={this.state.mail_form} id="mail_form" className="mx-auto my-4 rounded-sm h-full sm:w-3/4 md:w-1/2 2xl:w-2/5 px-6 py-4">
                <h1 className="font-bold text-2xl my-8 underline"> Contact Me </h1>

                <div className="w-3/4">
                    <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text" htmlFor="name">Your Name</label>
                    <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="name" value={this.state.name} id="name" type="text" onChange={this.handleChange} required/>
                </div>
                <div className="w-3/4">
                    <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text" htmlFor="email">Your E-Mail</label>
                    <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="email" value={this.state.email} id="email" type="email" onChange={this.handleChange} required/>
                </div>
                <div className="w-3/4">
                    <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text" htmlFor="subject">Subject</label>
                    <input className="input h-4 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="subject" value={this.state.subject} id="subject" type="text" onChange={this.handleChange} />
                </div>
                <div>
                    <label className="label mb-0 pt-4 pl-3 leading-tighter text-gray-900 text-base mt-2 cursor-text" htmlFor="message">Message</label>
                    <input className="input h-36 border border-gray-400 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" name="message" value={this.state.message} id="message" type="text" onChange={this.handleChange}/>
                </div>

                <button type="button" className="my-4 bg-custom-900 border-2 border-custom-100 hover:bg-blue-dark text-gray-900 font-bold py-3 px-6 rounded w-1/2 md:w-1/4 h-3/5" onClick={this.handleSubmit}><a id="send_email_btn" href={`mailto:dahinkpie@gmail.com?subject=${this.state.subject}&body=¡Hi! i'm ${this.state.name} from=${this.state.email} and ${this.state.message}`}>Send Email</a></button>
            </form>
        </div>
    </section>
        );


    }
}