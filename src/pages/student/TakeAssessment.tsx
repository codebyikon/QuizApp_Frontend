import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessmentsService } from '../../services/assessments.service';
import { submissionsService } from '../../services/submissions.service';
import type { Assessment } from '../../types/assessment.types';

const TakeAssessment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [assessment, setAssessment] = useState<Assessment | null>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [started, setStarted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        loadAssessment();
    }, [id]);

    useEffect(() => {
        if (started && timeRemaining !== null && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timer);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [started, timeRemaining]);

    const loadAssessment = async () => {
        try {
            setLoading(true);
            const data = await assessmentsService.getOne(id!);
            setAssessment(data);
            setAnswers(new Array(data.questions.length).fill(-1));
            if (data.duration) {
                setTimeRemaining(data.duration * 60);
            }
        } catch (error) {
            console.error("Failed to load assessment", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = () => {
        setStarted(true);
    };

    const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        if (!assessment) return;

        const unanswered = answers.filter(a => a === -1).length;
        if (unanswered > 0 && timeRemaining !== 0) {
            if (!window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
                return;
            }
        }

        try {
            setSubmitting(true);
            const result = await submissionsService.submit({
                assessmentId: assessment._id,
                answers: answers.map(a => a === -1 ? 0 : a)
            });
            navigate(`/student/result/${result._id}`);
        } catch (error) {
            console.error("Failed to submit assessment", error);
            alert('Failed to submit assessment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '80vh' }}>
                <div className="pulse" style={{ color: 'var(--color-text-secondary)' }}>Loading assessment...</div>
            </div>
        );
    }

    if (!assessment) {
        return (
            <div className="flex-center" style={{ height: '80vh' }}>
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2>Assessment not found</h2>
                    <button onClick={() => navigate('/student/assessments')} style={{ marginTop: '1rem' }}>Back to Assessments</button>
                </div>
            </div>
        );
    }

    if (!started) {
        return (
            <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <div className="glass-panel" style={{ padding: '3rem', animation: 'fadeIn 0.5s ease-out' }}>
                    <h1 style={{ marginTop: 0, fontSize: '2.5rem', letterSpacing: '-1px' }}>{assessment.title}</h1>
                    <div style={{ display: 'flex', gap: '2rem', margin: '2rem 0' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Questions</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{assessment.questions.length} Items</div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Limit</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{assessment.duration ? `${assessment.duration} Minutes` : 'Unlimited'}</div>
                        </div>
                    </div>

                    <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--color-accent)' }}>
                        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-accent)' }}>Exam Protocol</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                            <li>Ensure you have a stable internet connection.</li>
                            <li>The timer will start as soon as you begin.</li>
                            <li>Answers are saved temporarily but only finalized on submission.</li>
                            <li>You can navigate between questions using the numbers below.</li>
                        </ul>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                        <button
                            onClick={handleStart}
                            style={{ padding: '1rem 2.5rem', background: 'var(--color-accent)', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}
                        >
                            Begin Assessment
                        </button>
                        <button
                            onClick={() => navigate('/student/assessments')}
                            style={{ padding: '1rem 2.5rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = assessment.questions[currentQuestion];

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1rem 0',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{assessment.title}</h2>
                    <div style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                        Question {currentQuestion + 1} of {assessment.questions.length}
                    </div>
                </div>

                {timeRemaining !== null && (
                    <div style={{
                        padding: '0.8rem 1.5rem',
                        background: timeRemaining < 60 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                        color: timeRemaining < 60 ? 'var(--color-error)' : 'var(--color-accent)',
                        border: `1px solid ${timeRemaining < 60 ? 'var(--color-error)' : 'var(--color-accent)'}`,
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.4rem' }}>{timeRemaining < 60 ? '⚠️' : '⏱️'}</span>
                        {formatTime(timeRemaining)}
                    </div>
                )}
            </div>

            {/* Question Card */}
            <div style={{ flex: 1 }}>
                <div key={currentQuestion} className="glass-panel" style={{ padding: '3rem', animation: 'slideInRight 0.3s ease-out' }}>
                    <p style={{ fontSize: '1.4rem', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 500 }}>
                        {currentQ.text}
                    </p>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQ.options.map((option, oIndex) => (
                            <label
                                key={oIndex}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1.25rem 1.5rem',
                                    border: `1px solid ${answers[currentQuestion] === oIndex ? 'var(--color-accent)' : 'var(--color-border)'}`,
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    background: answers[currentQuestion] === oIndex ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    if (answers[currentQuestion] !== oIndex) {
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (answers[currentQuestion] !== oIndex) {
                                        e.currentTarget.style.borderColor = 'var(--color-border)';
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                }}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion}`}
                                    checked={answers[currentQuestion] === oIndex}
                                    onChange={() => handleAnswerChange(currentQuestion, oIndex)}
                                    style={{
                                        marginRight: '1.2rem',
                                        width: '22px',
                                        height: '22px',
                                        cursor: 'pointer',
                                        accentColor: 'var(--color-accent)'
                                    }}
                                />
                                <span style={{ fontSize: '1.1rem', color: answers[currentQuestion] === oIndex ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / Navigation */}
            <div style={{
                marginTop: '2rem',
                padding: '2rem 1rem',
                borderTop: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
                    {assessment.questions.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentQuestion(idx)}
                            style={{
                                width: '40px',
                                height: '40px',
                                padding: 0,
                                borderRadius: '8px',
                                background: currentQuestion === idx
                                    ? 'var(--color-accent)'
                                    : answers[idx] !== -1
                                        ? 'rgba(16, 185, 129, 0.1)'
                                        : 'var(--color-bg-secondary)',
                                color: currentQuestion === idx
                                    ? 'white'
                                    : answers[idx] !== -1
                                        ? 'var(--color-success)'
                                        : 'var(--color-text-secondary)',
                                border: currentQuestion === idx
                                    ? 'none'
                                    : `1px solid ${answers[idx] !== -1 ? 'var(--color-success)' : 'var(--color-border)'}`,
                                fontWeight: 'bold'
                            }}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            disabled={currentQuestion === 0}
                            onClick={() => setCurrentQuestion(prev => prev - 1)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                color: currentQuestion === 0 ? 'var(--color-border)' : 'var(--color-text-primary)'
                            }}
                        >
                            &larr; Previous
                        </button>
                        <button
                            disabled={currentQuestion === assessment.questions.length - 1}
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                color: currentQuestion === assessment.questions.length - 1 ? 'var(--color-border)' : 'var(--color-text-primary)'
                            }}
                        >
                            Next &rarr;
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        style={{
                            padding: '1rem 3rem',
                            background: 'var(--color-success)',
                            color: 'white',
                            border: 'none',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        {submitting ? 'Processing...' : 'Finish & Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TakeAssessment;
