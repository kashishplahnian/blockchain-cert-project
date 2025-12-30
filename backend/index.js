console.log("BACKEND FILE EXECUTED");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const certificates = {
  "0": {
    certificateId: 0,
    studentName: "Kashish",
    course: "B.Tech CSE",
    grade: "A",
    issueDate: "2025-01-01",
    isValid: true
  },
  "1": {
    certificateId: 1,
    studentName: "Rachna",
    course: "M.A English",
    grade: "A",
    issueDate: "2002-01-01",
    isValid: true
  },
  "2": {
    certificateId: 1,
    studentName: "Ajay",
    course: "B.Sc Nautical Science",
    grade: "A",
    issueDate: "2000-01-01",
    isValid: true
  }
};


app.get("/api/certificates/:id", (req, res) => {
  const cert = certificates[req.params.id];
  if (!cert) {
    return res.status(404).json({ error: "Certificate not found" });
  }
  res.json(cert);
});

app.listen(7000, () => {
  console.log("Backend running on port 7000");
});
