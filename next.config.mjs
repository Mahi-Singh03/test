/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  async rewrites() {
    return [
      // Shorter mini-quiz URL without the "general" topic segment.
      // Public: /mini-quiz/paper-1/quantitative-aptitude/ratio-proportion/set-1
      // Internal route: /mini-quiz/paper-1/quantitative-aptitude/ratio-proportion/general/set-1
      {
        source: '/mini-quiz/:paperId/:subjectId/:categoryId/:quizSetId',
        destination: '/mini-quiz/:paperId/:subjectId/:categoryId/general/:quizSetId',
      },
    ];
  },
};

export default nextConfig;
