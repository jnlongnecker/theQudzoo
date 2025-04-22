import { deregisterObject } from "./events";
import { partRegistry } from "./metadata";

export class Tag {
    name;
    value;

    constructor({ Name = '', Value = '' } = {}) {
        this.name = Name;
        this.value = Value;
    }
}

export class GameObject {
    parent;
    children = [];
    parts = [];
    tags = [];
    id;

    constructor() {
        this.id = crypto.randomUUID();
    }

    get slots() {
        let slotTag = this.getTag('UsesSlots');
        let baseSlots = slotTag ? slotTag.value.split(',').length : 1;
        let physics = this.getPart('Physics');
        return (physics?.usesTwoSlots ? 2 : 1) * baseSlots;
    }

    get usesSlots() {
        let slot = 'Hand';
        let wep = this.getPart('MeleeWeapon');
        let armor = this.getPart('Armor');
        let slotTag = this.getTag('UsesSlots');
        if (slotTag) slot = slotTag.value;
        else if (armor) slot = armor.slot;
        else if (wep && wep.Slot) slot = wep.Slot;

        let physics = this.getPart('Physics');

        return (physics?.usesTwoSlots ? `${slot},${slot}` : slot);
    }

    fire(event) {
        event.handle(this);

        if (this.parent) {
            this.parent.fire(event);
        }
        return event;
    }

    getPart(partName) {
        for (let part of this.parts) {
            if (part.constructor.name === partName) return part;
        }
        return null;
    }

    addChild(gameObject) {
        gameObject.parent = this;
        if (this.children.find(item => item.id === gameObject.id)) return;

        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        let childId = gameObject.id;
        this.children = this.children.filter(item => item.id !== childId);
        gameObject.parent = null;
    }

    setParent(gameObject) {
        gameObject.addChild(this);
    }

    removeParent(gameObject) {
        gameObject.removeChild(this);
    }

    attachPart(part) {
        this.parts.push(part);
        part.onAttach(this);
    }

    detachPart(part) {
        this.parts = this.parts.filter(item => item !== part);
        part.onDetach(this);
    }

    attachPartFromObj(partObj) {
        let partConstructor = partRegistry.getConstructorFor(partObj.Name);
        if (partConstructor !== null) {
            this.attachPart(new partConstructor(partObj));
        } else {
            console.log(`No part for ${partObj.Name}`);
        }
    }

    addTag(tag) {
        tag = new Tag(tag);
        if (this.getTag(tag)) return;
        this.tags.push(tag);
    }

    removeTag(tag) {
        this.tags = this.tags.filter(existingTag => existingTag.name !== tag);
    }

    getTag(tag) {
        return this.tags.find(item => item.name === tag)
    }

    hasTag(tag) {
        return this.getTag(tag) !== undefined;
    }

    hasPart(part) {
        return this.getPart(part) !== undefined;
    }

    destroy() {
        deregisterObject(this);
    }
}