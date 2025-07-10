import { MutationPart } from './base';

export class Chimera extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You only manifest physical mutations, and all of your mutation choices when manifesting a new mutation are physical.\n\nWhenever you manifest a new mutation, one of your choices will also cause you to grow a new limb at random.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Esper extends MutationPart {

    getMaxRank() { return 1; }

    // Fun fact: This used to make you better at psionic Sifrah games
    static getDescription() {
        return `You only manifest mental mutations, and all of your mutation choices when manifesting a new mutation are mental.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class UnstableGenome extends MutationPart {

    static getDescription() {
        return `You gain one extra mutation each time you buy this, but the mutations don't manifest right away.\n\nWhenever you gain a level, there's a 33% chance that your genome destabilizes and you get to choose from 3 random mutations.`;
    }

    static getLevelText(level) {
        return ``;
    }
}