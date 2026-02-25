'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './QuizEngine.module.css';

/* ─── Status constants ─── */
const STATUS = {
    NOT_VISITED: 'not_visited',
    ANSWERED: 'answered',
    DRAFT: 'draft',         // marked for review
    EMPTY_NEXT: 'empty_next', // skipped without answering
};

/* ─── Format seconds to MM:SS ─── */
function fmt(secs) {
    const m = Math.floor(Math.abs(secs) / 60).toString().padStart(2, '0');
    const s = (Math.abs(secs) % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

/* ─── Legend dot ─── */
function LegendDot({ status }) {
    return <span className={`${styles.dot} ${styles['dot_' + status]}`} />;
}

/* ─── Results Modal ─── */
function ResultsModal({ questions, answers, statuses, onClose, onReview }) {
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
    const pct = Math.round((marks / maxMarks) * 100);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <span className={styles.modalIcon}>🎓</span>
                    <h2 className={styles.modalTitle}>Result Summary</h2>
                    <p className={styles.modalSub}>Quantitative Aptitude · Ratio &amp; Proportions</p>
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

                {/* Per-question breakdown */}
                <div className={styles.breakdown}>
                    <h3 className={styles.breakdownTitle}>Question-wise Breakdown</h3>
                    <div className={styles.breakdownList}>
                        {questions.map((q, i) => {
                            const isAnswered = statuses[i] === STATUS.ANSWERED;
                            const isCorrect = isAnswered && answers[i] === q.answer;
                            let icon = '⬜';
                            if (statuses[i] === STATUS.DRAFT) icon = '🟡';
                            else if (isAnswered) icon = isCorrect ? '🟢' : '🔴';
                            return (
                                <div key={i} className={styles.bRow}>
                                    <span className={styles.bNum}>Q{i + 1}</span>
                                    <span className={styles.bIcon}>{icon}</span>
                                    <span className={styles.bStatus}>
                                        {isAnswered
                                            ? (isCorrect ? `Correct (${answers[i].toUpperCase()})` : `Wrong — you: ${answers[i].toUpperCase()}, ans: ${q.answer.toUpperCase()}`)
                                            : statuses[i] === STATUS.DRAFT
                                                ? `Review (${answers[i] ? answers[i].toUpperCase() : '—'})`
                                                : 'Skipped'}
                                    </span>
                                </div>
                            );
                        })}
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

                {/* Nav dots */}
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
   MAIN QUIZ ENGINE
══════════════════════════════════════════ */
export default function QuizEngine({ questions, meta = {} }) {
    const TOTAL_SECS = 60 * 60; // 60 minutes
    const WARN_SECS = 2 * 60;   // 2-minute per-question warning

    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
    const [statuses, setStatuses] = useState(() => Array(questions.length).fill(STATUS.NOT_VISITED));
    const [selected, setSelected] = useState(null); // current selection (not yet saved)

    const [totalSecs, setTotalSecs] = useState(TOTAL_SECS);
    const [qSecs, setQSecs] = useState(0); // seconds spent on current question
    const [qWarn, setQWarn] = useState(false);
    const [timesUp, setTimesUp] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar

    const totalRef = useRef(TOTAL_SECS);
    const qRef = useRef(0);

    /* ─── Mark first question as active ─── */
    useEffect(() => {
        setStatuses(prev => {
            const n = [...prev];
            if (n[0] === STATUS.NOT_VISITED) n[0] = STATUS.NOT_VISITED; // stays as not_visited until action
            return n;
        });
    }, []);

    /* ─── Global countdown timer ─── */
    useEffect(() => {
        if (showResults) return;
        const id = setInterval(() => {
            setTotalSecs(prev => {
                const next = prev - 1;
                totalRef.current = next;
                if (next <= 0) {
                    clearInterval(id);
                    setTimesUp(true);
                    handleAutoSubmit();
                }
                return next;
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
    }, [currentIdx, answers]);

    /* ─── Auto-submit when time is up ─── */
    function handleAutoSubmit() {
        setShowConfirm(false);
        setShowResults(true);
    }

    /* ─── Navigate to question ─── */
    const goTo = useCallback((idx) => {
        setCurrentIdx(idx);
        setSidebarOpen(false);
    }, []);

    /* ─── Save & move to next ─── */
    function handleSaveNext() {
        if (selected === null) return; // nothing selected — treat as skip
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = selected;
        newStatuses[currentIdx] = STATUS.ANSWERED;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        if (currentIdx < questions.length - 1) goTo(currentIdx + 1);
    }

    /* ─── Save as draft (mark for review) ─── */
    function handleDraft() {
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = selected; // save whatever is selected (or null)
        newStatuses[currentIdx] = STATUS.DRAFT;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        if (currentIdx < questions.length - 1) goTo(currentIdx + 1);
    }

    /* ─── Clear & move next (leave empty) ─── */
    function handleClearNext() {
        const newAnswers = [...answers];
        const newStatuses = [...statuses];
        newAnswers[currentIdx] = null;
        newStatuses[currentIdx] = STATUS.EMPTY_NEXT;
        setAnswers(newAnswers);
        setStatuses(newStatuses);
        setSelected(null);
        if (currentIdx < questions.length - 1) goTo(currentIdx + 1);
    }

    /* ─── Clear current selection ─── */
    function handleClear() {
        setSelected(null);
    }

    /* ─── Submit ─── */
    function handleSubmit() {
        setShowConfirm(true);
    }

    function handleConfirmSubmit() {
        setShowConfirm(false);
        setShowResults(true);
    }

    /* ─── Timer color ─── */
    const timerDanger = totalSecs <= 300; // last 5 minutes
    const timerWarn = totalSecs <= 600 && !timerDanger;

    const q = questions[currentIdx];
    const answered = statuses.filter(s => s === STATUS.ANSWERED).length;
    const draft = statuses.filter(s => s === STATUS.DRAFT).length;
    const notVisited = statuses.filter(s => s === STATUS.NOT_VISITED).length;
    const skipped = statuses.filter(s => s === STATUS.EMPTY_NEXT).length;

    return (
        <div className={styles.shell}>
            {/* ═══ TOP BAR ═══ */}
            <header className={styles.topbar}>
                <div className={styles.topbarLeft}>
                    <span className={styles.examTitle}>{meta.title || 'Quantitative Aptitude'}</span>
                    <span className={styles.examSub}>{meta.subject || 'Ratio & Proportions — Paper 1'}</span>
                </div>

                <div className={styles.topbarCenter}>
                    {/* Global timer */}
                    <div className={`${styles.timerBox} ${timerDanger ? styles.timerDanger : timerWarn ? styles.timerWarn : ''}`}>
                        <span className={styles.timerIcon}>⏱</span>
                        <span className={styles.timerValue}>{fmt(totalSecs)}</span>
                        <span className={styles.timerLabel}>remaining</span>
                    </div>
                </div>

                <div className={styles.topbarRight}>
                    {/* Mobile: open sidebar */}
                    <button className={styles.sidebarToggle} onClick={() => setSidebarOpen(true)} aria-label="Question palette">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                        <span>Palette</span>
                    </button>
                    <button className={styles.submitBtn} onClick={handleSubmit}>Submit Test</button>
                </div>
            </header>

            {/* ═══ BODY ═══ */}
            <div className={styles.body}>

                {/* ── LEFT: Question panel (75%) ── */}
                <main className={styles.questionPanel}>
                    <div className={styles.qHeader}>
                        <div className={styles.qMeta}>
                            <span className={styles.qNum}>Question {currentIdx + 1} <span className={styles.qOf}>of {questions.length}</span></span>
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
                            disabled={currentIdx === 0}
                        >← Previous</button>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
                        </div>
                        <button
                            className={styles.navBtn}
                            onClick={() => goTo(currentIdx + 1)}
                            disabled={currentIdx === questions.length - 1}
                        >Next →</button>
                    </div>
                </main>

                {/* ── RIGHT: Question palette (25%) ── */}
                <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
                    {/* Mobile close */}
                    <button className={styles.sidebarClose} onClick={() => setSidebarOpen(false)}>✕ Close</button>

                    <div className={styles.sidebarInner}>
                        <div className={styles.sidebarSection}>
                            <h3 className={styles.sidebarTitle}>Question Palette</h3>
                            <div className={styles.palette}>
                                {questions.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.palBtn} ${styles['palBtn_' + statuses[i]]} ${currentIdx === i ? styles.palBtnCurrent : ''}`}
                                        onClick={() => goTo(i)}
                                        title={`Q${i + 1}: ${statuses[i].replace(/_/g, ' ')}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
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
