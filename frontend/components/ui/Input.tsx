// frontend/components/ui/Input.tsx
import React from 'react';

interface InputProps {
  placeholder?: string;
  // Add other props as needed
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return <input placeholder={placeholder} {...props} className="p-2 border-2 rounded border-gray-300" />;
};

export default Input;
