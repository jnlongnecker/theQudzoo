class ComponentEventHandler {
    registry;

    constructor() {
        this.registry = {};
    }

    register(eventName, callback) {
        let callbackList = this.registry[eventName];
        if (!callbackList) callbackList = [];

        callbackList.push(callback);
        this.registry[eventName] = callbackList;
    }

    fire(eventName, eventDetails) {
        let callbackList = this.registry[eventName];
        if (!callbackList) return;

        for (let cb of callbackList) cb(eventDetails);
    }
}

const handler = new ComponentEventHandler();

export function fire(eventName, eventDetails) {
    handler.fire(eventName, eventDetails);
}

export function register(eventName, callback) {
    handler.register(eventName, callback);
}