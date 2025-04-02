/*
    Author: Jared Longnecker
    Description: This module is used to handle the routing for
    article pages
*/

const sugarManager = require('./sugarManager.cjs');

// Return customized input, from which the LWR server constructs a response
// viewRequest = { url, requestPath, params?, query? }
// handlerContext = { route, viewApi: { hasViewResponse, getViewResponse } }
module.exports = async function (viewRequest, handlerContext) {
    const route = handlerContext.route || {};

    let compiledRoute = sugarManager.compileArticle(route);

    return {
        view: {
            contentTemplate: compiledRoute,
            layoutTemplate: route.layoutTemplate,
        },
        // Required: pass context to the templates
        viewParams: {
            ...route.properties, // pass the static route properties
        },
        // Optional: rendering options { skipMetadataCollection?, freezeAssets?, skipCaching? }
        renderOptions: {
            freezeAssets: true,
        },
        // Optional: caching options { ttl? }
        cache: {
            ttl: 200,
        },
    };
}

