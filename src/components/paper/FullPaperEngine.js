'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './FullPaperEngine.module.css';

/* ─── Status constants ─── */
const STATUS = {
    NOT_VISITED: 'not_visited',
    ANSWERED: 'answered',
    DRAFT: 'draft',
    EMPTY_NEXT: 'empty_next',
};

/* ─── Format seconds to MM:SS ─── */
function fmt(secs) {
    const abs = Math.max(0, secs);
    const m = Math.floor(abs / 60).toString().padStart(2, '0');
    const s = (abs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

/* ─── Legend dot ─── */
function LegendDot({ status }) {
    return <span className={`${styles.dot} ${styles['dot_' + status]}`} />;
}

/* ─── Results Modal ─── */
function ResultsModal({ questions, answers, statuses, sections, onClose, onReview }) {
    const total = questions.length;
    const answered = statuses.filter(s => s === STATUS.ANSWERED).length;
    const drafts = statuses.filter(s => s === STATUS.DRAFT).length;
    const skipped = statuses.filter(s => s === STATUS.EMPTY_NEXT || s === STATUS.NOT_VISITED).length;

    let correct = 0, wrong = 0;
    questions.forEach((q, i) => {
        if (statuses[i] === STATUS.ANSWERED) {
            if (answers[i] === q.answer) correct++;
            else wrong++;
        }
    });
    const marks = correct * 4 - wrong * 1;
    const maxMarks = total * 4;
    const pct = Math.max(0, Math.round((marks / maxMarks) * 100));

    /* Per-section breakdown */
    const sectionStats = sections.map(sec => {
        let secCorrect = 0, secWrong = 0, secAnswered = 0;
        for (let i = sec.startIndex; i <= sec.endIndex; i++) {
            if (statuses[i] === STATUS.ANSWERED) {
                secAnswered++;
                if (answers[i] === questions[i].answer) secCorrect++;
                else secWrong++;
            }
        }
        const secMarks = secCorrect * 4 - secWrong;
        return { ...sec, secCorrect, secWrong, secAnswered, secMarks };
    });

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <span className={styles.modalIcon}>🎓</span>
                    <h2 className={styles.modalTitle}>Result Summary</h2>
                    <p className={styles.modalSub}>Full Paper · 2024</p>
                </div>

                <div className={styles.scoreRing}>
                    <div className={styles.scoreRingInner}>
                        <span className={styles.scoreBig}>{marks}</span>
                        <span className={styles.scoreMax}>/ {maxMarks}</span>
                        <span className={styles.scorePct}>{pct}%</span>
                    </div>
                </div>

                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statNum} style={{ color: '#22c55e' }}>{correct}</span>
                        <span className={styles.statLabel}>Correct</span>
                        <span className={styles.statPts}>+{correct * 4} marks</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNum} style={{ color: '#ef4444' }}>{wrong}</span>
                        <span className={styles.statLabel}>Wrong</span>
                        <span className={styles.statPts}>−{wrong} marks</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNum} style={{ color: '#f59e0b' }}>{drafts}</span>
                        <span className={styles.statLabel}>Review</span>
                        <span className={styles.statPts}>0 marks</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNum} style={{ color: '#6b7280' }}>{skipped}</span>
                        <span className={styles.statLabel}>Skipped</span>
                        <span className={styles.statPts}>0 marks</span>
                    </div>
                </div>

                <div className={styles.markingInfo}>
                    <span>✅ Each correct answer: <strong>+4 marks</strong></span>
                    <span>❌ Each wrong answer: <strong>−1 mark</strong></span>
                </div>

                {/* Section-wise breakdown */}
                <div className={styles.breakdown}>
                    <h3 className={styles.breakdownTitle}>Section-wise Breakdown</h3>
                    <div className={styles.sectionBreakList}>
                        {sectionStats.map(sec => (
                            <div key={sec.id} className={styles.sectionBreakCard}>
                                <div className={styles.sbHeader}>
                                    <span className={styles.sbIcon}>{sec.icon}</span>
                                    <span className={styles.sbName}>{sec.name}</span>
                                    <span className={styles.sbSubject}>{sec.subject}</span>
                                </div>
                                <div className={styles.sbStats}>
                                    <span style={{ color: '#22c55e' }}>✓ {sec.secCorrect}</span>
                                    <span style={{ color: '#ef4444' }}>✗ {sec.secWrong}</span>
                                    <span style={{ color: '#1565C0', fontWeight: 700 }}>{sec.secMarks} pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.modalActions}>
                    <button className={styles.btnReview} onClick={onReview}>Review Answers</button>
                    <button className={styles.btnClose} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

/* ─── Review Modal ─── */
function ReviewModal({ questions, answers, statuses, onClose }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const q = questions[activeIdx];
    const userAns = answers[activeIdx];
    const isAnswered = statuses[activeIdx] === STATUS.ANSWERED;
    const isCorrect = isAnswered && userAns === q.answer;

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${styles.reviewModal}`}>
                <div className={styles.reviewHeader}>
                    <h2 className={styles.modalTitle}>Review Answers</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                <div className={styles.reviewNav}>
                    {questions.map((_, i) => {
                        const ans = answers[i];
                        const stat = statuses[i];
                        const isCor = stat === STATUS.ANSWERED && ans === questions[i].answer;
                        const isWrong = stat === STATUS.ANSWERED && ans !== questions[i].answer;
                        return (
                            <button
                                key={i}
                                className={`${styles.reviewDot} ${activeIdx === i ? styles.reviewDotActive : ''} ${isCor ? styles.reviewDotCorrect : isWrong ? styles.reviewDotWrong : styles.reviewDotSkipped}`}
                                onClick={() => setActiveIdx(i)}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.reviewBody}>
                    <div className={styles.reviewQNum}>Question {activeIdx + 1} of {questions.length}</div>
                    <p className={styles.reviewQ}>{q.question}</p>

                    <div className={styles.reviewOpts}>
                        {Object.entries(q.options).map(([key, val]) => {
                            const isCorrectOpt = key === q.answer;
                            const isUserOpt = key === userAns;
                            let cls = styles.reviewOpt;
                            if (isCorrectOpt) cls += ' ' + styles.reviewOptCorrect;
                            else if (isUserOpt && !isCorrectOpt) cls += ' ' + styles.reviewOptWrong;
                            return (
                                <div key={key} className={cls}>
                                    <span className={styles.reviewOptKey}>{key.toUpperCase()}</span>
                                    <span>{val}</span>
                                    {isCorrectOpt && <span className={styles.reviewOptTag}>✓ Correct</span>}
                                    {isUserOpt && !isCorrectOpt && <span className={styles.reviewOptTagWrong}>✗ Your Answer</span>}
                                </div>
                            );
                        })}
                    </div>

                    {q.explanation && (
                        <div className={styles.explanation}>
                            <div className={styles.expLabel}>💡 Explanation</div>
                            <p className={styles.expText}>{q.explanation}</p>
                        </div>
                    )}
                </div>

                <div className={styles.reviewFooter}>
                    <button
                        className={styles.btnSecondary}
                        disabled={activeIdx === 0}
                        onClick={() => setActiveIdx(i => i - 1)}
                    >← Prev</button>
                    <span className={styles.reviewCount}>{activeIdx + 1}/{questions.length}</span>
                    <button
                        className={styles.btnPrimary}
                        disabled={activeIdx === questions.length - 1}
                        onClick={() => setActiveIdx(i => i + 1)}
                    >Next →</button>
                </div>
            </div>
        </div>
    );
}

/* ─── Confirm Submit Modal ─── */
function ConfirmModal({ statuses, onConfirm, onCancel }) {
    const answered = statuses.filter(s => s === STATUS.ANSWERED).length;
    const draft = statuses.filter(s => s === STATUS.DRAFT).length;
    const unanswered = statuses.filter(s => s === STATUS.NOT_VISITED || s === STATUS.EMPTY_NEXT).length;
    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${styles.confirmModal}`}>
                <div className={styles.confirmIcon}>⚠️</div>
                <h2 className={styles.confirmTitle}>Submit Test?</h2>
                <p className={styles.confirmSub}>You are about to submit the test. Please review your attempts below.</p>

                <div className={styles.confirmStats}>
                    <div className={styles.cStat}><LegendDot status={STATUS.ANSWERED} /><span>{answered} Answered</span></div>
                    <div className={styles.cStat}><LegendDot status={STATUS.DRAFT} /><span>{draft} Marked for Review</span></div>
                    <div className={styles.cStat}><LegendDot status={STATUS.NOT_VISITED} /><span>{unanswered} Not Answered</span></div>
                </div>

                <div className={styles.confirmActions}>
                    <button className={styles.btnDanger} onClick={onConfirm}>Submit Now</button>
                    <button className={styles.btnSecondary} onClick={onCancel}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════
   MAIN FULL PAPER ENGINE
══════════════════════════════════════════ */
export default function FullPaperEngine({ questions, meta = {} }) {
    const sections = meta.sections || [
        { id: 'section-1', name: 'Section 1', subject: 'General Awareness', icon: '🌍', startIndex: 0, endIndex: 49, totalQuestions: 50 },
        { id: 'section-2', name: 'Section 2', subject: 'Quantitative Aptitude & Numerical Skills', icon: '🔢', startIndex: 50, endIndex: 79, totalQuestions: 30 },
        { id: 'section-3', name: 'Section 3', subject: 'Punjabi Language', icon: '📖', startIndex: 80, endIndex: 99, totalQuestions: 20 },
    ];

    const TOTAL_SECS = (meta.duration || 120) * 60; // 120 minutes
    const WARN_SECS = 2 * 60; // 2-minute per-question warning

    /* ─── State ─── */
    const [activeSectionIdx, setActiveSectionIdx] = useState(0);
    const activeSection = sections[activeSectionIdx];

    // Current question index is GLOBAL across all questions
    const [currentIdx, setCurrentIdx] = useState(activeSection.startIndex);
    const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
    const [statuses, setStatuses] = useState(() => Array(questions.length).fill(STATUS.NOT_VISITED));
    const [selected, setSelected] = useState(null);

    const [totalSecs, setTotalSecs] = useState(TOTAL_SECS);
    const [qSecs, setQSecs] = useState(0);
    const [qWarn, setQWarn] = useState(false);
    const [timesUp, setTimesUp] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const totalRef = useRef(TOTAL_SECS);
    const qRef = useRef(0);
    const autoSubmittedRef = useRef(false);

    /* ─── Global countdown timer ─── */
    useEffect(() => {
        if (showResults) return;
        const id = setInterval(() => {
            setTotalSecs(prev => {
                const next = prev - 1;
                totalRef.current = next;
                if (next <= 0 && !autoSubmittedRef.current) {
                    clearInterval(id);
                    autoSubmittedRef.current = true;
                    setTimesUp(true);
                }
                return Math.max(0, next);
            });
        }, 1000);
        return () => clearInterval(id);
    }, [showResults]);

    /* ─── Per-question timer ─── */
    useEffect(() => {
        setQSecs(0);
        setQWarn(false);
        qRef.current = 0;
        const id = setInterval(() => {
            qRef.current += 1;
            setQSecs(s => {
                const next = s + 1;
                if (next >= WARN_SECS) setQWarn(true);
                return next;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [currentIdx]);

    /* ─── Load saved selection when navigating ─── */
    useEffect(() => {
        setSelected(answers[currentIdx]);
    }, [currentIdx]);

    /* ─── When switching section, jump to that section's first question ─── */
    const switchSection = (idx) => {
        setActiveSectionIdx(idx);
        setCurrentIdx(sections[idx].startIndex);
        setSidebarOpen(false);
    };

    /* ─── Auto-submit when time is up ─── */
    function handleAutoSubmit() {
        setShowConfirm(false);
        setShowResults(true);
    }

    /* ─── Navigate to question ─── */
    const goTo = useCallback((idx) => {
        // Determine which section this idx belongs to
        const secIdx = sections.findIndex(s => idx >= s.startIndex && idx <= s.endIndex);
        if (secIdx >= 0) setActiveSectionIdx(secIdx);
        setCurrentIdx(idx);
        setSidebarOpen(false);
    }, [sections]);

    /* ─── Save & move to next ─── */
    function handleSaveNext() {
        if (selected === null) return;
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = selected;
        newStatuses[currentIdx] = STATUS.ANSWERED;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        const maxInSection = activeSection.endIndex;
        if (currentIdx < maxInSection) goTo(currentIdx + 1);
        else if (activeSectionIdx < sections.length - 1) switchSection(activeSectionIdx + 1);
    }

    /* ─── Save as draft ─── */
    function handleDraft() {
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = selected;
        newStatuses[currentIdx] = STATUS.DRAFT;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        const maxInSection = activeSection.endIndex;
        if (currentIdx < maxInSection) goTo(currentIdx + 1);
    }

    /* ─── Clear & skip ─── */
    function handleClearNext() {
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = null;
        newStatuses[currentIdx] = STATUS.EMPTY_NEXT;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        setSelected(null);
        const maxInSection = activeSection.endIndex;
        if (currentIdx < maxInSection) goTo(currentIdx + 1);
    }

    function handleClear() {
        setSelected(null);
    }

    function handleSubmit() {
        setShowConfirm(true);
    }

    function handleConfirmSubmit() {
        setShowConfirm(false);
        setShowResults(true);
    }

    /* ─── Derived ─── */
    const timerDanger = totalSecs <= 300;
    const timerWarn = totalSecs <= 600 && !timerDanger;

    const q = questions[currentIdx];

    // Questions in the current section
    const sectionQuestions = questions.slice(activeSection.startIndex, activeSection.endIndex + 1);
    const sectionAnswers = answers.slice(activeSection.startIndex, activeSection.endIndex + 1);
    const sectionStatuses = statuses.slice(activeSection.startIndex, activeSection.endIndex + 1);

    const answered = statuses.filter(s => s === STATUS.ANSWERED).length;
    const draft = statuses.filter(s => s === STATUS.DRAFT).length;
    const notVisited = statuses.filter(s => s === STATUS.NOT_VISITED).length;
    const skipped = statuses.filter(s => s === STATUS.EMPTY_NEXT).length;

    // Q number within section (1-indexed)
    const qNumInSection = currentIdx - activeSection.startIndex + 1;
    const totalInSection = activeSection.totalQuestions;

    return (
        <div className={styles.shell}>
            {/* ═══ TOP BAR ═══ */}
            <header className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <span className={styles.examTitle}>{meta.title || 'Full Paper'}</span>
                    <span className={styles.examSub}>{meta.year || '2024'} · {meta.date || ''}</span>
                </div>

                <div className={styles.topbarCenter}>
                    <div className={`${styles.timerBox} ${timerDanger ? styles.timerDanger : timerWarn ? styles.timerWarn : ''}`}>
                        <span className={styles.timerIcon}>⏱</span>
                        <span className={styles.timerValue}>{fmt(totalSecs)}</span>
                        <span className={styles.timerLabel}>remaining</span>
                    </div>
                </div>

                <div className={styles.topbarRight}>
                    <button className={styles.sidebarToggle} onClick={() => setSidebarOpen(true)} aria-label="Question palette">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                        <span>Palette</span>
                    </button>
                    <button className={styles.submitBtn} onClick={handleSubmit}>Submit Test</button>
                </div>
            </header>

            {/* ═══ SECTION TABS ═══ */}
            <div className={styles.sectionTabs}>
                {sections.map((sec, idx) => {
                    const secAnswered = statuses.slice(sec.startIndex, sec.endIndex + 1).filter(s => s === STATUS.ANSWERED).length;
                    const secTotal = sec.totalQuestions;
                    return (
                        <button
                            key={sec.id}
                            className={`${styles.sectionTab} ${activeSectionIdx === idx ? styles.sectionTabActive : ''}`}
                            onClick={() => switchSection(idx)}
                        >
                            <span className={styles.tabIcon}>{sec.icon}</span>
                            <div className={styles.tabContent}>
                                <span className={styles.tabName}>{sec.name}</span>
                                <span className={styles.tabSubject}>{sec.subject}</span>
                            </div>
                            <span className={styles.tabProgress}>
                                {secAnswered}/{secTotal}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ═══ BODY ═══ */}
            <div className={styles.body}>

                {/* ── LEFT: Question panel ── */}
                <main className={styles.questionPanel}>
                    <div className={styles.qHeader}>
                        <div className={styles.qMeta}>
                            <div className={styles.qNumBlock}>
                                <span className={styles.qNum}>Q{qNumInSection} <span className={styles.qOf}>of {totalInSection}</span></span>
                                <span className={styles.qGlobalNum}>(Global #{currentIdx + 1})</span>
                            </div>
                            <div className={styles.marks}>
                                <span className={styles.markGood}>+4 marks</span>
                                <span className={styles.markBad}>−1 negative</span>
                            </div>
                        </div>

                        {/* Per-question timer */}
                        <div className={`${styles.qTimer} ${qWarn ? styles.qTimerWarn : ''}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            <span>{fmt(qSecs)}</span>
                            {qWarn && <span className={styles.qTimerWarning}>⚠️ 2+ min on this question</span>}
                        </div>
                    </div>

                    <div className={styles.qBody}>
                        <p className={styles.qText}>{q.question}</p>

                        {/* Options */}
                        <div className={styles.options}>
                            {Object.entries(q.options).map(([key, val]) => {
                                const isSel = selected === key;
                                const isSaved = answers[currentIdx] === key && statuses[currentIdx] === STATUS.ANSWERED;
                                const isDraft = statuses[currentIdx] === STATUS.DRAFT && answers[currentIdx] === key;
                                return (
                                    <label
                                        key={key}
                                        className={`${styles.option} ${isSel ? styles.optionSelected : ''} ${isSaved ? styles.optionSaved : ''} ${isDraft ? styles.optionDraft : ''}`}
                                        htmlFor={`opt-${currentIdx}-${key}`}
                                    >
                                        <input
                                            type="radio"
                                            id={`opt-${currentIdx}-${key}`}
                                            name={`q-${currentIdx}`}
                                            value={key}
                                            checked={isSel}
                                            onChange={() => setSelected(key)}
                                            className={styles.radioInput}
                                        />
                                        <span className={styles.optionKey}>{key.toUpperCase()}</span>
                                        <span className={styles.optionVal}>{val}</span>
                                        {isSaved && <span className={styles.savedTag}>✓ Saved</span>}
                                        {isDraft && <span className={styles.draftTag}>📌 Draft</span>}
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Action buttons ── */}
                    <div className={styles.actions}>
                        <div className={styles.actionsLeft}>
                            <button className={styles.btnClear} onClick={handleClear} disabled={!selected}>
                                Clear
                            </button>
                            <button className={styles.btnSkip} onClick={handleClearNext}>
                                Skip →
                            </button>
                        </div>
                        <div className={styles.actionsRight}>
                            <button className={styles.btnDraft} onClick={handleDraft}>
                                📌 Mark for Review
                            </button>
                            <button
                                className={styles.btnSave}
                                onClick={handleSaveNext}
                                disabled={!selected}
                            >
                                Save &amp; Next →
                            </button>
                        </div>
                    </div>

                    {/* ── Navigate prev/next ── */}
                    <div className={styles.navRow}>
                        <button
                            className={styles.navBtn}
                            onClick={() => goTo(currentIdx - 1)}
                            disabled={currentIdx === activeSection.startIndex}
                        >← Previous</button>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${(qNumInSection / totalInSection) * 100}%` }} />
                        </div>
                        <button
                            className={styles.navBtn}
                            onClick={() => goTo(currentIdx + 1)}
                            disabled={currentIdx === activeSection.endIndex}
                        >Next →</button>
                    </div>
                </main>

                {/* ── RIGHT: Question palette ── */}
                <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                    <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}>✕ Close</button>

                    <div className={styles.sidebarInner}>
                        {/* Section switcher in sidebar */}
                        <div className={styles.sidebarSectionSwitcher}>
                            {sections.map((sec, idx) => (
                                <button
                                    key={sec.id}
                                    className={`${styles.sidebarSecBtn} ${activeSectionIdx === idx ? styles.sidebarSecBtnActive : ''}`}
                                    onClick={() => switchSection(idx)}
                                >
                                    {sec.icon} {sec.name}
                                </button>
                            ))}
                        </div>

                        <div className={styles.sidebarSection}>
                            <h3 className={styles.sidebarTitle}>
                                {activeSection.icon} {activeSection.name} — {activeSection.subject}
                            </h3>
                            <div className={styles.palette}>
                                {sectionQuestions.map((_, i) => {
                                    const globalIdx = activeSection.startIndex + i;
                                    return (
                                        <button
                                            key={i}
                                            className={`${styles.palBtn} ${styles['palBtn_' + sectionStatuses[i]]} ${currentIdx === globalIdx ? styles.palBtnCurrent : ''}`}
                                            onClick={() => goTo(globalIdx)}
                                            title={`Q${i + 1}: ${sectionStatuses[i].replace(/_/g, ' ')}`}
                                        >
                                            {i + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className={styles.legend}>
                            <div className={styles.legendRow}><LegendDot status={STATUS.ANSWERED} /><span>Answered</span></div>
                            <div className={styles.legendRow}><LegendDot status={STATUS.DRAFT} /><span>Marked for Review</span></div>
                            <div className={styles.legendRow}><LegendDot status={STATUS.EMPTY_NEXT} /><span>Skipped</span></div>
                            <div className={styles.legendRow}><LegendDot status={STATUS.NOT_VISITED} /><span>Not Visited</span></div>
                        </div>

                        {/* Summary stats */}
                        <div className={styles.statsSummary}>
                            <div className={styles.summStat}>
                                <span className={styles.summNum} style={{ color: '#22c55e' }}>{answered}</span>
                                <span className={styles.summLabel}>Answered</span>
                            </div>
                            <div className={styles.summStat}>
                                <span className={styles.summNum} style={{ color: '#f59e0b' }}>{draft}</span>
                                <span className={styles.summLabel}>Review</span>
                            </div>
                            <div className={styles.summStat}>
                                <span className={styles.summNum} style={{ color: '#9ca3af' }}>{notVisited + skipped}</span>
                                <span className={styles.summLabel}>Pending</span>
                            </div>
                        </div>

                        {/* Marking scheme */}
                        <div className={styles.scheme}>
                            <div className={styles.schemeTitle}>Marking Scheme</div>
                            <div className={styles.schemeRow}><span className={styles.schemePlus}>+4</span> Correct answer</div>
                            <div className={styles.schemeRow}><span className={styles.schemeMinus}>−1</span> Wrong answer</div>
                            <div className={styles.schemeRow}><span className={styles.schemeZero}>0</span> Skipped/Not attempted</div>
                        </div>

                        <button className={styles.submitBtnFull} onClick={handleSubmit}>
                            🏁 Submit Test
                        </button>
                    </div>
                </aside>

                {/* Mobile sidebar backdrop */}
                {sidebarOpen && <div className={styles.backdrop} onClick={() => setSidebarOpen(false)} />}
            </div>

            {/* Modals */}
            {showConfirm && (
                <ConfirmModal
                    statuses={statuses}
                    onConfirm={handleConfirmSubmit}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            {showResults && !showReview && (
                <ResultsModal
                    questions={questions}
                    answers={answers}
                    statuses={statuses}
                    sections={sections}
                    onClose={() => setShowResults(false)}
                    onReview={() => setShowReview(true)}
                />
            )}
            {showReview && (
                <ReviewModal
                    questions={questions}
                    answers={answers}
                    statuses={statuses}
                    onClose={() => { setShowReview(false); setShowResults(false); }}
                />
            )}

            {/* Time's up overlay */}
            {timesUp && !showResults && (
                <div className={styles.timesUpOverlay}>
                    <div className={styles.timesUpCard}>
                        <div className={styles.timesUpIcon}>⏰</div>
                        <h2>Time&apos;s Up!</h2>
                        <p>Your test has been automatically submitted.</p>
                        <button className={styles.btnPrimary} onClick={() => setShowResults(true)}>View Results</button>
                    </div>
                </div>
            )}
        </div>
    );
}
