import React from 'react';
import './AuthCard.css';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <div className="auth-card">
      <h1 className="auth-card-title">{title}</h1>
      {children}
    </div>
  );
};

export default AuthCard;

