const Enmap = require("enmap");
const Utils = require("./Utils");

module.exports = class User {
    constructor(options = {}) {
        if(typeof options !== "object") throw new TypeError(`"options" must be a type of "object"`);

        if(!options.userID || typeof options.userID !== "string") throw new TypeError(`"options.userID" must be a type of "string" but received ${typeof options.userID}`);
        this.userID = options.userID;        

        if(options.guildID && typeof options.guildID !== "string") throw new TypeError(`"options.guildID" must be a type of "string but received ${typeof options.guildID}"`);
        this.guildID = options.guildID;
        this.guild = !!this.guildID;

        if(!options.database || !(options.database instanceof Enmap)) throw new TypeError(`"options.database" must be a instance of "enmap"`);
        this.Database = options.database;
    }

    addBalance(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        const before = this.balance;
        const after = before + amount;
        try {
            this.setBalance(after);
            return this;
        } catch(error) {
            throw error;
        }
    }

    subtractBalance(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        const before = this.balance;
        const after = before - amount;
        if(!Utils.isPositive(after)) throw new TypeError(`"amount" cannot be a "greater" than "balance"`);
        try {
            this.setBalance(after);
            return this;
        } catch(error) {
            throw error;
        }
    }

    resetBalance() {
        try {
            this.setBalance(0);
            return this;
        } catch(error) {
            throw error;
        }
    }

    setBalance(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        try {
            this.Database.set(this.balanceKey, amount);
            return this;
        } catch(error) {
            throw error;
        }
    }

    addBank(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        const before = this.bank;
        const after = before + amount;
        try {
            this.setBank(after);
            return this;
        } catch(error) {
            throw error;
        }
    }

    subtractBank(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        const before = this.bank;
        const after = before - amount;
        if(!Utils.isPositive(after)) throw new TypeError(`"amount" cannot be a "greater" than "balance"`);
        try {
            this.setBank(after);
            return this;
        } catch(error) {
            throw error;
        }
    }

    resetBank() {
        try {
            this.setBank(0);
            return this;
        } catch(error) {
            throw error;
        }
    }

    setBank(amount) {
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        try {
            this.Database.set(this.bankKey, amount);
            return this;
        } catch(error) {
            throw error;
        }
    }

    reset() {
        try {
            this.setBalance(0);
            this.setBank(0);
            return this;
        } catch(error) {
            throw error;
        }
    }

    get profile() {
        return ({
            balance: this.balance,
            bank: this.bank
        });
    }

    get balance() {
        return (this.Database.get(this.balanceKey) || 0);
    }

    get bank() {
        return (this.Database.get(`bank_${this.bankKey}`) || 0);
    }

    get key() {
        if(this.guild) return (`${this.guildID}_${this.userID}`);
        else return (`${this.userID}`);
    }

    get balanceKey() {
        return (`balance_${this.key}`);
    }

    get bankKey() {
        return (`bank_${this.key}`);
    }
}