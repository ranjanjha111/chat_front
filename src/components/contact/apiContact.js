import { API } from '../../config';

export const contactUs = message => {
    return fetch(`${API}/contact`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
        .then(response => {
            console.log(message)
            console.log(response)
            return response.json();
        })
};