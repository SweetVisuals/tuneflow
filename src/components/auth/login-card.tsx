import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LoginForm } from './login-form';

interface LoginCardProps {
  setIsLogin?: (value: boolean) => void;
}

export function LoginCard({ setIsLogin }: LoginCardProps) {
  return (
    <LoginForm setIsLogin={setIsLogin} />
  );
}
