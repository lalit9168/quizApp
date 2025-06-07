// Get quiz by code
router.get("/code/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const quiz = await Quiz.findOne({ code });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
