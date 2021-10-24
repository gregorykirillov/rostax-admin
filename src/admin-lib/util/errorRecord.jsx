

export class ErrorRecord {
    messages = {};

    addMessage = (key, message) => {
        if (!this.messages[key]) {
            this.messages[key] = [];
        }

        this.messages[key].push(message);
    }
}
