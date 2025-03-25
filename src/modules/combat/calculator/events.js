class EventManager {

    creatureRegistry = {};

    registerCreature(creature) {
        let registry = this.creatureRegistry[creature.id];
        if (!registry) this.creatureRegistry[creature.id] = {};
    }

    register(creature, eventName, callback, priority) {
        this.registerCreature(creature);
        let registry = this.creatureRegistry[creature.id];
        if (!registry[eventName]) {
            registry[eventName] = [[], [], [], [], []];
            this.creatureRegistry[creature.id] = registry;
        }
        registry[eventName][priority - 1].push(callback);
    }

    handle(creature, event) {
        let registry = this.creatureRegistry[creature.id]
        if (!registry) return;
        let callbacks = registry[event.constructor.name];
        if (!Array.isArray(callbacks)) return;

        for (let callbackPriorityList of callbacks)
            for (let callback of callbackPriorityList)
                callback(event);
    }
}

const eventManager = new EventManager();

class BaseEvent {
    priority;

    constructor(priority) {
        if (!priority) priority = 3;
        this.priority = priority;
    }

    static register(host, callback, priority = 3) {
        if (!priority || priority <= 0 || priority > 5) priority = 3;
        eventManager.register(host, this.name, callback, priority);
    }

    handle(creature) {
        eventManager.handle(creature, this);
    }
}

export class GetAttacksEvent extends BaseEvent {
    attacks = [];

    handle(creature) {
        super.handle(creature);
        this.attacks.sort((a, b) => {
            return a.part.isPrimary ? -1 : b.part.isPrimary ? 1 : 0;
        });
    }
}

export class AttackEvent extends BaseEvent {
    attack;

    constructor(attack) { super(); this.attack = attack; }
}

export class SpecialEffectEvent extends BaseEvent {
    chance = 0;

    constructor(chance = 0) { super(); this.chance = chance; }
}

export class SkillAddedEvent extends BaseEvent {
    skillName;

    constructor(skillName) { super(); this.skillName = skillName; }
}

export class ActivatedActionEvent extends BaseEvent {
    actionId;
    details;

    constructor(actionId, details) { super(); this.actionId = actionId; this.details = details; }
}

export class OffhandChanceEvent extends BaseEvent {
    chance;
    multiplier = 1;
    finalChance = -1;

    constructor(chance = 0) { super(); this.chance = 15 + chance; }

    handle(event) {
        super.handle(event);
        this.chance *= this.multiplier;
        this.chance = this.finalChance > 0 ? this.finalChance : this.chance;
    }
}

export class GetAttackCountEvent extends BaseEvent {
    attack;
    isPrimary;
    attacks = [];

    constructor(attack, isPrimary = false) { super(); this.attack = attack; this.isPrimary = isPrimary; this.attacks.push(attack); }
}
