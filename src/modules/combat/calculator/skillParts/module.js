import { SkillAddedEvent } from "../events";
import { Part } from "../parts";
import { part, skillPartModule, skillPartRegistry } from "../metadata";
import * as cudgel from "./cudgelParts";
skillPartModule(cudgel);

export class Skills extends Part {

    onAttach(host) {
        super.onAttach(host);
        SkillAddedEvent.register(host, (event) => this.handleSkillAdd(event), this.id);
    }

    handleSkillAdd(skillEvent) {
        let skillConstructor = skillPartRegistry.getConstructorFor(skillEvent.skillName);
        if (!skillConstructor) return;

        this.host.attachPart(new skillConstructor());
    }
}
part(Skills);
