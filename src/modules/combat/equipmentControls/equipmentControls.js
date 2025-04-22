import { api, LightningElement } from "lwc";
import { GetItemShortDescriptionEvent, GetItemStatDescriptionEvent, GetItemFlavorDescriptionEvent } from "combat/calculator";
import { getPreviews, getDetails } from "c/api";
import { fire } from "c/componentEvents";
import { EquipItemAction, UnequipAction, SetPrimaryAction } from "combat/actions";

export default class EquipmentControls extends LightningElement {
    @api character;

    items = [];
    selectedSlot;
    selectedItem;
    selectedStats;
    selected = 5;

    get equipmentList() {
        if (!this.character) return [];

        let baseList = this.character.anatomy.getLimbArray();
        let id = 0;
        return baseList.map(limb => {
            let desc = '-';
            let src = false;
            let imageClass = 'item-image';
            let lineClass = 'limb-line';
            if (limb.isPrimary) lineClass += ' primary';
            if (limb.item) {
                desc = limb.item.displayName + limb.item.fire(new GetItemShortDescriptionEvent()).description;
                src = limb.item.token;
                if (this.character.anatomy.amFirstEquipped(limb)) {
                    imageClass += ' full';
                } else {
                    imageClass += ' faded';
                }
            } else if (limb.defaultBehavior) {
                desc = limb.defaultBehavior.displayName + limb.defaultBehavior.fire(new GetItemShortDescriptionEvent()).description;
                src = limb.defaultBehavior.token;
                imageClass += ' faded';
            }
            if (this.selected === id) {
                lineClass += ' selected';
                this.selectedItem = limb.item;
                this.selectedSlot = limb.slot;
                if (limb.item) {
                    this.selectedStats = limb.item.fire(new GetItemStatDescriptionEvent()).description;
                }
            }

            return {
                limbName: limb.getMenuName(),
                src, desc, imageClass, lineClass,
                id: id++
            }
        });
    }

    renderedCallback() {
        if (!this.typeahead) {
            this.typeahead = this.template.querySelector('input-typeahead');
        }
    }

    handleLimbSelect(event) {
        let id = event.currentTarget.dataset.identifier;
        this.typeahead.clear();
        this.selected = Number.parseInt(id);
    }

    async handleSelection(event) {
        let itemName = event.detail.name;
        let query = `name=${itemName}`;
        let itemDetails = (await getDetails(query, 'items')).result;
        fire('actionevent', { detail: new EquipItemAction(itemDetails, this.selected) });
    }

    handleFilterChange(event) {
        let newFilter = event.detail;
        this.pullItemPreviews(newFilter);
    }

    async pullItemPreviews(term) {
        let query = `term=${term}&slot=${this.selectedSlot}`;
        this.items = (await getPreviews(query, 'items')).result.map(result => {
            return {
                primary: result.item.cleanedName,
                secondary: result.item.factions,
                src: result.item.src,
                name: result.item.name,
            }
        });
    }

    unequipSelected() {
        fire('actionevent', { detail: new UnequipAction(this.selectedItem) });
    }

    setPrimaryLimb() {
        fire('actionevent', { detail: new SetPrimaryAction(this.selected) });
    }
}