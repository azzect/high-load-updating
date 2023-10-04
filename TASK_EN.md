Test task for Back-End developers.

The task consists of two parts. You can only proceed to the second part after successfully completing the first part.

Create a simple web application.
Create a simple web application using Node.js (Express) and PostgresQL (either pure SQL or Sequelize ORM). It is highly desirable to use JavaScript (unless you are a TypeScript wizard).

Upon startup, the application should create a "users" table in the database using migration and add one user account to it, which will have only one field, "balance," with a value of 10000.

Write a route to update the user's balance, which takes parameters userId and amount.

An important condition is that the user's balance cannot be negative.