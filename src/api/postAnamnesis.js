const postAnamnesis = body => fetch(process.env.REACT_APP_ANAMNESIS_ENDPOINT_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
});

export default postAnamnesis;
