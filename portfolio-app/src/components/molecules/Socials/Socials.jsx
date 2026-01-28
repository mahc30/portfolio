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

                <a target="blank" href="https://www.linkedin.com/in/miguel-hincapie-b970ab17a/">
                    <img className="socials-img" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME, "linkedin_icon.png")} alt="LinkedIn" />
                </a>

                <a target="blank" href="https://github.com/mahc30">
                    <img className="socials-img" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME, "github_icon.png")} alt="GitHub" />
                </a>

                <a target="blank" href="https://twitter.com/MiguelHinkpie">
                    <img className="socials-img" src={stringToS3Url(process.env.REACT_APP_S3_BUCKET_NAME, "twitter_icon.png")} alt="Twitter" />
                </a>

            </div>
        );
    }
}