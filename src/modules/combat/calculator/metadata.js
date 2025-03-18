import { Part } from "./parts";
import { SkillPart } from "./skillParts/base";

class PartRegistry {
    partConstructors = [];

    getConstructorFor(partName) {
        let part = this.partConstructors.find(con => {
            return con.name === partName;
        });
        if (!part) return null;
        return part;
    }

    register(parts) {
        for (let part of parts) {
            this.partConstructors.push(part);
        }
    }
}

export let skillPartRegistry = new PartRegistry();
export let partRegistry = new PartRegistry();
export let mutationPartRegistry = new PartRegistry();
export let cyberneticPartRegistry = new PartRegistry();

export function skillPart(...targets) {
    skillPartRegistry.register(targets);
};

export function part(...targets) {
    partRegistry.register(targets);
}

export function mutationPart(...targets) {
    mutationPartRegistry.register(targets);
}

export function cyberneticPart(...targets) {
    cyberneticPartRegistry.register(targets);
}

export function skillPartModule(module) {
    for (let key in module) {
        let potentialPart = module[key];
        if (!SkillPart.prototype.isPrototypeOf(potentialPart.prototype)) continue;
        skillPart(potentialPart);
    }
}

export function mutationPartModule(module) {
    for (let key in module) {
        let potentialPart = module[key];
        if (!Part.prototype.isPrototypeOf(potentialPart.prototype)) continue;
        skillPart(potentialPart);
    }
}

export function cyberneticPartModule(module) {
    for (let key in module) {
        let potentialPart = module[key];
        if (!Part.prototype.isPrototypeOf(potentialPart.prototype)) continue;
        skillPart(potentialPart);
    }
}
