const dbs = require("./dbs.cjs");

// Return customized input, from which the LWR server constructs a response
// viewRequest = { url, requestPath, params?, query? }
// handlerContext = { route, viewApi: { hasViewResponse, getViewResponse } }
module.exports = async function (viewRequest, handlerContext) {
    const routeProperties = handlerContext.route.properties || {};
    const buildId = viewRequest.params.info;

    let result = await dbs.getBuilds({ params: { info: { "_id": [`${buildId}`] } }, session: { user: '' } }, { status: () => { } });

    const build = encodeURIComponent(JSON.stringify(result.builds[0]));
    const author = result.builds[0].owner != undefined ? result.builds[0].owner.displayName : 'Anonymous';
    const name = result.builds[0].name ? result.builds[0].name : 'Unnamed Build';

    return {
        view: {
            layoutTemplate: '$layoutsDir/build_layout.njk',
            rootComponent: 'build/viewer'
        },
        // Required: pass context to the templates
        viewParams: {
            build: build,
            author: author,
            name: name,
            preview: "/1/asset/s/latest/public/assets/images/previews/communityBuild.png",
            ...routeProperties, // pass the static route properties
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

