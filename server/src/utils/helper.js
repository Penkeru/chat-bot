
const containsQuestion = (text) => {
  const questionWords = ["what", "when", "where", "why", "how", "who"];
  const firstWord = text.trim().toLowerCase().split(' ')[0];
  return questionWords.includes(firstWord);
}

const hasQuestionMark = (text) => {
  return text.includes("?");
}

const isAQuestion = (text) => {
  return hasQuestionMark(text) || containsQuestion(text);
}

const isAnswerToQuestion = (question, answer, threshold = 0.3) => {
  const lowercaseQuestion = question.toLowerCase();
  const lowercaseAnswer = answer.toLowerCase();

  const questionWords = lowercaseQuestion.split(' ');

  let hitScore = 0;

  for (const word of questionWords) {
    if (lowercaseAnswer.includes(word)) {
      hitScore++;
    }
  }

  return hitScore / questionWords.length >= threshold;
} // if hitscore is more then threshold then it is an answer to the question;

const createIdFromText = (text) => { // Remove special characters and convert to lowercase
  return btoa(text.replace(/[^\w\s]/gi, '').toLowerCase());
}

export { isAQuestion, isAnswerToQuestion, createIdFromText}