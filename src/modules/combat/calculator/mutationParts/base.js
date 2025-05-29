import { Part } from '../parts';

export class MutationPart extends Part {
    variant;
    rank;
    enhancements;

    getRank(level) {
        return Math.min(this.rank + this.enhancements, this.rankCap(level));
    }

    canRank(level) {
        return this.rank < this.getMaxRank() && this.rank < this.rankCap(level);
    }

    rankCap(level) { return Math.floor(level / 2) + 1; }
    getMaxRank() { return 10; }

    static getVariants() { return []; }
    static getDescription() { return ``; }
    static getLevelText(level, levelup) { return ``; }
}