import React from 'react'
import './index.css'
import { stringToS3Url } from '../../../helpers/stringHelpers';

export class Socials extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="socials-component">
                <div className="my-auto mx-2">
                    <a target="blank" href="https://www.linkedin.com/in/miguel-hincapie-b970ab17a/">
                        <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME, "linkedin_icon.png")} alt="LinkedIn" />
                    </a>
                </div>

                <div className="my-auto">
                    <a target="blank" href="https://github.com/mahc30">
                        <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME, "github_icon.png")} alt="GitHub" />
                    </a>
                </div>

                <div className="my-auto mx-2">
                    <a target="blank" href="https://twitter.com/MiguelHinkpie">
                        <img className="h-14 sm:h-16 max-h-full md:max-h-screen" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME,"twitter_icon.png")} alt="Twitter" />
                    </a>
                </div>
            </div>
        );
    }
}