import React from 'react'

export class Landing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return(
            <section key="intro" id="intro">
                <div className="grid-template-rows-2 max-h-screen h-screen w-11/12 mx-auto">
                    <div className="grid grid-template-cols-6 h-2/4">
                        <div className="col-start-1 col-end-5 sm:col-end-4 flex">
                            <img className="h-4/6 max-h-48 2xl:max-h-56 md:max-h-48 mt-auto ml-auto" src="./images/picretocada.png" alt="https://pbs.twimg.com/profile_images/1339174370661584902/9MJH6FNt_400x400.jpg"/>
                        </div>

                        <div className="col-start-5 sm:col-start-4 col-end-6 align-text-bottom flex">
                            <h6 className="mt-auto ml-6 mb-4">
                                <strong> ¡Hello! I'm Miguel,</strong> an autodidact Software Developer who loves learning programming<strong>,</strong> languages.</h6>
                        </div>
                    </div>

                    <div className="flex justify-around max-h-20 md:max-h-24 h-1/6 sm:h-1/5 shadow-custom-1 xl:w-5/6 mx-auto bg-custom-600 px-28 sm:px-32 md:px-48 lg:px-64 xl:px-80 2xl:px-96">
                        <div className="my-auto">
                            <a target="blank" href="https://www.linkedin.com/in/miguel-hincapie-b970ab17a/">
                                <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src="./images/linkedin_icon.png" alt="LinkedIn"/>
                            </a>
                        </div>

                        <div className="my-auto">
                            <a target="blank" href="https://github.com/mahc30">
                                <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src="./images/github_icon.png" alt="GitHub"/>
                            </a>
                        </div>

                        <div className="my-auto">
                            <a target="blank" href="https://twitter.com/MiguelHinkpie">
                                <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src="./images/twitter_icon.png" alt="Twitter"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
