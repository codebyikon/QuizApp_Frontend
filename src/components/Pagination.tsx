import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                style={{
                    padding: '0.5rem 0.75rem',
                    opacity: currentPage === 1 ? 0.5 : 1,
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
            >
                &laquo;
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        padding: '0.5rem 1rem',
                        background: currentPage === page ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                        color: 'white',
                        border: currentPage === page ? 'none' : '1px solid var(--color-border)'
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                style={{
                    padding: '0.5rem 0.75rem',
                    opacity: currentPage === totalPages ? 0.5 : 1,
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
