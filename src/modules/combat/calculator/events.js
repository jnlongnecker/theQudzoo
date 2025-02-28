class EventManager {

    registry = {};

    register(eventName, callback) {
        if (!this.registry[eventName]) {
            this.registry[eventName] = [];
        }
        this.registry[eventName].push(callback);
    }

    handle(event) {
        let callbacks = this.registry[event.name];
        if (!Array.isArray(callbacks)) return;

        for (let callback of callbacks)
            callback(event);
    }
}

const eventManager = new EventManager();

class BaseEvent {
    name;

    fire() {
        eventManager.handle(this);
    }

    static register(callback) {
        console.log('registering for ' + this.name);
        eventManager.register(this.name, callback);
    }
}

class AttackCountEvent extends BaseEvent {
    attacks = [];
    isPrimary = false;

    constructor() { super(); this.name = 'AttackCountEvent'; }
}

class AttackEvent extends BaseEvent {
    attack;

    constructor() { super(); this.name = 'AttackEvent'; }
}

class SpecialEffectEvent extends BaseEvent {
    chance = 0;

    constructor() { super(); this.name = 'SpecialEffectEvent'; }
}

export { AttackCountEvent, AttackEvent, SpecialEffectEvent };