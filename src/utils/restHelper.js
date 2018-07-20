import axios from 'axios';

export function fetch(url) {
    return axios.get(url)
        .then(response => {
            return response;
        })
        .catch(error => {
            return null
        });
}

export function fetchWithParams(url, params) {
    return axios.get(url, {params: params})
        .then(response => {
            return response;
        });
}