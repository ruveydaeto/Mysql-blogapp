import mysql from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "Ruveyda1898*",
    database: "blog"
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});
