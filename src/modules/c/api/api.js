import {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations,
    getCybernetics, getCastes, getCallings, getAttributes, getSkills, getStats, getCreatures, getItems
} from './getRequests.js';

import { attemptLogin, attemptRegister, logout, saveBuild, likeBuild, compileSugar, compileShaders } from './postRequests.js';
import { deleteBuilds } from "./deleteRequests.js";


export {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations, getCybernetics, getCastes, getCallings,
    getAttributes, getSkills, getStats, getCreatures, getItems,

    attemptLogin, attemptRegister, logout, saveBuild, likeBuild, compileSugar, compileShaders,

    deleteBuilds
};