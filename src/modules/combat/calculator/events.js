class EventManager {

    creatureRegistry = {};

    registerCreature(creature) {
        let registry = this.creatureRegistry[creature.id];
        if (!registry) this.creatureRegistry[creature.id] = {};
    }

    register(creature, eventName, callback, partId) {
        this.registerCreature(creature);
        let registry = this.creatureRegistry[creature.id];
        if (!registry[eventName]) {
            registry[eventName] = {};
            this.creatureRegistry[creature.id] = registry;
        }
        let callbacks = registry[eventName];
        if (!callbacks[partId]) {
            registry[eventName][partId] = [];
            this.creatureRegistry[creature.id] = registry;
        }
        registry[eventName][partId].push(callback);
    }

    handle(creature, event) {
        let registry = this.creatureRegistry[creature.id]
        if (!registry) return;
        let callbacks = registry[event.constructor.name];
        if (callbacks === undefined) return;

        for (let partCbs in callbacks) {
            for (let callback of callbacks[partCbs])
                callback(event);
        }
    }

    deregister(creature, partId) {
        let registry = this.creatureRegistry[creature.id];
        if (!registry) return;
        for (let eventName in registry) {
            registry[eventName][partId] = undefined;
        }
    }

    deregisterObject(id) {
        let registry = this.creatureRegistry[id];
        if (!registry) return;
        this.creatureRegistry[id] = undefined;
    }
}

const eventManager = new EventManager();

export function deregisterPart(creature, part) {
    eventManager.deregister(creature, part.id);
}

export function deregisterObject(obj) {
    eventManager.deregisterObject(obj.id);
}

class BaseEvent {

    static register(host, callback, partId) {
        if (!partId) throw `No part ID supplied to ${this.name}.`
        eventManager.register(host, this.name, callback, partId);
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

export class SkillRemovedEvent extends BaseEvent {
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

export class GetItemShortDescriptionEvent extends BaseEvent {
    description = '';

    constructor() { super(); }
}

export class GetItemStatDescriptionEvent extends BaseEvent {
    description = '';

    constructor() { super(); }
}

export class GetItemFlavorDescriptionEvent extends BaseEvent {
    description = '';

    constructor() { super(); }
}