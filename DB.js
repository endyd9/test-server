import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PWD,
  database: "member",
});

export const getMemberList = () => {
  const arry = [];
  connection.query("SELECT * FROM members", function (error, results, fields) {
    if (error) {
      console.log(error);
    }
    results.forEach((result) => {
      arry.push(result);
    });
  });
  return arry;
};

export const insertMember = (name, grade, age, job) => {
  connection.query(
    `insert into members value("${name}","${grade}","${age}","${job}")`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    }
  );
};

export const deleteMember = (name) => {
  connection.query(
    `delete from members where (name = "${name}" )`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    }
  );
};

export const memberModi = (name, grade, age, job) => {
  connection.query(
    `update members set grade = '${grade}', age = '${age}', job = '${job}' where (name = "${name}" )`,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
    }
  );
};
