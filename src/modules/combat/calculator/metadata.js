import { Part } from "./parts";

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

export function skillPart(...targets) {
    skillPartRegistry.register(targets);
    partRegistry.register(targets);
};

export function skillPartModule(module) {
    for (let key in module) {
        let potentialPart = module[key];
        if (!Part.prototype.isPrototypeOf(potentialPart.prototype)) continue;
        skillPart(potentialPart);
    }
}

export function part(...targets) {
    partRegistry.register(targets);
}
