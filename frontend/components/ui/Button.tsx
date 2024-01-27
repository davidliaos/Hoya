// frontend/components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  // Add other props as needed
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  let className = 'p-2 border-2 rounded';
  if (variant === 'primary') {
    className += ' bg-blue-500 text-white border-blue-500';
  } else if (variant === 'outline') {
    className += ' text-blue-500 border-blue-500';
  }
  // Add more styles or logic based on props

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
