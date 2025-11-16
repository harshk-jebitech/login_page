import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { authService } from '../services/authService';
import './AuthPage.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthCard title="Check Your Email">
        <div className="success-message">
          <p>If a user with that email exists, a password reset link has been sent.</p>
          <p>Please check your email and follow the instructions to reset your password.</p>
          <Link to="/login" className="auth-link">
            Back to Login
          </Link>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Forgot Password">
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-alert">{error}</div>}
        
        <p className="forgot-password-text">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <FormInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Button type="submit" loading={loading}>
          Send Reset Link
        </Button>
        
        <div className="auth-footer">
          Remember your password?{' '}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;

