export const baseUrl = process.env.REACT_APP_ENDPOINT_URL;

export function get (url) {
    const params = {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    return fetch(baseUrl + url, params).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return Promise.reject(response.statusText);
        }
    });
}

export function post (url, data) {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    };

    return fetch(baseUrl + url, params);
}

export function put (url, data) {
    const params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    };

    return fetch(baseUrl + url, params);
}
