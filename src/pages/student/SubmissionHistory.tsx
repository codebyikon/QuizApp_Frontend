import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submissionsService } from '../../services/submissions.service';
import Pagination from '../../components/Pagination';
import type { Submission } from '../../types/submission.types';

const SubmissionHistory: React.FC = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = async () => {
        try {
            setLoading(true);
            const data = await submissionsService.getMySubmissions();
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to load submissions", error);
        } finally {
            setLoading(false);
        }
    };

    const getPercentage = (submission: Submission) => {
        return Math.round((submission.score / submission.totalQuestions) * 100);
    };

    const getGradeColor = (percentage: number) => {
        if (percentage >= 90) return 'var(--color-success)';
        if (percentage >= 80) return '#0ea5e9';
        if (percentage >= 70) return '#eab308';
        if (percentage >= 60) return '#f97316';
        return 'var(--color-error)';
    };

    const getAssessmentTitle = (submission: Submission) => {
        if (typeof submission.assessmentId === 'object') {
            return submission.assessmentId.title;
        }
        return 'Assessment';
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem' }}>My Experience History</h1>
            </div>

            {loading ? (
                <div className="flex-center" style={{ height: '40vh' }}>
                    <div className="pulse" style={{ color: 'var(--color-text-secondary)' }}>Loading history...</div>
                </div>
            ) : submissions.length === 0 ? (
                <div className="glass-panel flex-center" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div>
                        <h2 style={{ color: 'var(--color-text-secondary)' }}>No submissions yet</h2>
                        <p>You haven't completed any assessments yet.</p>
                        <button
                            onClick={() => navigate('/student/assessments')}
                            style={{ marginTop: '1.5rem', background: 'var(--color-accent)', color: 'white', border: 'none' }}
                        >
                            Browse Assessments
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {currentItems.map((submission) => {
                            const percentage = getPercentage(submission);
                            const gradeColor = getGradeColor(percentage);

                            return (
                                <div
                                    key={submission._id}
                                    className="glass-panel"
                                    style={{
                                        padding: '1.5rem 2rem',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto auto',
                                        gap: '2rem',
                                        alignItems: 'center',
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        borderLeft: `4px solid ${gradeColor}`
                                    }}
                                    onClick={() => navigate(`/student/result/${submission._id}`)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.01)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                                            {getAssessmentTitle(submission)}
                                        </h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                                            <span>📅 {new Date(submission.submittedAt).toLocaleDateString()}</span>
                                            <span>🕒 {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'center', borderRight: '1px solid var(--color-border)', borderLeft: '1px solid var(--color-border)', padding: '0 2rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Score</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{submission.score} / {submission.totalQuestions}</div>
                                    </div>

                                    <div style={{ textAlign: 'center', minWidth: '80px' }}>
                                        <div style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: gradeColor,
                                            background: `rgba(${gradeColor === 'var(--color-success)' ? '16, 185, 129' : '239, 68, 68'}, 0.1)`,
                                            padding: '0.5rem',
                                            borderRadius: '12px'
                                        }}>
                                            {percentage}%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={submissions.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default SubmissionHistory;
