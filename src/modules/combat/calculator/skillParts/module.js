import { SkillAddedEvent, SkillRemovedEvent } from "../events";
import { Part } from "../parts";
import { part, skillPartModule, skillPartRegistry } from "../metadata";
import * as cudgel from "./cudgelParts";
skillPartModule(cudgel);

export class Skills extends Part {

    skillParts = {}

    onAttach(host) {
        super.onAttach(host);
        SkillAddedEvent.register(host, (event) => this.handleSkillAdd(event), this.id);
        SkillRemovedEvent.register(host, (event) => this.handleSkillRemove(event), this.id);
    }

    handleSkillAdd(skillEvent) {
        let skillConstructor = skillPartRegistry.getConstructorFor(skillEvent.skillName);
        if (!skillConstructor) return;

        let skillPart = new skillConstructor();
        this.skillParts[skillEvent.skillName] = skillPart;
        this.host.attachPart(skillPart);
    }

    handleSkillRemove(skillEvent) {
        let skillPart = this.skillParts[skillEvent.skillName];
        if (!skillPart) return;

        this.skillParts[skillEvent.skillName] = undefined;
        this.host.detachPart(skillPart);
    }
}
part(Skills);
