const Enmap = require("enmap");
const User = require("./User");
const Utils = require("./Utils");

module.exports = class Manager {
    constructor(options = {}) {
        if(typeof options !== "object") throw new TypeError(`"options" must be a type of "object"`);

        if(typeof options.guild !== "boolean") throw new TypeError(`"options.guild" must be a type of "boolean"`);
        this.guild = options.guild || false;

        if(options.tableName && typeof options.tableName !== "string") throw new TypeError(`"options.tableName" must be a type of "string"`);
        this._tableName = options.tableName ? Utils.escapeSpace(options.tableName) : (this.guild ? Utils.defaults.tables.guild : Utils.defaults.tables.global);

        this.Database = new Enmap({ name: this._tableName, autoFetch: true, fetchAll: !!options.fetchAll || true });
    }

    get(userID, guildID) {
        if(!userID || typeof userID !== "string") throw new TypeError(`"userID" must be a type of "string" but received ${typeof userID}`);
        if(this.guild && (!guildID || typeof guildID !== "string")) throw new TypeError(`"guildID" must be a type of "string" but received ${typeof guildID}`);
        return (new User({ userID, guildID, database: this.Database }));
    }

    transfer(from, to, amount, guildID) {
        if(!from || typeof from !== "string") throw new TypeError(`"from" must be a type of "string" but received ${typeof from}`);
        if(!to || typeof to !== "string") throw new TypeError(`"to" must be a type of "string" but received ${typeof to}`);
        if(!amount || typeof amount !== "number") throw new TypeError(`"amount" must be a type of "number" but received ${typeof amount}`);
        if(!Utils.isPositive(amount)) throw new TypeError(`"amount" must be a "positive" number`);
        if(this.guild && (!guildID || typeof guildID !== "string")) throw new TypeError(`"guildID" must be a type of "string" but received ${typeof guildID}`);
        try {
            const fromUser = this.get(from, guildID);
            const toUser = this.get(to, guildID);
            fromUser.subtractBalance(amount);
            toUser.addBalance(amount);
            return true;
        } catch(error) {
            throw error;
        }
    }

    leaderboard(guildID) {
        if(this.guild && (!guildID || typeof guildID !== "string")) throw new TypeError(`"guildID" must be a type of "string" but received ${typeof guildID}`);
        const allData = Object.entries(this.Database.fetchEverything());
        const filteredData = allData.filter(x => (x[0].startsWith(`balance_${this.guild ? `${guildID}_` : ""}`) && x[1]));
        const objectData = filteredData.map(x => { return { userID: x[0], balance: x[1] } });
        const sortedData = objectData.sort((a, b) => (b.balance - a.balance));
        return sortedData;
    }

    reset() {
        this.Database.deleteAll();
        return this;
    }
}