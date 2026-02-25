/**
 * quizData.js — File-system driven quiz data loader
 *
 * DATA FOLDER STRUCTURE (mirrors the URL exactly):
 *
 *   src/data/mini-quiz/
 *   └── {paperId}/
 *       ├── _meta.json           ← optional: { label, description, icon }
 *       └── {subjectId}/
 *           ├── _meta.json
 *           └── {categoryId}/
 *               ├── _meta.json
 *               └── {topicId}/
 *                   ├── _meta.json
 *                   ├── _sets.json   ← optional: { "set-1": { label, description, icon, questions, duration } }
 *                   └── {setId}.json ← the actual quiz questions array
 *
 * TO ADD A NEW QUIZ:
 *   1. Create the folder path matching the URL segment
 *   2. Drop the questions JSON file (array of { question, options, answer, explanation })
 *   3. Optionally add _meta.json at each level for display names
 *   4. That's it — the page auto-discovers it!
 *
 * URL pattern: /mini-quiz/{paperId}/{subjectId}/{categoryId}/{topicId}/{setId}
 */

import fs from 'fs';
import path from 'path';

const DATA_ROOT = path.join(process.cwd(), 'src', 'data', 'mini-quiz');

/* ─── Helper: slug → readable label ─── */
function slugToLabel(slug) {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ─── Helper: read _meta.json if it exists ─── */
function readMeta(dirPath) {
    const metaPath = path.join(dirPath, '_meta.json');
    try {
        return JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch {
        return null;
    }
}

/* ─── Helper: read _sets.json if it exists ─── */
function readSetsManifest(dirPath) {
    const setsPath = path.join(dirPath, '_sets.json');
    try {
        return JSON.parse(fs.readFileSync(setsPath, 'utf-8'));
    } catch {
        return null;
    }
}

/* ─── Helper: list immediate subdirectories (skip underscore files) ─── */
function listDirs(dirPath) {
    try {
        return fs.readdirSync(dirPath, { withFileTypes: true })
            .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
            .map((d) => d.name);
    } catch {
        return [];
    }
}

/* ─── Helper: list .json files (excluding _*.json) ─── */
function listJsonFiles(dirPath) {
    try {
        return fs.readdirSync(dirPath, { withFileTypes: true })
            .filter((f) => f.isFile() && f.name.endsWith('.json') && !f.name.startsWith('_'))
            .map((f) => f.name.replace('.json', ''));
    } catch {
        return [];
    }
}

/* ══════════════════════════════════════════════════════
   PUBLIC API
══════════════════════════════════════════════════════ */

/**
 * Get list of papers (top-level folders)
 */
export function getPapers() {
    const dirs = listDirs(DATA_ROOT);
    return dirs.map((id) => {
        const meta = readMeta(path.join(DATA_ROOT, id));
        return {
            id,
            label: meta?.label || slugToLabel(id),
            description: meta?.description || '',
            icon: meta?.icon || '📄',
        };
    });
}

/**
 * Get subjects for a paper
 */
export function getSubjects(paperId) {
    const dir = path.join(DATA_ROOT, paperId);
    const dirs = listDirs(dir);
    return dirs.map((id) => {
        const meta = readMeta(path.join(dir, id));
        return {
            id,
            label: meta?.label || slugToLabel(id),
            description: meta?.description || '',
            icon: meta?.icon || '📚',
        };
    });
}

/**
 * Get categories for a subject
 */
export function getCategories(paperId, subjectId) {
    const dir = path.join(DATA_ROOT, paperId, subjectId);
    const dirs = listDirs(dir);
    return dirs.map((id) => {
        const meta = readMeta(path.join(dir, id));
        return {
            id,
            label: meta?.label || slugToLabel(id),
            description: meta?.description || '',
            icon: meta?.icon || '📂',
        };
    });
}

/**
 * Get topics for a category
 */
export function getTopics(paperId, subjectId, categoryId) {
    const dir = path.join(DATA_ROOT, paperId, subjectId, categoryId);
    const dirs = listDirs(dir);
    return dirs.map((id) => {
        const meta = readMeta(path.join(dir, id));
        return {
            id,
            label: meta?.label || slugToLabel(id),
            description: meta?.description || '',
            icon: meta?.icon || '📌',
        };
    });
}

/**
 * Get quiz sets for a topic
 * Returns an array of set descriptors, discovered automatically from .json files
 */
export function getQuizSets(paperId, subjectId, categoryId, topicId) {
    const dir = path.join(DATA_ROOT, paperId, subjectId, categoryId, topicId);
    const manifest = readSetsManifest(dir);
    const files = listJsonFiles(dir);

    return files.map((setId) => {
        const info = manifest?.[setId] || {};
        return {
            id: setId,
            label: info.label || slugToLabel(setId),
            description: info.description || 'Practice set',
            icon: info.icon || '📝',
            questions: info.questions || null,
            duration: info.duration || 60,
        };
    });
}

/**
 * Load quiz questions from the file-system path
 */
export function getQuizQuestions(paperId, subjectId, categoryId, topicId, setId) {
    const filePath = path.join(DATA_ROOT, paperId, subjectId, categoryId, topicId, `${setId}.json`);
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

/**
 * Get meta info for any level
 */
export function getMeta(paperId, subjectId, categoryId, topicId) {
    const parts = [DATA_ROOT, paperId, subjectId, categoryId, topicId].filter(Boolean);
    return readMeta(path.join(...parts));
}
