// Dependencies
import { useEffect } from "react";

// Components
import { MainNavigation } from "@kartverket/geonorge-web-components/MainNavigation";

function MainNavigationContainer() {
    useEffect(() => {
        MainNavigation.setup("main-navigation", {});
    }, []);
    return <main-navigation environment={process.env.REACT_APP_ENVIRONMENT}></main-navigation>;
}

export default MainNavigationContainer;
