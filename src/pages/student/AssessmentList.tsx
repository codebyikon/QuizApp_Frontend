import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { assessmentsService } from '../../services/assessments.service';
import { categoriesService } from '../../services/categories.service';
import Pagination from '../../components/Pagination';
import type { Assessment } from '../../types/assessment.types';
import type { Category } from '../../types/category.types';

const AssessmentList: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('categoryId');

    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || '');
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadAssessments();
    }, [selectedCategory]);

    const loadCategories = async () => {
        try {
            const data = await categoriesService.getAll();
            setCategories(data);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };

    const loadAssessments = async () => {
        try {
            setLoading(true);
            const data = await assessmentsService.getAll(selectedCategory || undefined);
            setAssessments(data);
            setCurrentPage(1); // Reset to first page on new data
        } catch (error) {
            console.error("Failed to load assessments", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryName = (categoryId: string | { _id: string; name: string }) => {
        if (typeof categoryId === 'object') {
            return categoryId.name;
        }
        const category = categories.find(c => c._id === categoryId);
        return category?.name || 'Unknown';
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = assessments.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Available Assessments</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem',
                            minWidth: '200px'
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex-center" style={{ height: '40vh' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div className="pulse" style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>Loading assessments...</div>
                    </div>
                </div>
            ) : assessments.length === 0 ? (
                <div className="glass-panel flex-center" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div>
                        <h2 style={{ color: 'var(--color-text-secondary)' }}>No assessments found</h2>
                        <p>Check back later or try a different category.</p>
                        <button onClick={() => setSelectedCategory('')} style={{ marginTop: '1rem' }}>View All</button>
                    </div>
                </div>
            ) : (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {currentItems.map((assessment) => (
                            <div
                                key={assessment._id}
                                className="glass-panel"
                                style={{
                                    padding: '2rem',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    animation: 'fadeIn 0.5s ease-out'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                }}
                            >
                                <div>
                                    <h3 style={{ marginTop: 0, fontSize: '1.4rem', marginBottom: '0.5rem' }}>{assessment.title}</h3>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '0.2rem 0.6rem',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: 'var(--color-accent)',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        marginBottom: '1.5rem'
                                    }}>
                                        {getCategoryName(assessment.categoryId)}
                                    </span>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Questions</div>
                                            {assessment.questions.length} Items
                                        </div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Time Limit</div>
                                            {assessment.duration ? `${assessment.duration} Minutes` : 'No Limit'}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/student/assessment/${assessment._id}`)}
                                    style={{
                                        width: '100%',
                                        background: 'var(--color-accent)',
                                        color: 'white',
                                        border: 'none',
                                        fontWeight: 600,
                                        padding: '0.8rem'
                                    }}
                                >
                                    Start Now
                                </button>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={assessments.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default AssessmentList;
