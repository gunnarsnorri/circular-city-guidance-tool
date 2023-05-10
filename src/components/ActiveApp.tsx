import Navigator from "./Navigator";
import Calculators from "./Calculators";
import { NavigatorProps } from "../interfaces/ComponentProps";

const ActiveApp = ({ activeContainerId, navigatorProps }: { activeContainerId: String, navigatorProps: NavigatorProps }) => {
    const navigator = Navigator(navigatorProps);
    const calculators = Calculators(navigatorProps.theme);
    let activeContainer: JSX.Element = navigator;
    switch (activeContainerId) {
        case "2":
            if (activeContainer !== calculators)
                activeContainer = calculators
            break;
        default:
            if (activeContainer !== navigator)
                activeContainer = navigator
            break;
    }
    return (
        <>
            {activeContainer}
        </>
    )
}

export default ActiveApp;
