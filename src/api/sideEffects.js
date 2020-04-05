// TODO: choose better name
export const createNewScale = (legend, items) =>
    fetch(`${process.env.REACT_APP_SIDEEFFECTS_ENDPOINT_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            legend,
            items
        })
    });
