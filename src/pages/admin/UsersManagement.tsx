import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import type { RegisterDto } from '../../types/auth.types';

const UsersManagement: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'admin'>('student');
    const [sex, setSex] = useState<'male' | 'female'>('male');
    const [classLevel, setClassLevel] = useState<'NCE I' | 'NCE II' | 'NCE III'>('NCE I');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const data: RegisterDto = { name, email, password, role, sex, class_level: classLevel };
            if (role === 'admin') {
                delete data.sex;
                delete data.class_level;
            }
            await authService.createAdminOrUser(data);
            setSuccess(`Successfully created ${role} account for ${name}!`);
            setName(''); setEmail(''); setPassword('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create user. Ensure email is unique.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', margin: '0 0 0.5rem 0' }}>User Management</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Provision new administrators and students manually.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '600px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
                <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem' }}>Create New User</h2>
                
                {error && <div style={{ padding: '1rem', background: 'rgba(239, 64, 64, 0.1)', border: '1px solid var(--color-error)', borderRadius: '8px', color: 'var(--color-error)', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}
                {success && <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)', borderRadius: '8px', color: 'var(--color-success)', marginBottom: '1.5rem', textAlign: 'center' }}>{success}</div>}

                <form onSubmit={handleSubmit} autoComplete="off" className="flex-col" style={{ gap: '1.5rem' }}>
                    <div className="flex-col" style={{ gap: '0.4rem' }}>
                        <label htmlFor="role" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Account Role</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value as any)} style={{ padding: '0.8rem 1rem', background: 'var(--color-bg-primary)', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <option value="student">Student</option>
                            <option value="admin">Administrator (Full Access)</option>
                        </select>
                    </div>
                    <div className="flex-col" style={{ gap: '0.4rem' }}>
                        <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Full Name</label>
                        <input id="name" type="text" autoComplete="nope" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '0.8rem 1rem' }} />
                    </div>
                    <div className="flex-col" style={{ gap: '0.4rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Email Address</label>
                        <input id="email" type="email" autoComplete="new-email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '0.8rem 1rem' }} />
                    </div>
                    <div className="flex-col" style={{ gap: '0.4rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Initial Temporary Password <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>(min 6 chars)</span></label>
                        <input id="password" type="text" autoComplete="new-password" placeholder="Visible for admin to share securely" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '0.8rem 1rem' }} />
                    </div>

                    {role === 'student' && (
                        <>
                            <div className="flex-col" style={{ gap: '0.4rem' }}>
                                <label htmlFor="sex" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Gender</label>
                                <select id="sex" value={sex} onChange={(e) => setSex(e.target.value as any)} style={{ padding: '0.8rem 1rem', background: 'var(--color-bg-primary)' }}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="flex-col" style={{ gap: '0.4rem' }}>
                                <label htmlFor="classLevel" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Class Level</label>
                                <select id="classLevel" value={classLevel} onChange={(e) => setClassLevel(e.target.value as any)} style={{ padding: '0.8rem 1rem', background: 'var(--color-bg-primary)' }}>
                                    <option value="NCE I">NCE I</option>
                                    <option value="NCE II">NCE II</option>
                                    <option value="NCE III">NCE III</option>
                                </select>
                            </div>
                        </>
                    )}

                    <button type="submit" disabled={loading} style={{ marginTop: '1rem', backgroundColor: 'var(--color-accent)', color: 'white', padding: '1rem', fontWeight: 'bold', fontSize: '1.1rem', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}>
                        {loading ? 'Creating Account...' : `Create ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsersManagement;
