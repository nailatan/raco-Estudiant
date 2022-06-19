const { buildSchema } = require("graphql");

var userSchema = buildSchema(`
type User {
    firstname: String,
    middlename: String,
    lastname: String
}, 
    type Query {
            hello: String
            user: User
        }
`);

module.exports = userSchema;
