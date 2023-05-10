import express from "express";
import {
  deleteMember,
  getMemberList,
  insertMember,
  memberModi,
} from "../DB.js";
import session from "express-session";

export const router = express.Router();
router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.route("/members").get(async (req, res) => {
  const memberList = getMemberList();
  setTimeout(() => {
    return res.render("members.ejs", { memberList });
  }, 10);
});
router
  .route("/insertMember")
  .get((req, res) => res.render("insertMember.ejs"))
  .post((req, res) => {
    const {
      body: { name, grade, age, job },
    } = req;
    insertMember(name, grade, age, job);
    return res.redirect("/");
  });

router.route("/deleteMember").post((req, res) => {
  const {
    body: { name },
  } = req;
  deleteMember(name);
  return res.sendStatus(201);
});

router
  .use("/goToModi", (req, res) => {
    const { name, grade, age, job } = req.body;
    req.session.name = name;
    req.session.grade = grade;
    req.session.age = age;
    req.session.job = job;
    res.sendStatus(200);
  })
  .get("/memberModi", (req, res) => {
    const { name, grade, age, job } = req.session;
    res.render("memberModi", { name, grade, age, job });
  })
  .post("/memberModi", (req, res) => {
    const { name, grade, age, job } = req.body;
    memberModi(name, grade, age, job);
    res.redirect("/members");
  });
