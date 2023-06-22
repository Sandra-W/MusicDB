import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>The page you were searching for could not be found.</p>
            <Link to='/'>Back to the hompage</Link>
        </div>
    );
}
 
export default NotFound;