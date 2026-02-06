import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav style={{
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            flexWrap: 'wrap',
            gap: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to={user.role === 'admin' ? '/admin' : '/student'} style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--color-accent)',
                    textDecoration: 'none',
                    marginRight: '1rem'
                }}>
                    ASCETA-QUIZ
                </Link>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }} className="nav-links">
                    {user.role === 'admin' ? (
                        <>
                            <Link to="/admin" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
                            <Link to="/admin/categories" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Categories</Link>
                            <Link to="/admin/assessments" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Assessments</Link>
                            <Link to="/admin/analytics" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Analytics</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/student" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
                            <Link to="/student/categories" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Browse</Link>
                            <Link to="/student/assessments" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Tests</Link>
                            <Link to="/student/history" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>History</Link>
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right', display: 'none' }} className="user-info-desktop">
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>{user.role}</div>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.85rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--color-error)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                    }}
                >
                    Logout
                </button>
            </div>
            <style>{`
                @media (min-width: 640px) {
                    nav { padding: 1rem 2rem !important; }
                    .user-info-desktop { display: block !important; }
                }
                @media (max-width: 640px) {
                    .nav-links { order: 3; width: 100%; justify-content: center; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05); }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
