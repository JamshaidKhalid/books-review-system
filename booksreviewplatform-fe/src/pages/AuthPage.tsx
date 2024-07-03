import React from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage: React.FC<{ formType: 'signin' | 'signup' }> = ({ formType }) => {
  return (
    <div>
      <AuthForm formType={formType} />
    </div>
  );
};

export default AuthPage;