import { BrowserRouter as Router } from "react-router-dom";
import { AllRoutes } from './AllRoutes'
const AppRoute = () => {
    return (
        <Router>
            <AllRoutes />
        </Router>
    )
}

export default AppRoute;