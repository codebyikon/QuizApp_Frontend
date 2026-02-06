import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submissionsService } from '../../services/submissions.service';
import { assessmentsService } from '../../services/assessments.service';
import type { Submission } from '../../types/submission.types';
import type { Assessment } from '../../types/assessment.types';

const Analytics: React.FC = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        studentId: '',
        assessmentId: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        fetchSubmissions();
    }, [filters]);

    const loadData = async () => {
        try {
            const assessmentsData = await assessmentsService.getAll();
            setAssessments(assessmentsData);
            await fetchSubmissions();
        } catch (error) {
            console.error("Failed to load analytics data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const data = await submissionsService.getAllSubmissions({
                studentId: filters.studentId || undefined,
                assessmentId: filters.assessmentId || undefined
            });
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        }
    };

    const getPercentage = (submission: Submission) => {
        return Math.round((submission.score / submission.totalQuestions) * 100);
    };

    const getAverageScore = () => {
        if (submissions.length === 0) return 0;
        const totalPercentage = submissions.reduce((acc, curr) => acc + getPercentage(curr), 0);
        return Math.round(totalPercentage / submissions.length);
    };

    const getStudentName = (submission: Submission) => {
        if (typeof submission.studentId === 'object') {
            return (submission.studentId as any).name;
        }
        return 'Unknown Student';
    };

    const getAssessmentTitle = (submission: Submission) => {
        if (typeof submission.assessmentId === 'object') {
            return (submission.assessmentId as any).title;
        }
        return 'Unknown Assessment';
    };

    return (
        <div style={{ padding: 'clamp(1rem, 5vw, 2rem)', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', margin: 0 }}>Assessment Analytics</h1>
                <button onClick={() => navigate('/admin')} style={{ padding: '0.6rem 1.2rem', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}>
                    Back to Dashboard
                </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)' }}>Total Submissions</h4>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>{submissions.length}</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)' }}>Average Score</h4>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-success)' }}>{getAverageScore()}%</div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)' }}>Assessments</h4>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>{assessments.length}</div>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Filter by Assessment</label>
                    <select
                        value={filters.assessmentId}
                        onChange={(e) => setFilters({ ...filters, assessmentId: e.target.value })}
                        style={{ width: '100%', padding: '0.8rem' }}
                    >
                        <option value="">All Assessments</option>
                        {assessments.map(a => (
                            <option key={a._id} value={a._id}>{a.title}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button
                        onClick={() => setFilters({ studentId: '', assessmentId: '' })}
                        style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--color-border)', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
                <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Recent Submissions</h3>
                {loading ? (
                    <p style={{ color: 'var(--color-text-secondary)' }}>Loading analytics...</p>
                ) : submissions.length === 0 ? (
                    <p style={{ color: 'var(--color-text-secondary)' }}>No submissions found.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Student</th>
                                <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Assessment</th>
                                <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Score</th>
                                <th style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Submitted At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((s) => (
                                <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1.2rem 1rem', fontWeight: 500 }}>{getStudentName(s)}</td>
                                    <td style={{ padding: '1.2rem 1rem' }}>{getAssessmentTitle(s)}</td>
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <span style={{
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '6px',
                                            background: getPercentage(s) >= 70 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: getPercentage(s) >= 70 ? 'var(--color-success)' : 'var(--color-error)',
                                            fontWeight: 'bold',
                                            fontSize: '0.85rem'
                                        }}>
                                            {s.score}/{s.totalQuestions} ({getPercentage(s)}%)
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.2rem 1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        {new Date(s.submittedAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Analytics;
