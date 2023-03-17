import {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations,
    getCybernetics, getCastes, getCallings, getAttributes, getSkills, getStats
} from './getRequests.js';

import { attemptLogin, attemptRegister, logout, saveBuild } from './postRequests.js';
import { deleteBuilds } from "./deleteRequests.js";


export {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations, getCybernetics, getCastes, getCallings,
    getAttributes, getSkills, getStats,

    attemptLogin, attemptRegister, logout, saveBuild,

    deleteBuilds
};