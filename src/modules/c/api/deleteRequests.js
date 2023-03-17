async function deleteBuilds(ids) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let rawBody = {
        ids: ids
    }

    let reqOptions = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(rawBody)
    }

    let response = await fetch("/db/builds", reqOptions);
    return await response.json();
}

export { deleteBuilds };