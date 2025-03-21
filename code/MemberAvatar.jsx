import React from 'react';

const MemberAvatar = ({ name, size = 'md', showName = false }) => {
  // Get first letter of name for avatar
  const initial = name ? name.charAt(0) : 'U';
  
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
    xl: 'w-24 h-24 text-4xl'
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} rounded-full bg-primary flex items-center justify-center text-white font-bold mb-2`}>
        {initial}
      </div>
      {showName && (
        <span className="text-dark text-sm">
          {name.includes('You') ? 'You' : name}
        </span>
      )}
    </div>
  );
};

export default MemberAvatar;
