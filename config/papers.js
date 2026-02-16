// Papers configuration
export const papers = {
    'paper-1': {
        id: 'paper-1',
        name: 'Paper 1',
        description: 'General Awareness, Quantitative Aptitude, Punjabi Language'
    },
    'paper-2': {
        id: 'paper-2',
        name: 'Paper 2',
        description: 'Logical Reasoning, Digital Literacy, English Language'
    },
    'paper-3': {
        id: 'paper-3',
        name: 'Paper 3',
        description: 'Additional Paper'
    }
};

export function getPaper(paperId) {
    return papers[paperId];
}

export function getAllPapers() {
    return Object.values(papers);
}
