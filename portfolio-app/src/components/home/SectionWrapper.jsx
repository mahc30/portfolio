import React from 'react'

const img_route = "./images/"

export class SectionWrapper extends React.Component {

    render() {
        return(
            <section key={this.props.keys}>
                <div className="mx-auto w-11/12">
                    <h1 className="font-bold underline text-2xl"> {this.props.title} </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-3/4 mx-auto">

                        {this.props.hasImg && <div className="mx-auto my-4 rounded-sm">
                            <div className="shadow-lg lg:mt-12">
                                <img className="w-full mx-auto" src={img_route + this.props.img} alt={this.props.title}/>
                            </div>
                        </div>}
                            <>
                                {this.props.cards.map(card => (
                                    <div key={card.title} className="mx-auto shadow-lg my-4 rounded-sm bg-custom-600 border-4 border-gray-700">
                                         <div  className="mt-2 text-center border-b-2 border-black py-3">
                                             <h2 className="font-bold text-lg">{card.title}</h2>
                                         </div>
                                         <div>

                                        {card.link ?
                                        <a target="blank" href={card.link}>
                                            <img className="max-h-48 md:max-h-64 2xl:max-h-56 w-full mx-auto" src={img_route + card.img} alt={card.title}/>
                                        </a>
                                        : //Custom routing
                                        <a onClick={() => this.props.handleRedirect("showoff")}>
                                            <img className="max-h-48 md:max-h-64 2xl:max-h-56 w-full mx-auto" src={img_route + card.img} alt={card.title}/>
                                        </a>
                                        }
                                        
                                    </div>
                                    
                                    <div className="text my-8 align-middle px-2 text-center">
                                        {card.subtitle && <strong>{card.subtitle}</strong>}

                                        <p>
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                ))}
                            </>
                    </div>
                </div>
        </section>
        )
        
    }
}
