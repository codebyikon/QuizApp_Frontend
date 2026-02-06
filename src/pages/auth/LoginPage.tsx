import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import type { User } from '../../types/auth.types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user: User = await login({ email, password });
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (err: any) {
      setError('Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', width: '100%', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)', padding: '1rem' }}>
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px', animation: 'fadeIn 0.6s ease-out', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
          <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-1px', color: 'var(--color-accent)' }}>ASCETA-QUIZ</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Empowering Your Academic Journey</p>
        </div>

        {error && (
          <div style={{
            padding: '1rem',
            background: 'rgba(239, 64, 64, 0.1)',
            border: '1px solid var(--color-error)',
            borderRadius: '8px',
            color: 'var(--color-error)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '1.5rem' }}>
          <div className="flex-col" style={{ gap: '0.5rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '0.8rem 1rem' }}
            />
          </div>
          <div className="flex-col" style={{ gap: '0.5rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '0.8rem 1rem' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              padding: '1rem',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Create one now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
