// Placeholder for score calculation logic
export function calculateScore(answers, correctAnswers) {
    // TODO: Implement score calculation
    return {
        score: 0,
        percentage: 0,
        correct: 0,
        incorrect: 0
    };
}

export function calculatePercentage(correct, total) {
    return total > 0 ? (correct / total) * 100 : 0;
}
