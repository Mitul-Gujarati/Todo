import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorld";
import { useAuth } from "./Security/AuthContext";

//Welcome Component
function WelcomeComponent() {

    const { username } = useParams();
    const [message, setMessage] = useState(null);
    const authContext = useAuth()

    function callHelloWorldRestApi() {
        retrieveHelloWorldPathVariable(`${username}`, authContext.token)
            .then((response) => successResponse(response))
            .catch((error) => errorResponse(error))
            .finally(() => console.log("cleanUp"))
    }

    function successResponse(response) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
    }

    return (
        <>
            <h1>Welcome {username}</h1>
            <div className="Welcome">
                Manage Your Todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Say Hello!</button>
            </div>
            <div>
                {message}
            </div>
        </>
    )
}

export default WelcomeComponent;