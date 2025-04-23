import { Part } from "./parts";
import { part } from "./metadata";

export class Mod {
    tables;
    part;
}

export class ModGigantic extends Part { }
part(ModGigantic);