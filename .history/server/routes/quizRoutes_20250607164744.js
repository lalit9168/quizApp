import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Quiz from "../models/Quiz.js";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

const router = express.Router();

// Helper to generate a unique quiz code
async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

// Create a new quiz (admin only)
router.post("/create", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can create quizzes" });
    }

    const { title, questions } = req.body;
    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: decoded.username,
      questions,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created", quizCode });
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern?.quizCode) {
      res.status(409).json({ message: "Quiz code already exists. Try again." });
    } else {
      res.status(500).json({ message: "Error creating quiz" });
    }
  }
});

// Get all quizzes (admin access)
router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to get quizzes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get quiz by quiz code
router.get("/code/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  try {
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit quiz attempt (user)
router.post("/submit/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  const { token, score } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const email = decoded.email;

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const alreadySubmitted = quiz.submissions?.some((s) => s.email === email);
    if (alreadySubmitted) {
      return res
        .status(403)
        .json({ message: "You have already attempted this quiz." });
    }

    const now = new Date();
    const date = now.toLocaleDateString();  // e.g., "06/07/2025"
    const time = now.toLocaleTimeString();  // e.g., "2:45:12 PM"

    quiz.submissions = quiz.submissions || [];
    quiz.submissions.push({ email, score, date, time });

    await quiz.save();
    res.status(200).json({ message: "Submission recorded successfully." });
  } catch (err) {
    console.error("Submit error:", err.message);
    res.status(500).json({ message: "Server error during submission" });
  }
});

// Delete quiz (admin only)
router.delete("/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can delete quizzes" });
    }

    const quiz = await Quiz.findOneAndDelete({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all quiz submissions (admin only)
router.get("/submissions/all", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quizzes = await Quiz.find({}, "title quizCode submissions");
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get submissions for a specific quiz (admin only)
router.get("/submissions/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quiz = await Quiz.findOne(
      { quizCode: req.params.quizCode },
      "submissions"
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz.submissions || []);
  } catch (err) {
    console.error("Error fetching quiz submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Export submissions of a quiz to Excel (admin only)
router.get("/export/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Only admins can export data" });
    }

    const quiz = await Quiz.findOne({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const submissions = quiz.submissions || [];

    console.log("Submissions to export:", submissions);  // ✅ DEBUG LOG

const formattedSubmissions = submissions.map((s, i) => {
  return {
    Sr_No: i + 1,
    Email: s.email || "N/A",
    Score: s.score ?? "N/A",
    Date: s.date || "N/A",
    Time: s.time || "N/A",
  };
});
✅ Adds a serial number (optional)
✅ Ensures null/undefined values are replaced with "N/A"
✅ Adds a debug log to check what’s actually being passed

📂 Next Steps
Update the export route as shown above

Restart your backend

Hit the /export/:quizCode route

Open the downloaded Excel — you should now see:

sql
Copy
Edit
Sr_No | Email                         | Score | Date      | Time
1     | lalitchaudhari003@gmail.com   | 1     | 7/6/2025  | 4:34:24 pm
Let me know if you'd like it to format the date/time better (e.g., YYYY-MM-DD or 24-hr format).







Messages beyond this point are only visible to you

You said:
tell me which file u required


ChatGPT said:
To fix the issue with missing date and time in your Excel export, I want to check:

Your quiz model file (you already shared, good!) — it shows date/time fields exist

Your quiz routes file where export happens (you shared too)

But I want to check the code where you submit/save quiz submissions, especially how you set date and time in the submissions array before saving to DB.

So please share the file or code snippet where you handle quiz submission and save the submission data to MongoDB.

This will help me confirm that date and time are properly added in the database before export.

(You mentioned submitting quiz and saving — that code is key.)

If you want, you can share:

The whole file with the submit quiz endpoint (or

Just the function/route that handles saving user quiz submissions)

Then I can review and make sure date/time is saved exactly and that export will work perfectly.






You said:
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Helper to generate a unique quiz code
async function generateUniqueQuizCode() {
  let code;
  let exists = true;

  while (exists) {
    code = crypto.randomBytes(3).toString("hex").toUpperCase();
    const existing = await Quiz.findOne({ quizCode: code });
    exists = !!existing;
  }

  return code;
}

// Create a new quiz (admin only)
router.post("/create", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can create quizzes" });
    }

    const { title, questions } = req.body;
    const quizCode = await generateUniqueQuizCode();

    const quiz = new Quiz({
      title,
      quizCode,
      createdBy: decoded.username,
      questions,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created", quizCode });
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern?.quizCode) {
      res.status(409).json({ message: "Quiz code already exists. Try again." });
    } else {
      res.status(500).json({ message: "Error creating quiz" });
    }
  }
});

// Get all quizzes (admin access)
router.get("/all", async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, "title quizCode questions");
    res.json(quizzes);
  } catch (error) {
    console.error("Failed to get quizzes:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get quiz by quiz code
router.get("/code/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  try {
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Submit quiz attempt (user)
router.post("/submit/:quizCode", async (req, res) => {
  const { quizCode } = req.params;
  const { token, score } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    const email = decoded.email;

    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const alreadySubmitted = quiz.submissions?.some((s) => s.email === email);
    if (alreadySubmitted) {
      return res
        .status(403)
        .json({ message: "You have already attempted this quiz." });
    }

    const now = new Date();
    const date = now.toLocaleDateString();  // e.g., "06/07/2025"
    const time = now.toLocaleTimeString();  // e.g., "2:45:12 PM"

    quiz.submissions = quiz.submissions || [];
    quiz.submissions.push({ email, score, date, time });

    await quiz.save();
    res.status(200).json({ message: "Submission recorded successfully." });
  } catch (err) {
    console.error("Submit error:", err.message);
    res.status(500).json({ message: "Server error during submission" });
  }
});

// Delete quiz (admin only)
router.delete("/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can delete quizzes" });
    }

    const quiz = await Quiz.findOneAndDelete({ quizCode: req.params.quizCode });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ New: Get all quiz submissions (admin only)
router.get("/submissions/all", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quizzes = await Quiz.find({}, "title quizCode submissions");
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ New: Get submissions for a specific quiz (admin only)
router.get("/submissions/:quizCode", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view submissions" });
    }

    const quiz = await Quiz.findOne(
      { quizCode: req.params.quizCode },
      "submissions"
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz.submissions || []);
  } catch (err) {
    console.error("Error fetching quiz submissions:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
this my quizRoutes file make coreect and give mw whole code


ChatGPT said:
You've reached our limits of messages. Please try again later.


Retry

2/2







    const worksheet = XLSX.utils.json_to_sheet(formattedSubmissions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

    const exportDir = "exports";
    fs.mkdirSync(exportDir, { recursive: true });

    const filePath = path.join(exportDir, `${quiz.quizCode}_submissions.xlsx`);
    XLSX.writeFile(workbook, filePath);

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending file");
      }
    });
  } catch (err) {
    console.error("Export error:", err.message);
    res.status(500).json({ message: "Server error during export" });
  }
});

export default router;
