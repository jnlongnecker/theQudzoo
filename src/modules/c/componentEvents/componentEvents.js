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
        if (!callbackList) return true;

        let result = true;
        for (let cb of callbackList) {
            let singleResult = cb(eventDetails);
            if (singleResult !== undefined) result = result && singleResult;
        }
        return result;
    }
}

const handler = new ComponentEventHandler();

export function fire(eventName, eventDetails) {
    return handler.fire(eventName, eventDetails);
}

export function register(eventName, callback) {
    handler.register(eventName, callback);
}