import axios from "axios"

const getALL = (baseURL) => {
    const request = axios.get(baseURL)
    return request.then((response) => {
        return response.data
        })
}

const create = (baseURL, data) => {
    const request = axios.post(`${baseURL}`, data)
    return request.then((response) => {
        return response.data
        })
}

const update = (baseURL, id, data) => {
    const request = axios.put(`${baseURL}/${id}`, data)
    return request.then((response) => {
        return response.data
        })
}

const remove = (baseURL, id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then((response) => {
        return response.data    
        })
}

const REST = {getALL, create, update, remove}

export default REST