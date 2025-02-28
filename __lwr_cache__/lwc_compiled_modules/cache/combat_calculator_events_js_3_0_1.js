import { registerDecorators as _registerDecorators5, registerDecorators as _registerDecorators4, registerDecorators as _registerDecorators3, registerDecorators as _registerDecorators2, registerDecorators as _registerDecorators } from "lwc";
class EventManager {
  constructor() {
    this.registry = {};
  }
  register(eventName, callback) {
    if (!this.registry[eventName]) {
      this.registry[eventName] = [];
    }
    this.registry[eventName].push(callback);
  }
  handle(event) {
    let callbacks = this.registry[event.name];
    if (!Array.isArray(callbacks)) return;
    for (let callback of callbacks) callback(event);
  }
}
_registerDecorators(EventManager, {
  fields: ["registry"]
});
const eventManager = new EventManager();
class BaseEvent {
  constructor() {
    this.name = void 0;
  }
  fire() {
    eventManager.handle(this);
  }
  static register(callback) {
    console.log('registering for ' + this.name);
    eventManager.register(this.name, callback);
  }
}
_registerDecorators2(BaseEvent, {
  fields: ["name"]
});
class AttackCountEvent extends BaseEvent {
  constructor() {
    super();
    this.attacks = [];
    this.isPrimary = false;
    this.name = 'AttackCountEvent';
  }
}
_registerDecorators3(AttackCountEvent, {
  fields: ["attacks", "isPrimary"]
});
class AttackEvent extends BaseEvent {
  constructor() {
    super();
    this.attack = void 0;
    this.name = 'AttackEvent';
  }
}
_registerDecorators4(AttackEvent, {
  fields: ["attack"]
});
class SpecialEffectEvent extends BaseEvent {
  constructor() {
    super();
    this.chance = 0;
    this.name = 'SpecialEffectEvent';
  }
}
_registerDecorators5(SpecialEffectEvent, {
  fields: ["chance"]
});
export { AttackCountEvent, AttackEvent, SpecialEffectEvent };