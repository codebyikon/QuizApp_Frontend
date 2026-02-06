import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const stats = [
        { label: 'Units Mastered', value: '12', icon: '🏆' },
        { label: 'Avg. Score', value: '88%', icon: '📈' },
        { label: 'Tests Taken', value: '24', icon: '📝' }
    ];

    const actions = [
        { title: 'Explore Categories', desc: 'Browse subjects and knowledge areas.', link: '/student/categories', color: '#6366f1' },
        { title: 'Take Assessment', desc: 'Start a new test and challenge yourself.', link: '/student/assessments', color: '#3b82f6' },
        { title: 'View History', desc: 'Review your past performance and results.', link: '/student/history', color: '#2dd4bf' }
    ];

    return (
        <div style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', margin: '0 0 0.5rem 0' }}>Welcome back, {user?.name.split(' ')[0]}!</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Ready to continue your learning journey?</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', animation: 'fadeIn 0.5s ease-out' }}>
                        <div style={{ fontSize: '2.5rem' }}>{stat.icon}</div>
                        <div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '1.5rem' }}>Jump In</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {actions.map((action, i) => (
                    <div key={i} className="glass-panel"
                        style={{
                            padding: '2rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            borderLeft: `6px solid ${action.color}`,
                            animation: `slideInRight ${0.3 + i * 0.1}s ease-out`
                        }}
                        onClick={() => navigate(action.link)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(10px)';
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)';
                        }}
                    >
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>{action.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>{action.desc}</p>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '3rem', padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', fontSize: '12rem', opacity: 0.05 }}>✨</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Keep up the great work!</h3>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                    Consistency is the key to mastery. You've completed 5 assessments this week. Keep hitting your targets!
                </p>
                <button
                    onClick={() => navigate('/student/assessments')}
                    style={{ background: 'var(--color-accent)', color: 'white', border: 'none', padding: '1rem 2rem', fontWeight: 'bold' }}
                >
                    Start Next Assessment
                </button>
            </div>
        </div>
    );
};

export default StudentDashboard;
