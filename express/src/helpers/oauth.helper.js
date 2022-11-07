const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = {
    generateOAuthUsername: (name) => {
        const replacedUsername = name.replace(/\s+/g, '-').toLowerCase();
        const randomString = crypto.randomBytes(2).toString('hex');
        return `${replacedUsername}-${randomString}`;
    },
    generateOAuthPassword: async (email) => {
        const randomString = crypto.randomBytes(16).toString('hex');
        return await bcrypt.hash(`${email}-${randomString}`, 10);
    }
};
