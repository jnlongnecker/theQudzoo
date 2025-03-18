import { SkillAddedEvent } from "../events";
import { Part } from "../parts";
import { skillPartModule, skillPartRegistry } from "../metadata";
import * as cudgel from "./cudgelParts";
skillPartModule(cudgel);

class SkillerPart extends Part {

    onAttach(host) {
        super.onAttach(host);
        SkillAddedEvent.register(host, (event) => this.handleSkillAdd(event));
    }

    handleSkillAdd(skillEvent) {
        let skillConstructor = skillPartRegistry.getConstructorFor(skillEvent.skillName);
        if (!skillConstructor) return;

        this.host.attachPart(new skillConstructor());
    }
}

export { SkillerPart };