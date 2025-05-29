import {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations,
    getCybernetics, getCastes, getCallings, getAttributes, getSkills, getStats, getCreatures, getItems, getPreviews, getDetails, getSkillData, getSubtypes, getMutationData
} from './getRequests.js';

import { attemptLogin, attemptRegister, logout, saveBuild, likeBuild, compileSugar, compileShaders } from './postRequests.js';
import { deleteBuilds } from "./deleteRequests.js";


export {
    getAuthenticatedUser, getBuilds, isLoggedIn, getMutations, getCybernetics, getCastes, getCallings,
    getAttributes, getSkills, getStats, getCreatures, getItems, getPreviews, getDetails, getSkillData,
    getSubtypes, getMutationData,

    attemptLogin, attemptRegister, logout, saveBuild, likeBuild, compileSugar, compileShaders,

    deleteBuilds
};