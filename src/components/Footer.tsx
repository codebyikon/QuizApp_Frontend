import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_LOGO = "/logo.png";

const Footer: React.FC = () => {
    return (
        <footer style={{
            background: 'linear-gradient(to bottom, #0f172a, #020617)',
            color: 'var(--color-text-secondary)',
            marginTop: 'auto',
            width: '100%',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Top decorative gradient line */}
            <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)', opacity: 0.5 }}></div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 5% 2rem 5%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
                    
                    {/* Brand Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}>
                            <img src={DEFAULT_LOGO} alt="Asceta Logo" style={{ height: '45px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>ASCETA-QUIZ</span>
                        </Link>
                        <p style={{ lineHeight: 1.6, fontSize: '0.95rem', margin: 0, opacity: 0.8 }}>
                            Empowering modern education with intuitive, secure, and highly scalable assessment solutions for the next generation of learners.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            {[
                                { name: 'WhatsApp', short: 'WA' },
                                { name: 'LinkedIn', short: 'IN' },
                                { name: 'Phone', short: 'PH' }
                            ].map(contact => (
                                <a key={contact.name} href="#" title={contact.name} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{contact.short}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Platform</h4>
                        {['Features', 'Pricing', 'Testimonials', 'Integrations'].map(link => (
                            <a key={link} href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>{link}</a>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Resources</h4>
                        {['Documentation', 'Help Center', 'Blog', 'API Reference'].map(link => (
                            <a key={link} href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>{link}</a>
                        ))}
                    </div>

                    {/* Newsletter Subscribe */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Stay Updated</h4>
                        <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8 }}>Get the latest news and platform updates delivered to your inbox.</p>
                        <div style={{ display: 'flex', marginTop: '0.5rem' }}>
                            <input type="email" placeholder="Email address" style={{ padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px 0 0 8px', color: 'white', outline: 'none', flex: 1, minWidth: '0' }} />
                            <button style={{ padding: '0 1.2rem', background: 'var(--color-accent)', color: 'white', border: 'none', borderRadius: '0 8px 8px 0', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} ASCETA-QUIZ Inc. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>Privacy Policy</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
