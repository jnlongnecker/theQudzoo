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

    let compiledRoute;
    if (process.env.MODE !== 'prod') {
        compiledRoute = sugarManager.compileArticle(route);
    } else {
        let index = route.contentTemplate.lastIndexOf('\\');
        if (index < 0) index = route.contentTemplate.lastIndexOf('/');
        let filename = route.contentTemplate.substring(index + 1);
        const rootDir = __dirname.substring(0, __dirname.indexOf("src") - 1);
        compiledRoute = rootDir + '/src/content/compileCache/' + filename;
    }

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

