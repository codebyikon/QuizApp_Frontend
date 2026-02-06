import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Active Students', value: '1,280', icon: '👥', color: '#6366f1' },
        { label: 'Total Assessments', value: '84', icon: '📝', color: '#3b82f6' },
        { label: 'Avg. Pass Rate', value: '76%', icon: '✅', color: '#10b981' },
        { label: 'Pending Reviews', value: '12', icon: '⏳', color: '#eab308' }
    ];

    const modules = [
        { title: 'Category Management', desc: 'Define and organize assessment topics.', link: '/admin/categories', icon: '📁' },
        { title: 'Assessment Builder', desc: 'Create and edit tests with dynamic questions.', link: '/admin/assessments', icon: '🛠️' },
        { title: 'System Analytics', desc: 'Deep dive into student performance data.', link: '/admin/analytics', icon: '📊' }
    ];

    return (
        <div style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', margin: '0 0 0.5rem 0' }}>Control Center</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>Managing the ASCETA-QUIZ Platform.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '1.5rem', animation: 'fadeIn 0.5s ease-out' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{stat.icon}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                        <div style={{ width: '100%', height: '4px', background: `${stat.color}20`, marginTop: '1rem', borderRadius: '4px' }}>
                            <div style={{ width: '70%', height: '100%', background: stat.color, borderRadius: '4px' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 style={{ marginBottom: '2rem' }}>Management Modules</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {modules.map((mod, i) => (
                    <div key={i} className="glass-panel"
                        style={{
                            padding: '2.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            animation: `slideInRight ${0.3 + i * 0.1}s ease-out`
                        }}
                        onClick={() => navigate(mod.link)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                        }}
                    >
                        <div style={{ fontSize: '2.5rem' }}>{mod.icon}</div>
                        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{mod.title}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{mod.desc}</p>
                        <div style={{ marginTop: '1rem', fontWeight: 600, color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Access Module <span>&rarr;</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ marginTop: '4rem', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>System Status</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>All systems operational. Last backup 2h ago.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontWeight: 600 }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--color-success)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-success)' }}></div>
                    Live
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
