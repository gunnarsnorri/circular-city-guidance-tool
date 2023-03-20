import Navigator from "./Navigator";
import Calculator from "./Calculator";
import { NavigatorProps } from "../interfaces/ComponentProps";

const ActiveApp = ({ activeContainerId, navigatorProps }: { activeContainerId: String, navigatorProps: NavigatorProps }) => {
    const navigator = Navigator(navigatorProps);
    const calculator = Calculator();
    let activeContainer: JSX.Element = navigator;
    switch (activeContainerId) {
        case "2.1":
            if (activeContainer !== calculator)
                activeContainer = calculator
            break;
        default:
            if (activeContainer !== navigator)
                activeContainer = navigator
            break;
    }
    return (
        <div>
            {activeContainer}
        </div>
    )
}

export default ActiveApp;
