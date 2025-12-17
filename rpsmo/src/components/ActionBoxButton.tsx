import React from 'react';

// Define the expected properties (props) for the component
interface ActionButtonProps {
    label: string;
    onClick: () => void;
    // Optional: a variant prop to change the color/style of the button
    variant?: 'primary' | 'secondary';
}

const ActionBoxButton: React.FC<ActionButtonProps> = ({ label, onClick, variant = 'primary' }) => {
    // Define styles based on variant
    const baseStyles = `
        px-8 py-4 
        font-bold text-lg
        rounded-lg
        border-2
        transition-all duration-200
        hover:scale-105
        shadow-lg
        tracking-wide
    `;
    
    const variantStyles = {
        primary: `
            bg-sg-pink hover:bg-pink-600 
            text-gray-900
            border-sg-pink
            hover:shadow-pink-500/50
        `,
        secondary: `
            bg-gray-600 hover:bg-gray-500 
            text-pink-400
            border-pink-500
        `
    };
    
    return (
        <button 
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]}`}
        >
            {label}
        </button>
    );
};

export default ActionBoxButton;