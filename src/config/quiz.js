// Quiz configuration
export const quizConfig = {
    timePerQuestion: 60, // seconds
    negativeMarking: true,
    negativeMarkingRatio: 0.25,
    passingPercentage: 40,
    questionsPerSet: 20
};

export function getQuizConfig() {
    return quizConfig;
}
