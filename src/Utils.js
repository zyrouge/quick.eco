const isPositive = (number) => (!!(number >= 0));
const escapeSpace = (text, char = "-") => (text.replace(new RegExp(" ", "g"), char));
const defaults = {
    tables: {
        global: "economy-global-table",
        guild: "economy-guild-table"
    },
    jobs: [
        "Doctor",
        "Pornstar",
        "Dishwasher",
        "Memer",
        "Shit eater",
        "YouTuber",
        "Developer",
        "Musician",
        "Professional sleeper",
        "Teacher",
        "Scientist",
        "Baby maker",
        "Twitch Streamer",
        "Twitch Pornstar",
        "StickAnimator",
        "Strict Math Teacher",
        "Tik Toker",
        "Miner", 
        "Bartender", 
        "Cashier", 
        "Cleaner", 
        "Drugdealer",
        "Assistant", 
        "Nurse",
        "Accountants", 
        "Security Guard", 
        "Sheriff", 
        "Lawyer",
        "Electrician", 
        "Singer", 
        "Dancer"
    ]
}

module.exports = {
    isPositive,
    escapeSpace,
    defaults
}