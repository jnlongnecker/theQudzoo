import { SkillAddedEvent } from "../events.js";
import { Cudgel_Bludgeon } from "./cudgelParts.js";
import { Part } from "../parts.js";

const skillPartConstructors = {
    'Cudgel_Bludgeon': Cudgel_Bludgeon,
}

class SkillerPart extends Part {

    onAttach(host) {
        super.onAttach(host);
        SkillAddedEvent.register(host, (event) => this.handleSkillAdd(event));
    }

    handleSkillAdd(skillEvent) {
        let skillConstructor = skillPartConstructors[skillEvent.skillName];
        if (!skillConstructor) return;

        this.host.attachPart(new skillConstructor());
    }
}

export { SkillerPart };