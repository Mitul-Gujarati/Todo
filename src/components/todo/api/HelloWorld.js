import { apiClient } from "./ApiClient"

export const retrieveHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

export const executeBasicAuthenticatationService = (token) => apiClient.get('/basicauth', {
    headers: {
        Authorization: token
    }
})