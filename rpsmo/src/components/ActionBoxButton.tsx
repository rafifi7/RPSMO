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
        font-bold text-xl
        rounded-lg
        border-2
        transition-all duration-300 /* Smoother transition for heavy shadows */
        hover:scale-105
        shadow-[0_10px_30px_rgba(0,0,0,0.3)] /* Deep base shadow *
        tracking-wide
        text-shadow-black
    `;

    const variantStyles = {
        primary: `
            bg-sg-dark-teal hover:bg-black 
            text-white
            border-sg-teal
            hover:shadow-[0_20px_40px_rgba(3,122,118,0.4)] /* Heavy glow effect */
        `,
            secondary: `
            text-glow-black
            bg-sg-pink hover:bg-black
            text-white
            border-sg-pink
            hover:shadow-[0_20px_40px_rgba(231,70,148,0.4)]
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