import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { submissionsService } from '../../services/submissions.service';
import type { Submission } from '../../types/submission.types';

const AssessmentResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [submission, setSubmission] = useState<Submission | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadSubmission();
    }, [id]);

    const loadSubmission = async () => {
        try {
            setLoading(true);
            const data = await submissionsService.getMySubmission(id!);
            setSubmission(data);
        } catch (error) {
            console.error("Failed to load submission", error);
        } finally {
            setLoading(false);
        }
    };

    const getPercentage = () => {
        if (!submission) return 0;
        return Math.round((submission.score / submission.totalQuestions) * 100);
    };

    const getGradeInfo = () => {
        const percentage = getPercentage();
        if (percentage >= 90) return { grade: 'A', color: 'var(--color-success)', desc: 'Excellent Mastery!' };
        if (percentage >= 80) return { grade: 'B', color: '#0ea5e9', desc: 'Very Good Performance.' };
        if (percentage >= 70) return { grade: 'C', color: '#eab308', desc: 'Good Work, Keep Improving.' };
        if (percentage >= 60) return { grade: 'D', color: '#f97316', desc: 'Satisfactory Performance.' };
        return { grade: 'F', color: 'var(--color-error)', desc: 'Further Study Required.' };
    };

    const getAssessmentTitle = () => {
        if (!submission) return '';
        if (typeof submission.assessmentId === 'object') {
            return (submission.assessmentId as any).title;
        }
        return 'Assessment';
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '80vh' }}>
                <div className="pulse" style={{ color: 'var(--color-text-secondary)' }}>Calculating results...</div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="flex-center" style={{ height: '80vh' }}>
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2>Record not found</h2>
                    <button onClick={() => navigate('/student')}>Back to Dashboard</button>
                </div>
            </div>
        );
    }

    const gradeInfo = getGradeInfo();
    const percentage = getPercentage();

    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem', animation: 'fadeIn 0.6s ease-out' }}>
                <h1 style={{ marginBottom: '0.75rem', fontSize: '3rem', letterSpacing: '-1.5px' }}>Performance Analysis</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem' }}>{getAssessmentTitle()}</p>
            </div>

            <div className="glass-panel" style={{
                padding: '4rem',
                textAlign: 'center',
                marginBottom: '3rem',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeIn 0.8s ease-out'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: gradeInfo.color,
                    opacity: 0.1,
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                }}></div>

                <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>Overall Score</div>
                <div style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>
                    {percentage}%
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: gradeInfo.color, marginBottom: '2rem' }}>
                    {gradeInfo.grade}
                </div>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                    {gradeInfo.desc}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>Score Metrics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Correct Answers</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>{submission.score}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Incorrect/Skipped</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-error)' }}>{submission.totalQuestions - submission.score}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                            <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Total Questions</span>
                            <span style={{ fontWeight: 600 }}>{submission.totalQuestions}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>Completion Data</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Date</span>
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Time</span>
                            <span>{new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Status</span>
                            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Submitted Successfully</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <button
                    onClick={() => navigate('/student/assessments')}
                    style={{
                        padding: '1rem 2.5rem',
                        background: 'var(--color-accent)',
                        color: 'white',
                        border: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    Retake / Explore Others
                </button>
                <button
                    onClick={() => navigate('/student/history')}
                    style={{
                        padding: '1rem 2.5rem',
                        background: 'transparent',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    View History
                </button>
            </div>
        </div>
    );
};

export default AssessmentResult;
