import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'var(--color-text-primary)'
        }}>
            {/* Minimal Header */}
            <header style={{
                padding: '1.5rem 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                    ASCETA-QUIZ
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/login" style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'var(--color-text-primary)',
                        fontWeight: 600,
                        fontSize: '0.95rem'
                    }}>
                        Login
                    </Link>
                    <Link to="/register" style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '8px',
                        background: 'var(--color-accent)',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)'
                    }}>
                        Sign Up
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                padding: '8rem 5% 4rem',
                textAlign: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50px',
                    color: 'var(--color-accent)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    animation: 'fadeIn 1s ease-out'
                }}>
                    ✨ Empowering Education through Technology
                </div>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                    lineHeight: 1.1,
                    fontWeight: 800,
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'fadeIn 1.2s ease-out'
                }}>
                    Modern Assessment <br /> Platform for Everyone
                </h1>
                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '700px',
                    lineHeight: 1.6,
                    animation: 'fadeIn 1.4s ease-out'
                }}>
                    ASCETA-QUIZ provides a seamless, secure, and intuitive environment for educators to create tests and students to excel in their academic journeys.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    marginTop: '2rem',
                    animation: 'fadeIn 1.6s ease-out'
                }}>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            background: 'var(--color-accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(59, 130, 246, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Get Started Today
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                    >
                        View Demo
                    </button>
                </div>

                {/* Trust Section */}
                <div style={{ marginTop: '4rem', opacity: 0.6 }}>
                    <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>
                        Trusted by Educational Institutions Worldwide
                    </p>
                    <div className="flex-center" style={{ gap: '3rem', flexWrap: 'wrap' }}>
                        {['University of Excellence', 'Global Learning Inst.', 'Modern High School', 'Tech Academy'].map(brand => (
                            <span key={brand} style={{ fontSize: '1.1rem', fontWeight: 600 }}>{brand}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                padding: '6rem 5%',
                background: 'rgba(30, 41, 59, 0.5)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose ASCETA-QUIZ?</h2>
                        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            We provide the tools you need to create, manage, and analyze assessments with ease.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            { title: 'Easy Management', icon: '📋', desc: 'Create and organize categories and assessments in minutes.' },
                            { title: 'Real-time Analytics', icon: '📊', desc: 'Track performance and progress with detailed visual insights.' },
                            { title: 'Mobile First', icon: '📱', desc: 'Students can take assessments on any device, anywhere.' },
                            { title: 'Secure & Proctored', icon: '🛡️', desc: 'Built-in security features to maintain academic integrity.' },
                            { title: 'Cloud Based', icon: '☁️', desc: 'Access your dashboard anytime with our reliable cloud platform.' },
                            { title: '24/7 Support', icon: '💬', desc: 'Our team is here to help you every step of the way.' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-panel" style={{
                                padding: '2rem',
                                transition: 'transform 0.3s ease',
                                cursor: 'default'
                            }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section style={{
                padding: '6rem 5%',
                textAlign: 'center'
            }}>
                <div className="glass-panel" style={{
                    padding: '4rem 2rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: 'linear-gradient(rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to transform your assessments?</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                        Join thousands of students and educators already using ASCETA-QUIZ.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.1rem',
                            background: 'white',
                            color: '#0f172a',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Create Free Account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '4rem 5%',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    <div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                            ASCETA-QUIZ
                        </div>
                        <p>© 2026 ASCETA-QUIZ. All rights reserved.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '4rem' }}>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Platform</h4>
                            <div className="flex-col" style={{ gap: '0.5rem' }}>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                                <a href="#">Assessments</a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Company</h4>
                            <div className="flex-col" style={{ gap: '0.5rem' }}>
                                <a href="#">About Us</a>
                                <a href="#">Contact</a>
                                <a href="#">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
