import React from 'react'
import play_config from './play_config.json';

const img_route = "./images/"

export class ShowOff extends React.Component {

    render() {

        return (
            <section key={this.props.keys}>
                <div className="mx-auto w-11/12">
                    <h1 className="font-bold underline text-2xl"> You can actually play some of my projects in the browser </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 w-3/4 mx-auto">
                <>
                    {play_config.games.map(game => {
                        return (
                            <div key={game.title} className="mx-auto w-full shadow-lg my-4 rounded-sm bg-custom-600 border-4 border-gray-700">
                                <div className="mt-2 text-center border-b-2 border-black py-3">
                                    <h2 className="font-bold text-lg">{game.title}</h2>
                                </div>
                                <div onClick={() => this.props.handleRedirect(game.link)}>
                                    <img className="max-h-48 md:max-h-64 2xl:max-h-56 w-full mx-auto" src={img_route + game.img} alt={game.title} />
                                </div>

                                <div className="text my-8 align-middle px-2 text-center">
                                    <p>
                                        {game.description}
                                    </p>
                                </div>

                            </div>
                        );
                    })}
                </>
                    </div>
                </div>
            </section>
        );
    }
}
