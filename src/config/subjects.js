// Subject structure for each paper
export const subjectsData = {
    'paper-1': {
        'general-awareness': {
            name: 'General Awareness',
            categories: {
                'indian-polity': {
                    name: 'Indian Polity',
                    topics: [
                        { id: 'constitution-features', name: 'Constitution Features' },
                        { id: 'fundamental-rights-duties', name: 'Fundamental Rights & Duties' },
                        { id: 'parliament-state-legislature', name: 'Parliament & State Legislature' },
                        { id: 'executive-system', name: 'Executive System' },
                        { id: 'judiciary', name: 'Judiciary' },
                        { id: 'panchayati-raj', name: 'Panchayati Raj' }
                    ]
                },
                'history': {
                    name: 'History',
                    topics: [
                        { id: 'ancient-india', name: 'Ancient India' },
                        { id: 'medieval-india', name: 'Medieval India' },
                        { id: 'modern-india', name: 'Modern India' },
                        { id: 'freedom-movement', name: 'Freedom Movement' },
                        { id: 'punjab-history-culture', name: 'Punjab History & Culture' }
                    ]
                },
                'geography-environment': {
                    name: 'Geography & Environment',
                    topics: [
                        { id: 'indian-geography', name: 'Indian Geography' },
                        { id: 'punjab-geography', name: 'Punjab Geography' },
                        { id: 'climate-natural-resources', name: 'Climate & Natural Resources' },
                        { id: 'environment-ecology', name: 'Environment & Ecology' }
                    ]
                },
                'economy': {
                    name: 'Economy',
                    topics: [
                        { id: 'indian-economy', name: 'Indian Economy' },
                        { id: 'banking-awareness', name: 'Banking Awareness' },
                        { id: 'economic-development', name: 'Economic Development' },
                        { id: 'government-schemes', name: 'Government Schemes' }
                    ]
                },
                'science-technology': {
                    name: 'Science & Technology',
                    topics: [
                        { id: 'physics', name: 'Physics' },
                        { id: 'chemistry', name: 'Chemistry' },
                        { id: 'biology', name: 'Biology' },
                        { id: 'everyday-science', name: 'Everyday Science' },
                        { id: 'recent-tech', name: 'Recent Technology' }
                    ]
                },
                'current-affairs': {
                    name: 'Current Affairs',
                    topics: [
                        { id: 'national', name: 'National' },
                        { id: 'international', name: 'International' },
                        { id: 'sports', name: 'Sports' },
                        { id: 'awards', name: 'Awards' },
                        { id: 'policies', name: 'Policies' },
                        { id: 'legal-updates', name: 'Legal Updates' }
                    ]
                },
                'social-awareness': {
                    name: 'Social Awareness',
                    topics: [
                        { id: 'diversity', name: 'Diversity' },
                        { id: 'vulnerable-sections', name: 'Vulnerable Sections' },
                        { id: 'ethics', name: 'Ethics' },
                        { id: 'social-issues', name: 'Social Issues' }
                    ]
                }
            }
        },
        'quantitative-aptitude': {
            name: 'Quantitative Aptitude',
            categories: {
                'number-system': { name: 'Number System', topics: [] },
                'simplification': { name: 'Simplification', topics: [] },
                'decimals-fractions': { name: 'Decimals & Fractions', topics: [] },
                'percentage': { name: 'Percentage', topics: [] },
                'ratio-proportion': { name: 'Ratio & Proportion', topics: [] },
                'averages': { name: 'Averages', topics: [] },
                'profit-loss': { name: 'Profit & Loss', topics: [] },
                'simple-interest': { name: 'Simple Interest', topics: [] },
                'compound-interest': { name: 'Compound Interest', topics: [] },
                'time-work': { name: 'Time & Work', topics: [] },
                'pipes-cisterns': { name: 'Pipes & Cisterns', topics: [] },
                'time-speed-distance': { name: 'Time, Speed & Distance', topics: [] },
                'mensuration': { name: 'Mensuration', topics: [] },
                'speed-maths': { name: 'Speed Maths', topics: [] }
            }
        },
        'punjabi-language': {
            name: 'Punjabi Language',
            categories: {
                'grammar': { name: 'Grammar', topics: [] },
                'vocabulary': { name: 'Vocabulary', topics: [] },
                'sentence-formation': { name: 'Sentence Formation', topics: [] },
                'error-detection': { name: 'Error Detection', topics: [] },
                'comprehension': { name: 'Comprehension', topics: [] }
            }
        }
    },
    'paper-2': {
        'logical-reasoning': {
            name: 'Logical Reasoning',
            categories: {
                'analogy': { name: 'Analogy', topics: [] },
                'classification': { name: 'Classification', topics: [] },
                'coding-decoding': { name: 'Coding & Decoding', topics: [] },
                'series': { name: 'Series', topics: [] },
                'syllogism': { name: 'Syllogism', topics: [] },
                'blood-relations': { name: 'Blood Relations', topics: [] },
                'direction-sense': { name: 'Direction Sense', topics: [] },
                'ranking': { name: 'Ranking', topics: [] },
                'seating-arrangement': { name: 'Seating Arrangement', topics: [] },
                'puzzles': { name: 'Puzzles', topics: [] },
                'missing-numbers': { name: 'Missing Numbers', topics: [] },
                'data-sufficiency': { name: 'Data Sufficiency', topics: [] },
                'calendars': { name: 'Calendars', topics: [] },
                'legal-reasoning': { name: 'Legal Reasoning', topics: [] },
                'mirror-images': { name: 'Mirror Images', topics: [] },
                'figure-matrix': { name: 'Figure Matrix', topics: [] },
                'paper-folding': { name: 'Paper Folding', topics: [] },
                'data-interpretation': {
                    name: 'Data Interpretation',
                    topics: [
                        { id: 'graphs', name: 'Graphs' },
                        { id: 'charts', name: 'Charts' },
                        { id: 'tables', name: 'Tables' },
                        { id: 'spreadsheet', name: 'Spreadsheet' }
                    ]
                }
            }
        },
        'digital-literacy': {
            name: 'Digital Literacy',
            categories: {
                'hardware-software': { name: 'Hardware & Software', topics: [] },
                'operating-systems': { name: 'Operating Systems', topics: [] },
                'input-output-devices': { name: 'Input/Output Devices', topics: [] },
                'ms-word': { name: 'MS Word', topics: [] },
                'ms-excel': { name: 'MS Excel', topics: [] },
                'powerpoint': { name: 'PowerPoint', topics: [] },
                'internet-www': { name: 'Internet & WWW', topics: [] },
                'search-engines': { name: 'Search Engines', topics: [] },
                'email': { name: 'Email', topics: [] },
                'social-media': { name: 'Social Media', topics: [] },
                'data-encryption': { name: 'Data Encryption', topics: [] },
                'cyber-security': { name: 'Cyber Security', topics: [] },
                'online-safety': { name: 'Online Safety', topics: [] }
            }
        },
        'english-language': {
            name: 'English Language',
            categories: {
                'tenses': { name: 'Tenses', topics: [] },
                'articles': { name: 'Articles', topics: [] },
                'prepositions': { name: 'Prepositions', topics: [] },
                'voice-narration': { name: 'Voice & Narration', topics: [] },
                'subject-verb-agreement': { name: 'Subject-Verb Agreement', topics: [] },
                'synonyms': { name: 'Synonyms', topics: [] },
                'antonyms': { name: 'Antonyms', topics: [] },
                'idioms-phrases': { name: 'Idioms & Phrases', topics: [] },
                'one-word-substitution': { name: 'One Word Substitution', topics: [] },
                'spelling': { name: 'Spelling', topics: [] },
                'reading-comprehension': { name: 'Reading Comprehension', topics: [] },
                'sentence-rearrangement': { name: 'Sentence Rearrangement', topics: [] },
                'error-detection': { name: 'Error Detection', topics: [] },
                'fill-in-blanks': { name: 'Fill in the Blanks', topics: [] },
                'translation': { name: 'Translation', topics: [] },
                'precis-writing': { name: 'Precis Writing', topics: [] }
            }
        }
    }
};

export function getSubjects(paperId) {
    return subjectsData[paperId] || {};
}

export function getCategories(paperId, subjectId) {
    return subjectsData[paperId]?.[subjectId]?.categories || {};
}

export function getTopics(paperId, subjectId, categoryId) {
    const topics = subjectsData[paperId]?.[subjectId]?.categories?.[categoryId]?.topics || [];
    // If no topics defined, treat category as direct topic
    return topics.length > 0 ? topics : [];
}

export function getCategoryName(paperId, subjectId, categoryId) {
    return subjectsData[paperId]?.[subjectId]?.categories?.[categoryId]?.name || categoryId;
}

export function getSubjectName(paperId, subjectId) {
    return subjectsData[paperId]?.[subjectId]?.name || subjectId;
}
