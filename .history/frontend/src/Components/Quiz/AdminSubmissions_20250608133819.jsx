const message = `Hey! Check out this quiz:\nTitle: ${quiz.title}\nCode: ${quiz.quizCode}`;
const whatsappLink = `https://wa.me/9168018581?text=${encodeURIComponent(message)}`;

// In the table cell:
<TableCell>
  <Button
    variant="outlined"
    color="primary"
    onClick={() => {
      window.open(whatsappLink, "_blank");
    }}
  >
    Share
  </Button>
</TableCell>