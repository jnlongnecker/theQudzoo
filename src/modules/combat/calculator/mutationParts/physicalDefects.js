import { MutationPart } from './base';

export class Albino extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `Your skin, hair, and eyes are absent of pigment.\n\nYou regenerate hit points at one-fifth the usual rate in the daylight.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Amphibious extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `Your skin must be kept moist with fresh water.\n\nYou pour water on yourself rather than drinking it to quench your thirst.\nYou require about two-thirds more water than usual.\n+100 reputation with {{w|frogs}}`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Analgesia extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You lack a developed sense of pain.\n\nYou only know your general state of health and not your precise number of hit points.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class BrittleBones extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `Your bones are brittle.\n\nYou suffer 50% more damage from bludgeoning attacks, falling, and other sources of concussive damage.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Carnivorous extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You eat meat exclusively.\n\nYou get no satiation from foods that aren't meat.\nIf you eat raw food that isn't meat, there's a 50% chance you become ill for 2 hours.\nYou can't cook with plant or fungus ingredients.\nYou don't get ill when you eat raw meat.\nYou can eat raw meat without being famished.\n`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class ColdBlooded extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `Your vitality depends on your temperature; at higher temperatures, you are more lively. At lower temperatures, you are more torpid.\n\nYour base quickness score is reduced by 10.\nYour quickness increases as your temperature increases and decreases as your temperature decreases.\n+100 reputation with {{w|unshelled reptiles}}`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class ElectromagneticImpulse extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You involuntarily release electromagnetic pulses, deactivating robots and artifacts around yourself.\n\nSmall chance each round you're in combat that you release an electromagnetic pulse with radius 3, deactivating robots and artifacts (including those you carry) for 11-20 rounds.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class HooksForFeet extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You have hooks for feet.\n\nYou cannot wear shoes.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class IrritableGenome extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `Your genome is irritable and unpredictable.\n\nWhenever you spend a mutation point, the next mutation point you gain will be spent randomly.\nWhenever you buy a new mutation, you get a random one instead of a choice of three.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class Myopia extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You are nearsighted.\n\nYou can only see up to a radius of 10.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class SpontaneousCombustion extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You spontaneously erupt into flames.\n\nSmall chance each round you're in combat that you spontaneously erupt into flames.`;
    }

    static getLevelText(level) {
        return ``;
    }
}

export class TonicAllergy extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You are allergic to tonics.\n\nThe chance your mutant physiology reacts adversely to a tonic is increased to 33%.\nIf you react adversely this way to a salve or ubernostrum tonic, the adverse reaction effect is chosen randomly from among other tonic effects. You will still heal.`;
    }

    static getLevelText(level) {
        return ``;
    }
}