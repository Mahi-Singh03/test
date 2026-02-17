// Route configuration
export const routes = {
    home: '/',
    fullPaper: '/full-paper',
    miniQuiz: '/mini-quiz',
    results: '/results',
    api: {
        quiz: '/api/quiz',
        results: '/api/results'
    }
};

export function getRoute(routeName) {
    return routes[routeName];
}
