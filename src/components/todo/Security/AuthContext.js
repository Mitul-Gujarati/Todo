import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeBasicAuthenticatationService } from "../api/HelloWorld";

//1:CREATE A CONTEXT
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2:SHARE THE CREATED CONTEXT WITH OTHER COMPONENTS
function AuthProvider({ children }) {

    //3:PUT SOME STATE IN THE CONTEXT
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    async function login(username, password) {

        const baToken = 'Basic ' + window.btoa(username + ":" + password)

        try {
            const response = await executeBasicAuthenticatationService(baToken)

            if (response.status == 200) {
                setIsAuthenticated(true)
                setUsername(username)
                setToken(baToken)

                //adding an interceptors for pass the token to the every API. 
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = baToken
                        return config
                    }
                )

                return true
            }
            else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }

    function logout() {
        setIsAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider