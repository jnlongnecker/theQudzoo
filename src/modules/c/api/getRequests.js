async function isLoggedIn() {
    let result;
    try {
        result = await fetch("/db/login");
    }
    catch (e) {
        return false;
    }

    if (!result.ok) {
        return false;
    }

    let json = await result.json();
    return json.user ? true : false;
}

async function getAuthenticatedUser() {
    let result;

    try {
        result = await fetch("/db/authenticated");
    }
    catch (e) {
        return { error: true, username: null };
    }

    return await result.json();
}

async function getMiddleware(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
        console.error(await response.text());
        return;
    }

    return await response.json();
}

async function getPreviews(params, data) {
    return await getMiddleware(`/api/previews/${data}?${params}`);
}

async function getBuilds(filters) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let reqOptions = {
        method: "GET",
        headers: headers,
    }

    let response = await fetch("/db/builds/" + encodeURIComponent(JSON.stringify(filters)), reqOptions);

    return await response.json();
}

async function getCreatures() {
    return await getMiddleware("/api/creatures");
}

async function getItems() {
    return await getMiddleware("api/items");
}

async function getMutations() {
    return await getMiddleware("/api/mutations");
}

async function getCybernetics() {
    return await getMiddleware("/api/cybernetics");
}

async function getCastes() {
    return await getMiddleware("/api/castes");
}

async function getCallings() {
    return await getMiddleware("/api/callings");
}

async function getAttributes() {
    return await getMiddleware("/api/attributes");
}

async function getSkills() {
    return await getMiddleware("/api/skills");
}

async function getStats() {
    return await getMiddleware("/api/stats");
}

export {
    getBuilds, getAuthenticatedUser, isLoggedIn, getMutations, getCybernetics,
    getCastes, getCallings, getAttributes, getSkills, getStats, getCreatures, getItems, getPreviews
};