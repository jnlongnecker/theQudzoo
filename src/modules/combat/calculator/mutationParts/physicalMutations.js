import { MutationPart } from './base';

export class AdrenalControl2 extends MutationPart {


    static getQuicknessBonus(level) {
        return 9 + level;
    }

    static getRankBonus(level) {
        return Math.floor(level / 3) + 1
    }

    static getDescription() {
        return "You regulate your body's release of adrenaline.";
    }

    static getLevelText(level, levelup) {
        return `You can increase your body's adrenaline flow for 20 rounds.\nWhile it's flowing,  you gain ` +
            `+${AdrenalControl2.getQuicknessBonus(level)} quickness and other physical mutations gain ` +
            `+${AdrenalControl2.getRankBonus(level)} rank.\nCooldown: 200 rounds`;
    }
}

export class Beak extends MutationPart {

    static getVariants() {
        return [
            { type: "Beak", name: "Beak" },
            { type: "Bill", name: "Beak Bill" },
            { type: "Rostrum", name: "Beak Rostrum" },
            { type: "Frill", name: "Beak Frill" },
            { type: "Proboscis", name: "Beak Proboscis" },
        ];
    }

    static getDescription(variantName) {
        return `Your face bears a sightly ${variantName}.\n\n+1 Ego\nYou occasionally peck at your opponents.\n+200 reputation with {{w|birds}}`;
    }
}

export class BurrowingClaws extends MutationPart {

    static getWallBonusPenetration(level) {
        return level * 3;
    }

    static getWallHitsRequired(level) {
        return 4;
    }

    // Code for this is crazy complex and I don't understand it. This has the same effect but is actually readable
    static getClawsDamage(level) {
        if (level < 1) return `1d2`;
        switch (level) {
            case 1: case 2: case 3: return `1d2`;
            case 4: case 5: case 6: return `1d3`;
            case 7: case 8: case 9: return `1d4`;
            case 10: case 11: case 12: return `1d6`;
            case 13: case 14: case 15: return `1d8`;
            case 16: case 17: return `1d10`;
            default: return `1d12`;
        }
    }

    static getDescription() {
        return `You bear spade-like claws that can burrow through the earth.`;
    }

    static getLevelText(level, levelup) {
        return `Claw penetration vs wall: ${BurrowingClaws.getWallBonusPenetration(level)}
        Claws destroy walls after ${BurrowingClaws.getWallHitsRequired(level)} penetrating hits.
        Claws are also a short-blade class natural weapon that deal ${BurrowingClaws.getClawsDamage(level)} base damage to non-walls.`;
    }
}

export class Carapace extends MutationPart {

    static getAV(level) {
        return 3 + Math.floor(level / 2);
    }

    static getDV(level) {
        return -2;
    }

    static getHeatResistance(level) {
        return 5 + (5 * level);
    }

    static getColdResistance(level) {
        return 5 + (5 * level);
    }

    static getDescription() {
        return `You are protected by a durable carapace.`;
    }

    static getLevelText(level, levelup) {
        return `+${Carapace.getAV(level)} AV
        ${Carapace.getDV(level)} DV
        +${Carapace.getHeatResistance(level)} Heat Resistance
        +${Carapace.getColdResistance(level)} Cold Resistance
        +400 reputation with {{w|tortoises}}
        You may tighten your carapace to recieve double the AV bonus at a -2 DV penalty as long as you remain still.
        Cannot wear body armor.`;
    }
}

export class CorrosiveGasGeneration extends MutationPart {

    static getDuration(level) {
        return level + 2;
    }

    static getCooldown(level) {
        return 40;
    }

    static getDescription() {
        return `You release a burst of corrosive gas around yourself.`;
    }

    static getLevelText(level, levelup) {
        return `Releases gas for ${CorrosiveGasGeneration.getDuration(level)} rounds
        Cooldown: ${CorrosiveGasGeneration.getCooldown(level)} rounds`;
    }
}

export class DarkVision extends MutationPart {

    static getDescription() {
        return `You see in the dark.`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class ElectricalGeneration extends MutationPart {

    static getMaxCharge(level) { }
    static getBaseChargePerTurn(level) { }

    static getDescription() {
        return `You accrue electrical charge that you can use and discharge to deal damage.`;
    }

    static getLevelText(level, levelup) {
        return `Maximum charge: {{C|${ElectricalGeneration.getMaxCharge(level)}}}
        Accrue base {{C|${ElectricalGeneration.getBaseChargePerTurn(level)}}} charge per turn
        Can discharge all held charge damage for 1d4 damage per 1000 charge
        Discharge can arc to adjacent targetes dealing reduced damage, up to 1 target per 1000 charge
        EMP causes involuntary discharge (difficulty 18 Willpower save)
        You can drink charge from energy cells and capacitors
        You gain 100 charge per point of electrical damage taken.
        You can provide charge to equipped devices that have integrated power systems`;
    }
}

export class ElectromagneticPulse extends MutationPart {

    static getRadius(level) {
        if (level < 5) return 2;
        if (level < 9) return 5;
        return 9;
    }

    static getCooldown(level) {
        return 200;
    }

    static getDuration(level) {
        return `${ElectromagneticPulse.getDurationLow(level)}-${ElectromagneticPulse.getDurationHigh(level)}`
    }

    static getDurationLow(level) { return 4 + level * 2; }
    static getDurationHigh(level) { return 13 + level * 2; }

    static getDescription() {
        return `You generate an electromagnetic pulse that disables nearby artifacts and machines.`;
    }

    static getLevelText(level, levelup) {
        let radius = ElectromagneticPulse.getRadius(level);
        return `Area: ${radius}x${radius} centered around yourself
        Duration: ${ElectromagneticPulse.getDuration(level)} rounds
        Cooldown: ${ElectromagneticPulse.getCooldown(level)} rounds`;
    }
}

export class FlamingRay extends MutationPart {

    static getRange(level) { return 10; }
    static getHeatOnHitAmount(level) { return `${level * 2}d8`; }
    static getDamage(level) { return `${level}d4`; }
    static getCooldown(level) { return 10; }
    static getVariants() {
        return [
            { type: "Hands", name: "Ghostly Flames" },
            { type: "Face", name: "Ghostly Flames Face" },
            { type: "Feet", name: "Ghostly Flames Feet" },
        ];
    }

    static getDescription() {
        return `You emit a ray of flame.`;
    }

    static getLevelText(level, levelup) {
        return `Emits a ${FlamingRay.getRange(level)}-square ray of flame in the direction of your choice.
        Damage: ${FlamingRay.getDamage(level)}
        Cooldown: ${FlamingRay.getCooldown(level)} rounds
        Melee attacks heat opponents by ${FlamingRay.getHeatOnHitAmount(level)} degrees`;
    }
}

export class FreezingRay extends MutationPart {

    static getRange(level) { return 10; }
    static getCoolOnHitAmount(level) { return `-${level * 2}d8`; }
    static getDamage(level) { return `${level}d3`; }
    static getCooldown(level) { return 20; }
    static getVariants() {
        return [
            { type: "Hands", name: "Icy Vapor" },
            { type: "Face", name: "Icy Vapor Face" },
            { type: "Feet", name: "Icy Vapor Feet" },
        ];
    }

    static getDescription() {
        return `You emit a ray of frost.`;
    }

    static getLevelText(level, levelup) {
        return `Emits a ${FreezingRay.getRange(level)}-square ray of frost in the direction of your choice.
        Damage: ${FreezingRay.getDamage(level)}
        Cooldown: ${FreezingRay.getCooldown(level)} rounds
        Melee attacks cool opponents by ${FreezingRay.getCoolOnHitAmount(level)} degrees`;
    }
}

export class HeightenedAgility extends MutationPart {

    static getCooldownCancelChance(level) { return 7 + level * 3; }
    static getAgilityBonus(level) { return 2 + Math.floor((level - 1) / 2); }

    static getDescription() {
        return `Your joints stretch much further than usual.`;
    }

    static getLevelText(level, levelup) {
        return `+${HeightenedAgility.getAgilityBonus(level)} Agility
        ${HeightenedAgility.getCooldownCancelChance(level)}% chance that Sprint and skills with Agility prerequisites don't go on cooldown after use`;
    }
}

export class HeightenedHearing extends MutationPart {

    static getRadius(level) {
        if (level < 10) return 3 + level * 2;
        return 40;
    }

    static getDescription() {
        return `You are possessed of unnaturally acute hearing.`;
    }

    static getLevelText(level, levelup) {
        return `You detect the presence of creatures within a radius of ${HeightenedHearing.getRadius(level)}.
        Chance to identify nearby detected creatures`;
    }
}

export class HeightenedSpeed extends MutationPart {

    static getSpeedBonus(level) { return 13 + 2 * level; }

    static getDescription() {
        return `You are gifted with tremendous speed.`;
    }

    static getLevelText(level, levelup) {
        return `+${HeightenedSpeed.getSpeedBonus(level)} Quickness`;
    }
}

export class HeightenedStrength extends MutationPart {

    static getDazedChance(level) { return 13 + 2 * level; }
    static getStrengthBonus(level) { return 2 + Math.floor((level - 1) / 2); }

    static getDescription() {
        return `You are possessed of hulking strength.`;
    }

    static getLevelText(level, levelup) {
        return `+${HeightenedStrength.getStrengthBonus(level)} Strength
        ${HeightenedStrength.getDazedChance(level)}% chance to daze your opponent on a successful melee attack for 2-3 rounds`;
    }
}

export class Horns extends MutationPart {

    static getAV(level) { return 1 + Math.floor((level - 1) / 3); }
    static getBaseDamage(level) { return `2d${3 + Math.floor(level / 3)}`; }
    static getToHitBonus(level) { return Math.floor(level / 2) + 1; }
    static getVariants() {
        return [
            { type: "Horns", name: "Horns" },
            { type: "Horn", name: "Horns Single" },
            { type: "Antlers", name: "Horns Casque" },
            { type: "Casque", name: "Horns Antlers" },
            { type: "Spiral Horn", name: "Horns Spiral" },
        ];
    }

    static getDescription(variantName) {
        return `Horns jut out of your head.`;
    }

    static getLevelText(level, levelup) {
        return `20% chance on melee attack to gore  your opponent
        Damage increment: ${Horns.getBaseDamage(level)}
        To-hit bonus: ${Horns.getToHitBonus(level)}
        Goring attacks may cause bleeding
        Horns are a short-blade class natural weapon.
        Cannot wear helmets
        +100 reputation with {{w|antelopes}} and {{w|goatfolk}}`;
    }
}

export class MultipleArms extends MutationPart {

    static getAttackChance(level) { return 7 + level * 3; }

    static getDescription() {
        return `You have an extra set of arms.`;
    }

    static getLevelText(level, levelup) {
        return `${MultipleArms.getAttackChance(level)}% chance for each extra arm to deliver an additional melee attack whenever you make a melee attack`;
    }
}

export class MultipleLegs extends MutationPart {

    static getMoveSpeedBonus(level) { return level * 20; }
    static getCarryCapacityBonus(level) { return level + 5; }

    static getDescription() {
        return `You have an extra set of legs.`;
    }

    static getLevelText(level, levelup) {
        return `+${MultipleLegs.getMoveSpeedBonus(level)} move speed
        +${MultipleLegs.getCarryCapacityBonus(level)}% carry capacity`;
    }
}

export class NightVision extends MutationPart {

    static getDescription() {
        return `You see in the dark.`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class Phasing extends MutationPart {

    static getDuration(level) { return 6 + level; }
    static getBaseCooldown(level) { return 103 - 3 * level; }

    static getDescription() {
        return `You may phase through solid objects for brief periods of time.`;
    }

    static getLevelText(level, levelup) {
        return `Duration: ${Phasing.getDuration(level)} rounds
        Cooldown: ${Phasing.getBaseCooldown(level)} rounds`;
    }
}

export class PhotosyntheticSkin extends MutationPart {

    static getBonusDuration(level) { Math.floor((level - 1) / 4) + 1; }
    static getBonusRegeneration(level) { return 20 + level * 10 }
    static getBonusQuickness(level) { return 13 + level * 2; }
    static getStarchServings(level) { return `${PhotosyntheticSkin.getBonusDuration(level)} serving(s)` }
    static getBonusCamouflage(level) { return Math.min(Math.floor((level - 1) / 4) + 1, 6); }

    static getDescription() {
        return `You replenish yourself by absorbing sunlight through your hearty green skin.`;
    }

    static getLevelText(level, levelup) {
        return `You can bask in the sunlight instead of eating a meal to gain a special metabolizing effect for ${PhotosyntheticSkin.getBonusDuration(level)} day(s): +${PhotosyntheticSkin.getBonusRegeneration(level)}% to natural healing rate and +${PhotosyntheticSkin.getBonusQuickness(level)} Quickness
        While in the sunlight, you accrue starch and lignin that you can use as ingredients in meals you cook (max ${PhotosyntheticSkin.getStarchServings(level)} of each).
        +${PhotosyntheticSkin.getBonusCamouflage(level)} DV while occupying the same space as foliage
        +200 reputation with {{w|roots}}, {{w|trees}}, {{w|vines}}, and {{w|the Consortium of Phyta}}`;
    }
}

export class Quills extends MutationPart {

    static getAV(level) { return Math.max(2, Math.floor(level / 3 + 2)); }
    static getAVPenalty(level) { return Math.floor(Quills.getAV(level) / 2); }
    static getQuillPenetration(level) { return Math.min(6, Math.floor((level - 1) / 2)); }
    static baseQuills(level) { return 300; }
    static getRegenRate(level) { return level / 4; }

    static getDescription() {
        return `Hundreds of needle-pointed quills cover your body.`;
    }

    static getLevelText(level, levelup) {
        return `${Quills.baseQuills(level)} quills
        May expel 10% of your quills in a burst around yourself ({{c|→}}${Quills.getQuillPenetration(level) + 4}{{r|♥}}1d3)
        Regenerate quills at the approximate rate of ${Quills.getRegenRate(level)} per round
        +${Quills.getAV(level)} AV as long as you retain half your quills (+${Quills.getAV(level) - Quills.getAVPenalty(level)} AV otherwise)
        Creatures attacking you in melee may impale themselves on your quills, breaking roughly 1% of them and reflecting 3% damage per quill broken.
        Cannot wear body armor
        Immune to other creatures' quills`;
    }
}

export class Regeneration extends MutationPart {

    static getRegenerationBonus(level) { return 0.1 + 0.1 * level; }
    static getRegenerationChance(level) { return level * 10; }
    static getDebuffChance(level) { return 1 + Math.floor(level / 3); }

    static getDescription() {
        return `Your wounds heal very quickly.`;
    }

    static getLevelText(level, levelup) {
        let debuffChance = Regeneration.getDebuffChance(level);
        let debuffText = level < 5 ? `minor physical debuff` : `physical debuff`;
        let decapitationText = Regeneration.getRegenerationChance(level) >= 100 ? `You cannot be decapitated\n` : ``;
        return `Your full natural healing rate applies in combat.
        +${Math.floor(100 * Regeneration.getRegenerationBonus(level))}% faster natural healing rate
        ${Regeneration.getRegenerationChance(level)}% chance to regrow a missing limb each round
        ${decapitationText}${debuffChance}% chance to remove a ${debuffText} at random each round`;
    }
}

export class SleepGasGeneration extends MutationPart {

    static getReleaseDuration(level) { return level + 2; }
    static getReleaseCooldown(level) { return 40; }

    static getDescription() {
        return `You release a burst of sleep gas around yourself.`;
    }

    static getLevelText(level, levelup) {
        return `Releases gas for ${SleepGasGeneration.getReleaseDuration(level)} rounds
        Cooldown: ${SleepGasGeneration.getReleaseCooldown(level)} rounds`;
    }
}

export class SlimeGlands extends MutationPart {

    static getDescription() {
        return `You produce a viscous slime that you can spit at things.\n\nCovers an area with slime\nRange: 8\nArea: 3x3\nCooldown: 40 rounds\nYou can walk over slime without slipping.`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class Spinnerets extends MutationPart {

    static getMoveSaveModifier(level) { return 5 + level; }
    static getDuration(level) { return 5 + level; }
    static getCooldown(level) { return 80; }

    static getDescription() {
        return `You can spin sticky silk webs.`;
    }

    static getLevelText(level, levelup) {
        let levelupText = levelup ? `\nIncreased web strength` : ``
        return `While spinning, you leave webs in  your wake as you move.${levelupText}
        Duration: ${Spinnerets.getDuration(level)} move actions
        +${Spinnerets.getMoveSaveModifier(level)} to saves vs. forced movement
        Cooldown: ${Spinnerets.getCooldown(level)} rounds
        You are immune to getting stuck.
        +300 reputation with {{w|arachnids}}`;
    }
}

export class Stinger extends MutationPart {

    static getPenetration(level) {
        if (level >= 2) return Math.min(9, Math.floor((level - 2) / 3 + 4));
        return 3;
    }
    static getCooldown(level) { return 25; }
    static getIncrement(level) { return `${level}d2`; }
    static getSave(level) { return 14 + level * 2; }
    static getDuration(level, variant) {
        switch (variant) {
            case 'confusing':
                if (level >= 3) return `2d3+${Math.min(14, Math.floor(level * 2 / 3 + 2))}`;
                return '2d3+2';
            case 'paralyzing':
                if (level >= 3) return `1d3+${Math.min(7, Math.floor(level / 3 + 1))}`;
                return '1d3+1';
            default: return '8-12';
        }
    }
    static levelText(level, variant) {
        switch (variant) {
            case 'confusing': return `Venom confuses opponents for ${Stinger.getDuration(level)} rounds`;
            case 'paralyzing': return `Venom paralyzes opponents for ${Stinger.getDuration(level)} rounds`;
            default:
                return `Venom poisons opponents for ${Stinger.getDuration(level)} rounds (damage increment ${Stinger.getIncrement(level)})`;
        }
    }
    static getDamage(level) {
        switch (level) { // Believe me, this is way better than the actual implementation
            case 1, 2, 3: return '1d6';
            case 4, 5, 6: return '1d8';
            case 7, 8, 9: return '1d10';
            case 10, 11, 12: return '1d12';
            case 13, 14, 15: return '2d6';
            case 16, 17, 18: return '2d6+1';
            default: return '2d8';
        }
    }

    static getDescription(variant) {
        let variantText = 'poisonous';
        switch (variant) {
            case 'confusing': variantText = 'confusing'; break;
            case 'paralyzing': variantText = 'paralyzing'; break;
            default: variantText = 'poisonous';
        }
        return `You bear a tail with a stinger that delivers ${variantText} venom to your enemies.`;
    }

    static getLevelText(level, levelup, variant) {
        return `20% chance on melee attack to sting your opponent ({{c|→}}${Stinger.getPenetration(level) + 4} {{r|♥}}${Stinger.getDamage(level)})
        Stinger is a long blade and can only penetrate once.
        Always sting on charge or lunge.
        Stinger applies venom on damage (only 20% chance if Stinger is your primary weapon).
        May use Sting activated ability to strike with your stinger and automatically hit and penetrate.
        Sting cooldown: ${Stinger.getCooldown(level)}
        ${Stinger.levelText(level, variant)}
        +200 reputation with {{w|arachnids}}`;
    }
}

export class ThickFur extends MutationPart {

    static getDescription() {
        return `You are covered in a thick coat of fur, which protects you from the elements.\n\n+5 Heat Resistance\n+5 Cold Resistance\n+100 reputation with {{w|apes}}, {{w|baboons}}, {{w|bears}}, and {{w|grazing hedonists}}`;
    }

    static getLevelText(level, levelup) {
        return ``;
    }
}

export class TwoHeaded extends MutationPart {

    static getReducedMentalActionCost(level) { return 15 + 5 * level; }
    static getShakeOff(level) { return 50; }

    static getDescription() {
        return `You have two heads.`;
    }

    static getLevelText(level, levelup) {
        return `Mental actions have ${TwoHeaded.getReducedMentalActionCost(level)}% lower action costs
        ${TwoHeaded.getShakeOff(level)}% chance initially and each round to shake off a negative mental status effect`;
    }
}

export class TwoHearted extends MutationPart {

    static getSprintBonus(level) { return 20 + level * 10; }
    static getToughnessBonus(level) { return 2 + Math.floor((level - 1) / 2); }

    static getDescription() {
        return `You have two hearts.`;
    }

    static getLevelText(level, levelup) {
        return `+${TwoHearted.getToughnessBonus(level)} Toughness
        You can sprint for ${TwoHearted.getSprintBonus(level)}% longer.`;
    }
}

export class Wings extends MutationPart {

    static sprintingMoveSpeedBonus(level) { return 0.1 + 0.1 * level; }
    static getJumpDistanceBonus(level) { return Math.floor(1 + level / 3); }
    static getChargeDistanceBonus(level) { return Math.floor(2 + level / 3); }
    static fallChance(level) { return 6 - level; }

    static getDescription() {
        return `You fly.`;
    }

    static getLevelText(level, levelup) {
        let mapBonusSpeed = 1.5 + 0.5 * level;
        let mapLostBonus = 36 + level * 4;
        return `You travel on the world map at ${mapBonusSpeed}x speed
        ${mapLostBonus}% reduced chance of becoming lost
        While outside, you may fly. You cannot be hit in melee by grounded creatures while flying
        ${Wings.fallChance(level)}% chance of falling clumsily to the ground
        +${Math.floor(Wings.sprintingMoveSpeedBonus(level) * 100)}% move speed while sprinting
        You can jump ${Wings.getJumpDistanceBonus(level)} square(s) farther.
        You can charge ${Wings.getChargeDistanceBonus(level)} square(s) farther.
        +300 reputation with {{w|birds}} and {{w|winged mammals}}`;
    }
}