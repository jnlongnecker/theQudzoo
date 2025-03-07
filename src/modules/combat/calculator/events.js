class EventManager {

    registry = {};

    register(eventName, callback, priority) {
        if (!this.registry[eventName]) {
            this.registry[eventName] = [[], [], [], [], []];
        }
        this.registry[eventName][priority - 1].push(callback);
    }

    handle(event) {
        let callbacks = this.registry[event.name];
        if (!Array.isArray(callbacks)) return;

        for (let callbackPriorityList of callbacks)
            for (let callback of callbackPriorityList)
                callback(event);
    }
}

const eventManager = new EventManager();

class BaseEvent {
    name;

    constructor(priority) {
        if (!priority) priority = 3;
        this.priority = priority;
    }

    fire() {
        eventManager.handle(this);
    }

    static register(callback, priority = 3) {
        if (!priority || priority <= 0 || priority > 5) priority = 3;
        console.log('registering for ' + this.name);
        eventManager.register(this.name, callback, priority);
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