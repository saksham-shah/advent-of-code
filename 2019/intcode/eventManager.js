module.exports = (obj) => new EventManager(obj);

class EventManager {
    constructor(obj) {
        this.events = new Map();
        this.obj = obj;
    }

    on(eventName, handler) {
        this.events.set(eventName, handler);
    }

    emit(eventName, data) {
        if (this.events.has(eventName)) {
            return this.events.get(eventName)(data, this.obj);
        }
    }
}