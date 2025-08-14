const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// env 체크
const required = ["DB_HOST","DB_USER","DB_PASSWORD","DB_NAME"];
required.forEach(k => {
  if (!process.env[k]) throw new Error(`Missing env: ${k}`);
});

// DB 연결
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});
db.connect(err => {
  if (err) console.error("MySQL 연결 실패:", err);
  else console.log("MySQL 연결 성공");
});

// 루트
app.get("/", (req, res) => {
  res.send("서버 정상 작동!");
});

// DB 헬스체크
app.get("/health/db", (req, res) => {
  db.query("SELECT 1 AS ok", (err, rows) => {
    if (err) return res.status(500).json({ ok:false, error: err.message });
    res.json({ ok:true, rows });
  });
});

// 회원가입
app.post("/register", async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  // 1. 필드 검사
  if (!name || !email || !password || !passwordConfirm) {
    return res.status(400).json({ ok:false, message: "모든 필드를 입력하세요" });
  }

  // 2. 비밀번호 확인
  if (password.trim() !== passwordConfirm.trim()) {
    return res.status(400).json({ ok:false, message: "비밀번호가 일치하지 않습니다" });
  }

  // 3. 이메일 중복 체크
  db.query("SELECT id FROM users WHERE email = ?", [email.trim()], async (err, results) => {
    if (err) {
      console.error("중복 체크 오류:", err);
      return res.status(500).json({ ok:false, message: "DB 오류" });
    }
    if (results.length > 0) {
      return res.status(409).json({ ok:false, message: "이미 가입된 이메일입니다." });
    }

    try {
      // 4. 비밀번호 해시
      const hashedPassword = await bcrypt.hash(password.trim(), 10);

      // 5. 저장
      db.query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name.trim(), email.trim(), hashedPassword],
        (err, result) => {
          if (err) {
            console.error("회원가입 INSERT 오류:", err);
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ ok:false, message: "이미 가입된 이메일입니다." });
            }
            return res.status(500).json({ ok:false, message: "회원가입 실패" });
          }
          res.status(201).json({ ok:true, message: "회원가입 성공", userId: result.insertId });
        }
      );
    } catch (hashErr) {
      console.error("비밀번호 해시 오류:", hashErr);
      res.status(500).json({ ok:false, message: "서버 오류" });
    }
  });
});

  //로그인 기능
  
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // 1) 필드 체크
    if (!email || !password) {
      return res.status(400).json({ ok:false, message:"이메일/비밀번호를 입력하세요." });
    }
  
    // 2) 사용자 조회
    db.query(
      "SELECT id, name, email, password_hash FROM users WHERE email = ?",
      [email.trim()],
      async (err, rows) => {
        if (err) {
          console.error("[LOGIN] SELECT error:", err);
          return res.status(500).json({ ok:false, message:"DB 오류(SELECT)" });
        }
        if (rows.length === 0) {
          return res.status(401).json({ ok:false, message:"이메일 또는 비밀번호가 올바르지 않습니다." });
        }
  
        const user = rows[0];
  
        try {
          // 3) 비밀번호 검증
          const ok = await bcrypt.compare(String(password), user.password_hash);
          if (!ok) {
            return res.status(401).json({ ok:false, message:"이메일 또는 비밀번호가 올바르지 않습니다." });
          }
  
          // 4) 성공 응답 (민감정보 제외)
          return res.json({
            ok:true,
            user: { id: user.id, name: user.name, email: user.email }
          });
        } catch (cmpErr) {
          console.error("[LOGIN] COMPARE error:", cmpErr);
          return res.status(500).json({ ok:false, message:"서버 오류" });
        }
      }
    );
  });

//터미널 콘솔로그
app.listen(5050, () => {
  console.log("서버가 http://localhost:5050 에서 실행 중");
});