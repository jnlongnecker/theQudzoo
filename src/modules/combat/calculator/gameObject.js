export class Tag {
    name;
    value;

    constructor({ name = '', value = '' } = {}) {
        this.name = name;
        this.value = value;
    }
}

export class GameObject {
    parent;
    children = [];
    parts = [];
    tags = [];
    id;

    constructor() {
        this.id = crypto.randomUUID();
    }

    fire(event) {
        for (let child of this.children) {
            child.fire(event);
        }

        event.handle(this);

        if (this.parent) {
            this.parent.fire(event);
        }
        return event;
    }

    getPart(partName) {
        for (let part of this.parts) {
            if (part.constructor.name === partName) return part;
        }
        return null;
    }

    addChild(gameObject) {
        gameObject.parent = this;
        if (this.children.find(item => item.id === gameObject.id)) return;

        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        let childId = gameObject.id;
        this.children = this.children.filter(item => item.id !== childId);
        gameObject.parent = null;
    }

    setParent(gameObject) {
        gameObject.addChild(this);
    }

    removeParent(gameObject) {
        gameObject.removeChild(this);
    }

    attachPart(part) {
        this.parts.push(part);
        part.onAttach(this);
    }

    detachPart(part) {
        this.parts = this.parts.filter(item => item !== part);
        part.onDetach(this);
    }

    addTag(tag) {
        if (this.getTag(tag)) return;
        this.tags.push(tag);
    }

    removeTag(tag) {
        this.tags = this.tags.filter(existingTag => existingTag.name !== tag);
    }

    getTag(tag) {
        return this.tags.find(item => item.name === tag)
    }
}