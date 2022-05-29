DROP TABLE IF EXISTS evaluationMark;
DROP TABLE IF EXISTS evaluation;
DROP TABLE IF EXISTS examMark;
DROP TABLE IF EXISTS exam;
DROP TABLE IF EXISTS schedule;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS academicCourse;
DROP TABLE IF EXISTS academicYear;
DROP TABLE IF EXISTS teaching;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS area;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS cycle;
DROP TABLE IF EXISTS stage;
DROP TABLE IF EXISTS person;

CREATE TABLE IF NOT EXISTS person (
    idPerson INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY key,
    firstName VARCHAR(50) NOT NULL,
    middleName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50),
    birthDate TIMESTAMP NOT NULL,
    adress VARCHAR(150),
    phone VARCHAR(50),
    mobile VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS student (
    idStudent INTEGER PRIMARY key,
    emailStudent VARCHAR(100),
    cip VARCHAR(11),
    admissionDate TIMESTAMP NOT NULL,
    FOREIGN key (idStudent) REFERENCES person(idPerson)
);

CREATE TABLE IF NOT EXISTS teacher (
    idTeacher INTEGER PRIMARY key,
    emailTeacher VARCHAR(100),
    admissionDate TIMESTAMP NOT NULL,
    FOREIGN key (idTeacher) REFERENCES person(idPerson)
);

CREATE TABLE IF NOT EXISTS stage (
    idStatge INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    mandatory BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS cycle (
    idCycle INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    idStatge INTEGER REFERENCES stage(idStatge)
);


CREATE TABLE IF NOT EXISTS course (
    idCourse INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    idCycle INTEGER REFERENCES cycle(idCycle)
);

CREATE TABLE IF NOT EXISTS academicYear (
    idAcademicYear INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) not null UNIQUE,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    finish BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS area (
    idArea INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS subject (
    idSubject INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    idArea INTEGER REFERENCES area(idArea),
    optative BOOLEAN NOT NULL DEFAULT false,
    complementary BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS evaluation (
    idEvaluation INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear),
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP NOT NULL,
    active BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS academicCourse (
    idAcademicCourse INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) not null UNIQUE,
    idAcademicYear INTEGER NOT NULL,
    idCourse INTEGER NOT NULL,
    UNIQUE(idAcademicYear, idCourse),
    FOREIGN KEY(idAcademicYear) REFERENCES academicYear(idAcademicYear),
    FOREIGN KEY (idCourse) REFERENCES course(idCourse)
);

CREATE TABLE IF NOT EXISTS class (
    idClass INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    idAcademicCourse INTEGER REFERENCES academicCourse(idAcademicCourse),
    idTutor INTEGER REFERENCES teacher(idTeacher)
);

CREATE TABLE IF NOT EXISTS attendance (
    idAttendance INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    idClass INTEGER NOT NULL,
    idStudent INTEGER NOT NULL,
    startDate TIMESTAMP NOT NULL,
    endDate TIMESTAMP, 
    FOREIGN KEY (idClass) REFERENCES class(idClass),
    FOREIGN KEY (idStudent) REFERENCES student(idStudent),
    UNIQUE (idClass, idStudent)  
);

CREATE TABLE IF NOT EXISTS evaluationMark (
    idEvaluationMark INTEGER GENERATED ALWAYS as IDENTITY PRIMARY KEY,
    idAttendance INTEGER REFERENCES attendance(idAttendance),
    idEvaluation INTEGER REFERENCES evaluation(idEvaluation),
    mark INTEGER NOT NULL,
    comment VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS teaching (
    idTeaching INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    idSubject INTEGER NOT NULL REFERENCES subject(idSubject),
    idTeacher INTEGER NOT NULL REFERENCES teacher(idTeacher),
    isResponsibile BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS schedule (
    idSchedule INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    startHour TIME NOT NULL,
    endHour TIME NOT NULL,
    idSubject INTEGER REFERENCES subject(idSubject),
    idClass INTEGER REFERENCES class(idClass),
    commentary VARCHAR(500),
    UNIQUE (startHour, endHour, idClass)
);

CREATE TABLE IF NOT EXISTS exam (
    idExam INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL,
    idSubject INTEGER REFERENCES subject(idSubject)
);

CREATE TABLE IF NOT EXISTS examMark (
    idMark INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    idExam INTEGER REFERENCES exam(idExam),
    idAttendance INTEGER REFERENCES attendance(idAttendance),
    comment VARCHAR(250),
    UNIQUE (idExam, idAttendance)
);
