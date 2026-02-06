import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../types/category.types';

const CategoryList: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoriesService.getAll();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div style={{ padding: 'clamp(1rem, 5vw, 2rem)' }}>
            <h1 style={{ marginBottom: '2.5rem', fontSize: 'clamp(2rem, 8vw, 2.5rem)' }}>Knowledge Areas</h1>

            {loading ? (
                <div className="flex-center" style={{ height: '40vh' }}>
                    <div className="pulse" style={{ color: 'var(--color-text-secondary)' }}>Gathering categories...</div>
                </div>
            ) : categories.length === 0 ? (
                <div className="glass-panel flex-center" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div>
                        <h2 style={{ color: 'var(--color-text-secondary)' }}>No categories found</h2>
                        <p>Our curriculum is currently being updated. Please check back later.</p>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem'
                }}>
                    {categories.map((category) => (
                        <div key={category._id}
                            className="glass-panel"
                            style={{
                                padding: '2rem',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                                animation: 'fadeIn 0.5s ease-out',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: 'var(--color-accent)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                marginBottom: '1.5rem'
                            }}>
                                📚
                            </div>
                            <h3 style={{ marginTop: 0, fontSize: '1.4rem', color: 'var(--color-text-primary)' }}>{category.name}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '2rem' }}>
                                {category.description || 'Dive into comprehensive assessments and track your mastery in this subject area.'}
                            </p>
                            <button
                                onClick={() => navigate(`/student/assessments?categoryId=${category._id}`)}
                                style={{
                                    padding: '0.75rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 600,
                                    width: '100%',
                                    marginTop: 'auto'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--color-accent)';
                                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                }}
                            >
                                Explorer Units
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
