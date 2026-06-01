import React, { useEffect, useState } from 'react';
import { categoriesService } from '../../services/categories.service';
import type { Category, CreateCategoryDto } from '../../types/category.types';

const CategoriesManagement: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<CreateCategoryDto>({ name: '', description: '' });
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await categoriesService.getAll();
            setCategories(data);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to load categories.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.name) return;

        try {
            await categoriesService.create(newCategory);
            setMessage({ type: 'success', text: 'Category created successfully!' });
            setNewCategory({ name: '', description: '' });
            loadCategories();
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Failed to create category.';
            setMessage({ type: 'error', text: errorMsg });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await categoriesService.delete(id);
            setMessage({ type: 'success', text: 'Category deleted successfully.' });
            loadCategories();
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.response?.data?.message || 'Failed to delete category.';
            setMessage({ type: 'error', text: errorMsg });
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2.5rem', borderBottom: '2px solid var(--color-accent)', paddingBottom: '0.5rem', fontSize: '2.5rem' }}>Category Management</h1>

            {message && (
                <div style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                    backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24'
                }}>
                    {message.text}
                </div>
            )}

            <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
                <h3 style={{ marginTop: 0 }}>Add New Category</h3>
                <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Name</label>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}
                            placeholder="e.g. Mathematics"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)', minHeight: '80px' }}
                            placeholder="Optional description"
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 2rem',
                            background: 'var(--color-accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            justifySelf: 'start',
                            transition: 'all 0.2s'
                        }}
                    >
                        Create Category
                    </button>
                </form>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '2rem', fontSize: '1.8rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Existing Categories</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : categories.length === 0 ? (
                    <p>No categories found.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {categories.map((category) => (
                            <li key={category._id} style={{
                                padding: '1.25rem',
                                borderBottom: '1px solid var(--color-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(255, 255, 255, 0.02)',
                                marginBottom: '0.5rem',
                                borderRadius: 'var(--radius-sm)'
                            }}>
                                <div>
                                    <strong style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>{category.name}</strong>
                                    {category.description && <p style={{ margin: '0.4rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{category.description}</p>}
                                </div>
                                <button
                                    onClick={() => handleDelete(category._id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoriesManagement;
