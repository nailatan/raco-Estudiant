# raco-estudiant

API Para gestionar información de los estudiantes en una escuela:
APIs existentes:

- APis para gestión de agendas. Dos versiones, con diferentes BBDD:

  - /api/diary --> Base de datos relacional.
  - /api/diary/:idDiary/events --> Eventos de una agenda
  - /api/mongo/diary --> Base de datos MongoDB
  - /api/mong/diary/:idDiary/events --> Eventos asociados a una agenda
  - /api/student --> gestión de estudiantes

- /endpoint: XML con la collección de los diferentes endpoint para insomnia.

- db-raco: definición docker de la BBDD postgreSQL.

  - ./sql/create-db.sql --> fichero que permite la creación del esquema de BBDD.

- mongoDB-raco: definición docker de la BBDD MongoDB

# TODO:
