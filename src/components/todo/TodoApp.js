import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import AuthProvider, { useAuth } from "./Security/AuthContext";
import "./TodoApp.css"
import TodoComponent from "./TodoComponent";
import WelcomeComponent from "./WelcomeComponent";


function AthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

//Main App
function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/welcome/:username" element={
                            <AthenticatedRoute>
                                <WelcomeComponent />
                            </AthenticatedRoute>
                        } />
                        <Route path="/todos" element={
                            <AthenticatedRoute>
                                <ListTodosComponent />
                            </AthenticatedRoute>
                        } />
                        <Route path="/todo/:id" element={
                            <AthenticatedRoute>
                                <TodoComponent />
                            </AthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />
                        <Route path="/logout" element={
                            <AthenticatedRoute>
                                <LogoutComponent />
                            </AthenticatedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export { TodoApp }  