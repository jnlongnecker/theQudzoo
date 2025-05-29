import { MutationPart } from './base';

export class Amnesia extends MutationPart {

    static getDescription() {
        return `You forget things and places.\n\nWhenever you learn a new secret, there's a small chance you forget a secret.\nWhenever you return to a map you previously visited, there's a small chance you forget the layout.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class BlinkingTic extends MutationPart {

    static getDescription() {
        return `You teleport about uncontrollably.\n\nSmall chance each round you're in combat that you randomly teleport to a nearby location.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Dystechnia extends MutationPart {

    // Fun fact, there's some abandoned concept of Sifrah tinkering and hacking games that this would make you bad at
    static getDescription() {
        return `You are befuddled by technological complexity.\n\nYou're much worse at examining artifacts.\nYou can't have artifacts identified for you because you don't understand their explanations.\nWhen you fail severely during artifact examination, the artifact explodes.\n`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class EvilTwin extends MutationPart {

    static getDescription() {
        return `Acting on some inscrutable impulse, a parallel version of yourself travels through space and time to destroy you.\n\nEach time you embark on a new location, there's a small chance your evil twin has tracked you there and attempts to kill you.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Narcolepsy extends MutationPart {

    static getDescription() {
        return `You fall asleep involuntarily from time to time.\n\nSmall chance each round you're in combat that you fall asleep for 20-29 rounds.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class PsionicMigraines extends MutationPart {

    static getDescription() {
        return `You suffer from powerful psionic migraines that render your head extremely sensitive.\n\nYou can't wear hats or helmets.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class QuantumJitters extends MutationPart {

    static getDescription() {
        return `Your willful acts sometimes dent spacetime.\n\nWhenever you use an activated ability, there's a small chance your focus slips and you dent spacetime in the local region, causing 1-2 spacetime vortices to appear. This chance increases the longer you go without using an activated ability.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class SociallyRepugnant extends MutationPart {

    static getDescription() {
        return `Others find it difficult to tolerate you in social settings.\n\n-50 reputation with every faction`;
    }

    static getLevelText(level) {
        return ``;
    }
}