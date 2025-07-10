import { MutationPart } from './base';

export class Beguiling extends MutationPart {

    static hpBonus(level) {
        return level * 5;
    }

    static getDescription() {
        return `You beguile a nearby creature into serving you loyally.`;
    }

    static getLevelText(level, levelup) {
        return `Mental attack versus a creature with a mind\nSuccess roll: ${level} or Ego mod (whichever is higher) + character level + 1d8 VS. Defender MA + character level\nRange: 1\nBeguiled creature: +${Beguiling.hpBonus(level)} bonus hit points\nCooldown: 50 rounds`;
    }
}

export class Burgeoning extends MutationPart {

    static getCooldown(level) {
        return Math.max(5, 115 - 10 * level);
    }

    static getDescription() {
        return `You cause plants to spontaneously grow in a nearby area, hindering your enemies.`;
    }

    static getLevelText(level, levelup) {
        let text = `Range: 8\nArea: 3x3 + growth into adjacent tiles\nCooldown: ${Burgeoning.getCooldown(level)} rounds\n`;
        if (level > 1) text += `More powerful plants summoned\n`;
        return text + `+200 reputation with {{w|the Consortium of Phyta}}`;
    }
}

export class Clairvoyance extends MutationPart {

    static getVisionRadius(level) {
        return level > 15 ? level + 3 : 'whole map';
    }

    static getVisionDuration(level) {
        return level + 19;
    }

    static getCooldown(level) {
        return 100;
    }

    static getDescription() {
        return `You briefly gain vision of a nearby area.`;
    }

    static getLevelText(level, levelup) {
        return `Vision radius: ${Clairvoyance.getVisionRadius(level)}
        Vision duration: ${Clairvoyance.getVisionDuration(level)}
        Cooldown: ${Clairvoyance.getCooldown(level)}`;
    }
}

export class Confusion extends MutationPart {

    static getMentalPenalty(level) {
        return Math.min(10, Math.floor((level - 1) / 2 + 3));
    }

    static getConeAngle(level) {
        return 29 + level;
    }

    static getConeLength(level) {
        return 4 + Math.floor(level / 3);
    }

    static getDuration(level) {
        return `${Confusion.getLowDuration(level)} - ${Confusion.getHighDuration(level)}`
    }

    static getLowDuration(level) {
        return Math.floor((level / 2 + 10) * 0.8);
    }

    static getHighDuration(level) {
        return Math.floor((level / 2 + 10) * 1.2);
    }

    static getCooldown(level) {
        return 75;
    }

    static getDescription() {
        return `You confuse nearby enemies.`;
    }

    static getLevelText(level, levelup) {
        return `Affected creatures act semi-randomly and receive a -${Confusion.getMentalPenalty(level)} penalty to their mental abilities.
        Cone angle: ${Confusion.getConeAngle(level)} degrees
        Cone length: ${Confusion.getConeLength(level)}
        Duration: ${Confusion.getDuration(level)} rounds
        Cooldown: ${Confusion.getCooldown(level)} rounds`;
    }
}

export class Cryokinesis extends MutationPart {

    static getDuration(level) {
        return 3;
    }

    static getRange(level) {
        return 8;
    }

    static getSize(level) {
        return 3;
    }

    static getDamageDieSize(round) {
        switch (round) {
            case 1: return 2;
            case 2: return 3;
            default: return 4;
        }
    }

    static getCooldown(level) {
        return 50;
    }

    static getDescription() {
        return `You chill a nearby area with your mind.`;
    }

    static getLevelText(level, levelup) {
        return `Chills affected area over ${Cryokinesis.getDuration(level)} rounds, dealing damage and freezing things
        Range: ${Cryokinesis.getRange(level)}
        Area: ${Cryokinesis.getSize(level)}x${Cryokinesis.getSize(level)}
        Round 1 Damage: ${level}d${Cryokinesis.getDamageDieSize(1)} divided by 2
        Round 2 Damage: ${level}d${Cryokinesis.getDamageDieSize(2)} divided by 2
        Round 3 Damage: ${level}d${Cryokinesis.getDamageDieSize(3)} divided by 2
        Cooldown: ${Cryokinesis.getCooldown(level)} rounds`;
    }
}

export class Disintegration extends MutationPart {

    static getNonStructureDamage(level) {
        return `${level}d10+${2 * level}`;
    }

    static getStructureDamage(level) {
        return `${level}d100+20`;
    }

    static getCooldown(level) {
        return 75;
    }

    static getDescription() {
        return `You disintegrate nearby matter.`;
    }

    static getLevelText(level, levelup) {
        return `Area: 7x7 around self
        Damage to non-structural objects: ${Disintegration.getNonStructureDamage(level)}
        Damage to structural objecst: ${Disintegration.getStructureDamage(level)}
        You are exhausted for 3 rounds after using this power.
        Cooldown: ${Disintegration.getCooldown(level)} rounds`;
    }
}

export class Domination extends MutationPart {

    static getCooldown(level) {
        return 75;
    }

    static getDuration(level) {
        return 100 * (level + 1);
    }

    static getDescription() {
        return `You garrote an adjacent creature's mind and control its actions while your own body lies dormant.`;
    }

    static getLevelText(level, levelup) {
        return `Mental attack versus creature with a mind
        Success roll: ${level} or Ego mod (whichever is higher) + character level + 1d8 VS. Defender MA + character level
        Range: 1
        Duration: ${Domination.getDuration(level)} rounds
        Cooldown: ${Domination.getCooldown(level)} rounds`;
    }
}

export class ForceBubble extends MutationPart {

    static getDuration(level) { return 9 + level * 3 + 1; }
    static getCooldown(level) { return 100; }

    static getDescription() {
        return `You generate a forcefield around yourself.`;
    }

    static getLevelText(level, levelup) {
        return `Creates a 3x3 forcefield centered on yourself
        Duration: ${ForceBubble.getDuration(level)} rounds
        Cooldown: ${ForceBubble.getCooldown(level)} rounds
        You may fire missile weapons through the forcefield.`;
    }
}

export class ForceWall extends MutationPart {

    static getDuration(level) { return 14 + level * 2; }
    static getCooldown(level) { return 100; }

    static getDescription() {
        return `You generate a wall of force that protects you from your enemies.`;
    }

    static getLevelText(level, levelup) {
        return `Creates 9 contiguous squares of immobile forcefield.
        Duration: ${ForceWall.getDuration(level)} rounds
        Cooldown: ${ForceWall.getCooldown(level)} rounds
        You may fire missile wapons through the forcefield.`;
    }
}

export class Kindle extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You ignite a small fire with your mind.\n
        Range: 12
        Cooldown: 50`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class LifeDrain extends MutationPart {

    static getDuration(level) { return 20; }
    static getCooldown(level) { return 200; }

    static getDescription() {
        return `You bond with a nearby organic creature and leech its life force.`;
    }

    static getLevelText(level, levelup) {
        return `Mental attack versus an organic creature
        Drains ${level} hit point(s) per round
        Target gets a mental save to resist damage each round
        Duration: ${LifeDrain.getDuration(level)} rounds
        Cooldown: ${LifeDrain.getCooldown(level)} rounds`;
    }
}

export class LightManipulation extends MutationPart {

    static getMaxLightRadius(level) { 4 + Math.floor(level / 2); }
    static getDamage(level) {
        if (level <= 1) return '1d3';
        switch (level) {
            case 2: return '1d4';
            case 3: return '1d5';
            case 4: return '1d4+1';
            case 5: return '1d5+1';
            case 6: return '1d4+2';
            case 7: return '1d5+2';
            case 8: return '1d4+3';
            case 9: return '1d5+3';
            default: return `1d5+${level - 6}`;
        }
    }
    static getLasePenetrationBonus(level) { return 4 + Math.floor((level - 1) / 2); }
    static getRadiusRegrowthTurns(willpower) {
        let baseTurns = 15;
        let willAdjust = (willpower - 16) * 5;
        if (willAdjust != 0) {
            baseTurns = baseTurns * Math.floor((100 - willAdjust) / 100);
        }
        return Math.max(Math.min(baseTurns, 15 * 5), 3);
    }
    static getReflectChance(level) { return 10 + 3 * level; }

    static getDescription() {
        return `You manipulate light to your advantage.`;
    }

    static getLevelText(level, levelup, willpower) {
        return `You produce ambient light within a radius of ${LightManipulation.getMaxLightRadius(level)}.
        You may focus the light into a laser beam, temporarily reducing the radius of your ambient light by 1.
        Laser damage increment: ${LightManipulation.getDamage(level)}
        Laser penetration: ${LightManipulation.getLasePenetrationBonus(level) + 4}
        Ambient light recharges at a rate of 1 unit every ${LightManipulation.getRadiusRegrowthTurns(willpower)} rounds until it reaches its maximum value.
        ${LightManipulation.getReflectChance(level)}% chance to reflect light-based damage`;
    }
}

export class MassMind extends MutationPart {

    static getCooldown(level) { return Math.max(100, 500 - 50 * level); }

    static getDescription() {
        return `You tap into the aggregate mind and steal power from other espers.`;
    }

    static getLevelText(level, levelup) {
        return `Refreshes all mental mutations
        Cooldown: ${MassMind.getCooldown(level)} rounds
        Cooldown is not affected by Willpower
        Each use attracts slightly more attention from psychic interlopers.
        Small chance each round for another esper to steal your powers
        -200 reputation with {{w|the Seekers of the Sightless Way}}`;
    }
}

export class MentalMirror extends MutationPart {

    static getMABonus(level) { return 3 + level; }
    static getCooldown(level) { return 50; }

    static getDescription() {
        return `You reflect mental attacks back at your attackers.`;
    }

    static getLevelText(level, levelup) {
        return `When you suffer a mental attack while Mental Mirror is off cooldown, you gain ${MentalMirror.getMABonus(level)} mental armor (MA).
        If the attack then fails to penetrate your MA, it's reflected back at your attacker.
        Cooldown: ${MentalMirror.getCooldown(level)}`;
    }
}

export class Precognition extends MutationPart {

    static getDuration(level) { return 4 * level + 12; }
    static getCooldown(level) { return 500; }

    static getDescription() {
        return `You peer into your near future.`;
    }

    static getLevelText(level, levelup) {
        return `You may activate this power and then later revert to the point in time when you activated it.
        Duration between use and reversion: ${Precognition.getDuration(level)} rounds
        Cooldown: ${Precognition.getCooldown(level)} rounds`;
    }
}

export class Psychometry extends MutationPart {

    static getIdentifiableComplexity(level) { return 4 + Math.floor(level / 2); }
    static getLearnableComplexity(level) { return 2 + Math.floor((level - 1) / 2); }

    static getDescription() {
        return `You read the history of artifacts by touching them, learning what they do and how they were made.`;
    }

    // Fun fact: This used to add a turn to tinkering and ritual Sifrah games
    static getLevelText(level, levelup) {
        return `Unerringly identify artifacts up to complexity tier ${Psychometry.getIdentifiableComplexity(level)}
        Learn how to construct identified artifacts up to complexity tier ${Psychometry.getLearnableComplexity(level)} (must have the appropriate Tinker skill).
        You may open security doors and use some secure devices by touching them.`;
    }
}

export class Pyrokinesis extends MutationPart {

    static getDuration(level) { return 3; }
    static getRange(level) { return 8; }
    static getSize(level) { return 3; }
    static getDamageDieSize(round) {
        switch (round) {
            case 1: return 3;
            case 2: return 4;
            default: return 6;
        }
    }
    static getCooldown(level) { return 50; }

    static getDescription() {
        return `You heat a nearby area with your mind.`;
    }

    static getLevelText(level, levelup) {
        return `Toasts affected area over ${Pyrokinesis.getDuration(level)} rounds
        Range: ${Pyrokinesis.getRange(level)}
        Area: ${Pyrokinesis.getSize(level)}x${Pyrokinesis.getSize(level)}
        Round 1 Damage: ${level}d${Pyrokinesis.getDamageDieSize(1)} divided by 2
        Round 2 Damage: ${level}d${Pyrokinesis.getDamageDieSize(2)} divided by 2
        Round 3 Damage: ${level}d${Pyrokinesis.getDamageDieSize(3)} divided by 2
        Cooldown: ${Pyrokinesis.getCooldown(level)} rounds`;
    }
}

export class SensePsychic extends MutationPart {

    getMaxRank() { return 1; }

    static getDescription() {
        return `You can sense other mental mutants through the psychic aether.\n\nYou detect the presence of psychic enemies within a radius of 9.\nThere's a chance you identify detected enemies.`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class SpacetimeVortex extends MutationPart {

    static getCooldown(level) { return Math.max(5, 550 - 50 * level); }

    static getDescription() {
        return `You sunder spacetime, sending things nearby careening through a tear in the cosmic fabric.`;
    }

    static getLevelText(level, levelup) {
        let bonusText = level > 10 ? `\nBonus duration: ${level - 10} rounds` : ``;
        return `Summons a vortex that swallows everything in its path.${bonusText}
        Cooldown: ${SpacetimeVortex.getCooldown(level)} rounds
        You may enter the vortex to teleport to a random location in Qud.
        +200 reputation with {{w|highly entropic beings}}`;
    }
}

export class StunningForce extends MutationPart {

    static getCooldown(level) { return 50; }
    static getRange(level) { return 8; }
    static getDamageIncrement(level) {
        if (level < 3) return '1d3';
        return `1d3+${Math.floor((level - 1) / 2)}`
    }

    static getDescription() {
        return `You invoke a concussive force in a nearby area, throwing enemies back and stunning them.`;
    }

    static getLevelText(level, levelup) {
        let levelupText = levelup ? `Increased stun save difficulty` : `Creatures are pushed away from the center of the blast, stunned, and dealt crushing damage in up to 3 increments.`
        return `Range: ${StunningForce.getRange(level)}
        Area: 7x7
        ${levelupText}
        Damage increment: ${StunningForce.getDamageIncrement(level)}
        Cooldown: ${StunningForce.getCooldown(level)}`;
    }
}

export class SunderMind extends MutationPart {

    static getDamageDice(level) {
        switch (level) {
            case 1: return '1d3';
            case 2: return '1d4';
            default:
                if (level % 2 == 1) return `1d3+${Math.floor(level / 2)}`;
                return `1d4+${Math.floor((level - 1) / 2)}`;
        }
    }
    static getCooldown(level) { return 80; }

    static getDescription() {
        return `You sunder the mind of an enemy, leaving them reeling in pain.`;
    }

    static getLevelText(level, levelup) {
        return `For up to 10 rounds, you engage in psychic combat with an opponent, dealing damage each round.
        Taking any action other than passing the turn will break the connection.
        Each round you make a mental attack vs mental armor (MA).
        Damage increment: ${SunderMind.getDamageDice(level)}
        After the tenth round, you deal bonus damage equal to the total amount of damage you've done so far.
        Range: sight
        Cooldown: ${SunderMind.getCooldown(level)} rounds`;
    }
}

export class Telepathy extends MutationPart {

    getMaxRank() { return 1; }

    // Fun fact: this was apparently "useful" in social and psionic Sifrah games. How? Who knows.
    static getDescription() {
        return `You may communicate with others through the psychic aether.\n\nChat with anyone in vision\nTakes you much less time to issue orders to companions`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class Teleportation extends MutationPart {

    static getCooldown(level) { return Math.max(103 - 3 * level, 5); }
    static getRadius(level) { return Math.max(13 - level, 2); }

    static getDescription() {
        return `You teleport to a nearby location.`;
    }

    static getLevelText(level, levelup) {
        return `Teleport to a random location within a designated area.
        Uncertainty radius: ${Teleportation.getRadius(level)}
        Cooldown: ${Teleportation.getCooldown(level)} rounds`;
    }
}

export class TeleportOther extends MutationPart {

    static getCooldownTurns(level) { return Math.max(115 - 10 * level, 5); }

    static getDescription() {
        return `You teleport an adjacent creature to a random nearby location.`;
    }

    static getLevelText(level, levelup) {
        return `Cooldown: ${TeleportOther.getCooldownTurns(level)} rounds`;
    }
}

export class TemporalFugue extends MutationPart {

    static getDuration(level) { return 20 + 2 * Math.floor(level / 2); }
    static getCopies(level) { return Math.floor((level - 1) / 2 + 1); }
    static getCooldown(level) { return 200; }

    static getDescription() {
        return `You quickly pass back and forth through time creating multiple copies of yourself.`;
    }

    static getLevelText(level, levelup) {
        return `Duration: ${TemporalFugue.getDuration(level)} rounds
        Copies: ${TemporalFugue.getCopies(level)}
        Cooldown: ${TemporalFugue.getCooldown(level)} rounds`;
    }
}

export class TimeDilation extends MutationPart {

    static calculateQuicknessPenaltyMultiplier(distance, maxRange, level) {
        return Math.pow(maxRange - distance, 2) * (.0005 * level + 0.0085);
    }
    static getCooldown(level) { return 150; }
    static getRange(level) { return 9; }
    static getDuration(level) { return 15; }

    static getDescription() {
        return `You distort time around your person in order to slow down your enemies.`;
    }

    static getLevelText(level, levelup) {
        let range = TimeDilation.getRange(level);
        let penalty1 = Math.floor(TimeDilation.calculateQuicknessPenaltyMultiplier(1, range, level) * 100);
        let penalty4 = Math.floor(TimeDilation.calculateQuicknessPenaltyMultiplier(4, range, level) * 100)
        let penalty7 = Math.floor(TimeDilation.calculateQuicknessPenaltyMultiplier(7, range, level) * 100)
        return `Creatures within ${range} tiles are slowed according to how close they are to you.
        Distance 1: creatures receive a ${penalty1}% Quickness penalty
        Distance 4: creatures receive a ${penalty4}% Quickness penalty
        Distance 7: creatures receive a ${penalty7}% Quickness penalty
        Duration: ${TimeDilation.getDuration(level)} rounds
        Cooldown: ${TimeDilation.getCooldown(level)} rounds`;
    }
}

export class WillForce extends MutationPart {

    static getLowDuration(level) { return 16 + 2 * level; }
    static getHighDuration(level) { return 20 + 2 * level; }
    static getCooldown(level) { return 200; }

    static getDescription() {
        return `Through sheer force of will, you perform uncanny physical feats.`;
    }

    static getLevelText(level, levelup) {
        return `Augments one physical attribute by an amount equal to twice your Ego bonus
        Duration: ${WillForce.getLowDuration(level)}-${WillForce.getHighDuration(level)} rounds
        Cooldown: ${WillForce.getCooldown(level)} rounds`;
    }
}