import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentsService } from '../../services/assessments.service';
import { categoriesService } from '../../services/categories.service';
import type { Assessment, CreateAssessmentDto, Question } from '../../types/assessment.types';
import type { Category } from '../../types/category.types';

const AssessmentsManagement: React.FC = () => {
    const navigate = useNavigate();
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const [newAssessment, setNewAssessment] = useState<CreateAssessmentDto>({
        title: '',
        categoryId: '',
        questions: [],
        duration: undefined
    });

    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [assessmentsData, categoriesData] = await Promise.all([
                assessmentsService.getAll(),
                categoriesService.getAll()
            ]);
            setAssessments(assessmentsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to load data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = () => {
        if (!currentQuestion.text || currentQuestion.options.some(opt => !opt)) {
            setMessage({ type: 'error', text: 'Please fill all question fields.' });
            return;
        }

        setNewAssessment({
            ...newAssessment,
            questions: [...newAssessment.questions, currentQuestion]
        });

        setCurrentQuestion({
            text: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        });

        setMessage({ type: 'success', text: 'Question added!' });
    };

    const handleRemoveQuestion = (index: number) => {
        setNewAssessment({
            ...newAssessment,
            questions: newAssessment.questions.filter((_, i) => i !== index)
        });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newAssessment.title || !newAssessment.categoryId || newAssessment.questions.length === 0) {
            setMessage({ type: 'error', text: 'Please fill all required fields and add at least one question.' });
            return;
        }

        try {
            await assessmentsService.create(newAssessment);
            setMessage({ type: 'success', text: 'Assessment created successfully!' });
            setNewAssessment({
                title: '',
                categoryId: '',
                questions: [],
                duration: undefined
            });
            setShowForm(false);
            loadData();
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to create assessment.' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this assessment?')) return;

        try {
            await assessmentsService.delete(id);
            setMessage({ type: 'success', text: 'Assessment deleted successfully.' });
            loadData();
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to delete assessment.' });
        }
    };

    const getCategoryName = (categoryId: string | { _id: string; name: string }) => {
        if (typeof categoryId === 'object') {
            return categoryId.name;
        }
        const category = categories.find(c => c._id === categoryId);
        return category?.name || 'Unknown';
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', margin: 0 }}>Assessment Management</h1>
                <button onClick={() => navigate('/admin')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    Back to Dashboard
                </button>
            </div>

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

            <button
                onClick={() => setShowForm(!showForm)}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginBottom: '2rem'
                }}
            >
                {showForm ? 'Cancel' : '+ Create New Assessment'}
            </button>

            {showForm && (
                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: '#FAFAFA' }}>
                    <h3 style={{ marginTop: 0 }}>Create New Assessment</h3>
                    <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title *</label>
                            <input
                                type="text"
                                value={newAssessment.title}
                                onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                placeholder="e.g. Mathematics Quiz 1"
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Category *</label>
                                <select
                                    value={newAssessment.categoryId}
                                    onChange={(e) => setNewAssessment({ ...newAssessment, categoryId: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={newAssessment.duration || ''}
                                    onChange={(e) => setNewAssessment({ ...newAssessment, duration: e.target.value ? parseInt(e.target.value) : undefined })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc' }}
                                    placeholder="Optional"
                                    min="1"
                                />
                            </div>
                        </div>

                        <div style={{ border: '2px dashed #ccc', padding: '1.5rem', borderRadius: '8px', background: '#fff' }}>
                            <h4 style={{ marginTop: 0 }}>Add Question</h4>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Question Text</label>
                                <textarea
                                    value={currentQuestion.text}
                                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px' }}
                                    placeholder="Enter your question"
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Options</label>
                                {currentQuestion.options.map((option, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            checked={currentQuestion.correctAnswer === idx}
                                            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: idx })}
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...currentQuestion.options];
                                                newOptions[idx] = e.target.value;
                                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                                            }}
                                            style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                                            placeholder={`Option ${idx + 1}`}
                                        />
                                    </div>
                                ))}
                                <small style={{ color: '#666' }}>Select the radio button for the correct answer</small>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: '#007BFF',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Add Question to Assessment
                            </button>
                        </div>

                        {newAssessment.questions.length > 0 && (
                            <div>
                                <h4>Questions Added ({newAssessment.questions.length})</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {newAssessment.questions.map((q, idx) => (
                                        <li key={idx} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '6px', marginBottom: '0.5rem', background: '#fff' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                <div style={{ flex: 1 }}>
                                                    <strong>Q{idx + 1}:</strong> {q.text}
                                                    <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                                        {q.options.map((opt, i) => (
                                                            <div key={i} style={{ color: i === q.correctAnswer ? '#28a745' : '#666' }}>
                                                                {i === q.correctAnswer ? '✓ ' : '○ '}{opt}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveQuestion(idx)}
                                                    style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                justifySelf: 'start'
                            }}
                        >
                            Create Assessment
                        </button>
                    </form>
                </div>
            )}

            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '12px', background: '#FAFAFA' }}>
                <h3 style={{ marginTop: 0 }}>Existing Assessments</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : assessments.length === 0 ? (
                    <p>No assessments found.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {assessments.map((assessment) => (
                            <div key={assessment._id} style={{
                                padding: '1.5rem',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                background: '#fff',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'start'
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{assessment.title}</h4>
                                    <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                                        <strong>Category:</strong> {getCategoryName(assessment.categoryId)}
                                    </p>
                                    <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                                        <strong>Questions:</strong> {assessment.questions.length}
                                    </p>
                                    {assessment.duration && (
                                        <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                                            <strong>Duration:</strong> {assessment.duration} minutes
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(assessment._id)}
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentsManagement;
