// Bootstrap / shim
export const BOOTSTRAP_PREFIX = 'lwr.bootstrap.';
export const BOOTSTRAP_END = `${BOOTSTRAP_PREFIX}end`;
export const BOOTSTRAP_ERROR = `${BOOTSTRAP_PREFIX}error`;
export const BOOTSTRAP_DURATION = `${BOOTSTRAP_PREFIX}duration`;
export const BOOTSTRAP_AVAILABILITY = `${BOOTSTRAP_PREFIX}availability`; // Loader: modules

export const LOADER_PREFIX = 'lwr.loader.';
export const MODULE_DEFINE = `${LOADER_PREFIX}module.define`;
export const MODULE_DEFINE_COUNT = `${MODULE_DEFINE}.count`;
export const MODULE_FETCH = `${LOADER_PREFIX}module.fetch`;
export const MODULE_FETCH_COUNT = `${MODULE_FETCH}.count`;
export const MODULE_FETCH_DURATION = `${MODULE_FETCH}.duration`;
export const MODULE_ERROR = `${LOADER_PREFIX}module.error`;
export const MODULE_AVAILABILITY = `${LOADER_PREFIX}module.availability`; // Loader: mappings

export const MAPPINGS_FETCH = `${LOADER_PREFIX}mappings.fetch`;
export const MAPPINGS_FETCH_COUNT = `${MAPPINGS_FETCH}.count`;
export const MAPPINGS_FETCH_DURATION = `${MAPPINGS_FETCH}.duration`;
export const MAPPINGS_ERROR = `${LOADER_PREFIX}mappings.error`;
export const MAPPINGS_AVAILABILITY = `${LOADER_PREFIX}mappings.availability`;