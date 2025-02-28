import { registerDecorators as _registerDecorators2, registerDecorators as _registerDecorators } from "lwc";
import { random } from "./rolls";
import { SpecialEffectEvent } from "./events";
class WeaponEffect {
  constructor() {
    this.activated = false;
  }
  onHit() {
    return {
      physical: 0
    };
  }
  onPenetrate() {
    return {
      physical: 0
    };
  }
}
_registerDecorators(WeaponEffect, {
  fields: ["activated"]
});
class BludgeonDaze extends WeaponEffect {
  constructor(...args) {
    super(...args);
    this.chance = 50;
  }
  onHit(attack, defender) {
    let chanceEvent = new SpecialEffectEvent();
    chanceEvent.chance = this.chance;
    chanceEvent.fire();
    if (random(1, 100) >= this.chance) return super.onHit();
    this.activated = true;
    let daze = defender.effects.findIndex(effect => effect.name === 'daze');
    if (daze >= 0) {
      defender.effects.splice(daze, 1);
      defender.effects.push(new StunEffect(1));
    } else {
      defender.effects.push(new DazeEffect(random(3, 4)));
    }
    return super.onHit();
  }
}
_registerDecorators2(BludgeonDaze, {
  fields: ["chance"]
});
export { BludgeonDaze };