const { buildSchema } = require("graphql");

var studentSchema = buildSchema(`
input StudentInput {
    firstName: String!,
    middleName: String!,
    lastName: String
    birthDate: String,
    adress: String,
    phone:String,
    mobile:String,
    email: String!,
    emailStudent:String!,
    cip: String,
    admissionDate: String!
}

type Student {
    idstudent: String!,
    firstname: String!,
    middlename: String!,
    lastname: String
    birthdate: String,
    adress: String,
    phone:String,
    mobile:String,
    email: String!,
    emailstudent:String!,
    cip: String,
    admissiondate: String!
}
    type Query {
            hello: String,
            student(idStudent: String): [Student]
        }
    type Mutation {
            createStudent (student: StudentInput): Student
            deleteStudent( idStudent: String) : Student
        }
`);

module.exports = studentSchema;
