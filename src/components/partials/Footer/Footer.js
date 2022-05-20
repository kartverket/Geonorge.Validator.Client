// eslint-disable-next-line
import { GeonorgeFooter } from "@kartverket/geonorge-web-components/GeonorgeFooter";

function Footer() {
    return (
        <geonorge-footer
            environment={process.env.REACT_APP_ENVIRONMENT}
            version={process.env.REACT_APP_BUILD_NUMBER}
        />
    );
}


export default Footer;
