import { updateStaleModule } from './util/swap';

// This is a workaround until we don't change the way HMR works
// The server will always return the same canonical "latest URL"
// So we need to track the last new URI instead
const URI_MAPPING = new Map();

async function moduleUpdate(payload) {
    const {
        oldUri,
        newUri,
        module: { specifier },
    } = payload;

    const lastEvalutedUri = URI_MAPPING.get(oldUri) || oldUri;
    const oldModule = await import(lastEvalutedUri);
    const newModule = await import(newUri);
    URI_MAPPING.set(oldUri, newUri);

    updateStaleModule({
        oldModule,
        newModule,
        specifier,
    });
}

function viewUpdate(payload, metadata) {
    const viewId = payload.viewId;
    const assetId = payload.assetId;

    // eslint-disable-next-line no-undef
    if (metadata.templates.includes(viewId) || metadata.assetReferences.includes(assetId)) {
        window.location.reload();
    }
}

export function initHMR(serverURI = '', metadata) {
    const normalizedMeta = {
        ...{ assetReferences: [], templates: [] },
        ...metadata,
    };
    // {apiVersion}/hmr/{format}/{compat}?debug
    const host = serverURI.startsWith('/') ? location.host : '';
    const socket = new WebSocket(`ws://${host}${serverURI}`);
    socket.addEventListener('message', async ({ data }) => {
        const { eventType, payload } = JSON.parse(data);

        switch (eventType) {
            case 'moduleUpdate':
                return moduleUpdate(payload);
            case 'viewUpdate':
                return viewUpdate(payload, normalizedMeta);
            default:
                return;
        }
    });
}
