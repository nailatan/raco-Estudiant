const { buildSchema } = require("graphql");

var studentSchema = buildSchema(`
type Student {
    idstudent: String!,
    firstname: String,
    middlename: String,
    lastname: String
    birthdate: String,
    adress: String,
    phone:String,
    mobile:String,
    email: String,
    emailstudent:String,
    cip: String,
    admissiondate: String
}, 
    type Query {
            hello: String
            student: [Student]
        }
`);

module.exports = studentSchema;
