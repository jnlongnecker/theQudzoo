import { LightningElement, api, track } from "lwc";
import { AttributeChangeAction, RandomizeAttributesAction, ResetAttributesAction } from "combat/actions";

export default class AttributeControls extends LightningElement {

    _mode = 'level';

    @api get mode() { return this._mode; }
    set mode(val) {
        this._mode = val;
        this.recalculateDisplayTotals();
    }

    level = 1;

    get isFreeMode() {
        return this.mode !== 'level';
    }

    get showDecrease() {
        return this.isFreeMode || this.level == 1;
    }

    get showIncrease() {
        return this.isFreeMode || this.points > 0;
    }

    get showButtons() {
        return this.level == 1;
    }

    @api
    get creature() { }

    set creature(value) {
        if (value == undefined) return;
        console.log('setting attributes');
        let creature = value.creature;
        let stats = creature.stats;
        this.attributes = this.attributes.map(item => {
            switch (item.name) {
                case 'Strength':
                    item.total = stats.Strength.value;
                    item.displayTotal = stats.Strength.total;
                    break;
                case 'Agility':
                    item.total = stats.Agility.value;
                    item.displayTotal = stats.Agility.total;
                    break;
                case 'Toughness':
                    item.total = stats.Toughness.value;
                    item.displayTotal = stats.Toughness.total;
                    break;
                case 'Intelligence':
                    item.total = stats.Intelligence.value;
                    item.displayTotal = stats.Intelligence.total;
                    break;
                case 'Willpower':
                    item.total = stats.Willpower.value;
                    item.displayTotal = stats.Willpower.total;
                    break;
                case 'Ego':
                    item.total = stats.Ego.value;
                    item.displayTotal = stats.Ego.total;
                    break;
            };
            return item;
        });
        this.level = Math.max(1, creature.level);
        let leveledPointsAvailable = creature.attributeExpenditure.leveledPoints - creature.attributeExpenditure.leveledPointsUsed;
        let freePointsAvailable = creature.attributeExpenditure.freePoints - creature.attributeExpenditure.freePointsUsed;
        this.points = this.level > 1 ? leveledPointsAvailable : freePointsAvailable;
        this.maxPoints = this.level > 1 ? creature.attributeExpenditure.leveledPoints : creature.attributeExpenditure.freePoints;
        this.min = creature.attributeExpenditure.minTotal;
        this.recalculateDisplayTotals();
    }

    @track
    modifiers;

    points = 44;
    maxPoints = 44;
    min = 10;

    @track
    attributes = [
        {
            name: "Strength",
            class: "strength holder",
            classModifier: "total",
            abbreviation: "STR",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        },
        {
            name: "Agility",
            class: "agility holder",
            classModifier: "total",
            abbreviation: "AGI",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        },
        {
            name: "Toughness",
            class: "toughness holder",
            classModifier: "total",
            abbreviation: "TOU",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        },
        {
            name: "Intelligence",
            class: "intelligence holder",
            classModifier: "total",
            abbreviation: "INT",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        },
        {
            name: "Willpower",
            class: "willpower holder",
            classModifier: "total",
            abbreviation: "WIL",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        },
        {
            name: "Ego",
            class: "ego holder",
            classModifier: "total",
            abbreviation: "EGO",
            total: 10,
            displayTotal: 10,
            modifier: -3,
            cost: 1,
        }
    ]

    handleClick(event) {
        let target = event.target;
        if (target.innerText !== "+" && target.innerText !== "-") return;

        let index = event.currentTarget.getAttribute("index");
        if (target.innerText === "+") {
            return this.incrementAttribute(index);
        }
        return this.decrementAttribute(index);
    }

    incrementAttribute(attrIndex) {
        let attribute = this.attributes[attrIndex];
        let leveledPoint = this.level > 1;
        let cost = leveledPoint ? 1 : attribute.cost;

        if (this.points < cost && !this.isFreeMode) return;
        if (this.level == 1 && attribute.total == 24 && !this.isFreeMode)
            return;


        let action = new AttributeChangeAction(attribute.name.toLowerCase(), cost, 1, leveledPoint, this.mode);

        let evt = new CustomEvent("actionattributechange", { detail: action, bubbles: true, composed: true });
        this.dispatchEvent(evt);
    }

    decrementAttribute(attrIndex) {
        let attribute = this.attributes[attrIndex];
        let leveledPoint = this.level > 1;
        let cost = leveledPoint ? 1 : attribute.total >= 19 ? 2 : 1;

        if (this.points == this.maxPoints && !this.isFreeMode) { console.log("At max points"); return;}
        if (attribute.total == this.min && !this.isFreeMode) { console.log("Can't go lower"); return;}


        let action = new AttributeChangeAction(attribute.name.toLowerCase(), -cost, -1, leveledPoint, this.mode);

        let evt = new CustomEvent("actionattributechange", { detail: action, bubbles: true, composed: true });
        this.dispatchEvent(evt);
    }

    recalculateDisplayTotals() {
        if (!this.modifiers) {
            this.modifiers = {
                Strength: 0,
                Agility: 0,
                Toughness: 0,
                Willpower: 0,
                Intelligence: 0,
                Ego: 0
            }
        }

        for (let attribute of this.attributes) {
            let modifier = this.modifiers[attribute.name];
            if (modifier > 0) {
                attribute.classModifier = "enhanced";
            }
            else if (modifier < 0) {
                attribute.classModifier = "reduced";
            }
            else {
                attribute.classModifier = "total";
            }
            attribute.displayTotal = attribute.total + modifier;
            attribute.cost = attribute.total >= 18 ? 2 : 1;
            if (this.level > 1) attribute.cost = 1;
            if (this.isFreeMode) attribute.cost = 0;
            attribute.modifier = Math.floor((attribute.displayTotal - 16) / 2);
        }
    }

    resetChanges() {
        let action = new ResetAttributesAction();
        this.dispatchEvent(new CustomEvent("actionattributereset", { detail: action, bubbles: true, composed: true }));
    }

    randomizeChanges() {
        let action = new RandomizeAttributesAction();
        this.dispatchEvent(new CustomEvent("actionattributerandomize", { detail: action, bubbles: true, composed: true }));
    }
}