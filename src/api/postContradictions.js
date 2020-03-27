const postContradictions = (body) => fetch(process.env.REACT_APP_CONTRADICTIONS_ENDPOINT_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
});

export default postContradictions;
