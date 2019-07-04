const BASE_URL = '/api/scores/';

export function getAllScores() {
    return fetch(BASE_URL).then(res => res.json());
}

export function createscore(score) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(score)
    };
    return fetch(BASE_URL, options).then(res => res.json());
}
