
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '', 
    name: '' 
  });
  const [loginErrors, setLoginErrors] = useState<{ [key: string]: string }>({});
  const [registerErrors, setRegisterErrors] = useState<{ [key: string]: string }>({});
  
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!loginData.email) {
      errors.email = 'Email обязателен';
    } else if (!validateEmail(loginData.email)) {
      errors.email = 'Некорректный email';
    }
    
    if (!loginData.password) {
      errors.password = 'Пароль обязателен';
    } else if (loginData.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!registerData.name) {
      errors.name = 'Имя обязательно';
    } else if (registerData.name.length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    if (!registerData.email) {
      errors.email = 'Email обязателен';
    } else if (!validateEmail(registerData.email)) {
      errors.email = 'Некорректный email';
    }
    
    if (!registerData.password) {
      errors.password = 'Пароль обязателен';
    } else if (registerData.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (!registerData.confirmPassword) {
      errors.confirmPassword = 'Подтверждение пароля обязательно';
    } else if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    const success = await login(loginData.email, loginData.password);
    
    if (success) {
      toast({
        title: 'Успешный вход!',
        description: 'Добро пожаловать в LuxJewel',
      });
      navigate('/');
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный email или пароль',
        variant: 'destructive',
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    const success = await register(registerData.email, registerData.password, registerData.name);
    
    if (success) {
      toast({
        title: 'Регистрация успешна!',
        description: 'Добро пожаловать в LuxJewel',
      });
      navigate('/');
    } else {
      toast({
        title: 'Ошибка регистрации',
        description: 'Пользователь с таким email уже существует',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-light/20 to-luxury/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Вход в аккаунт</CardTitle>
                <CardDescription>
                  Войдите в свой аккаунт для доступа к личному кабинету
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className={loginErrors.email ? 'border-destructive' : ''}
                    />
                    {loginErrors.email && (
                      <p className="text-sm text-destructive mt-1">{loginErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className={loginErrors.password ? 'border-destructive' : ''}
                    />
                    {loginErrors.password && (
                      <p className="text-sm text-destructive mt-1">{loginErrors.password}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-gold hover:bg-gold-dark">
                    Войти
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>
                  Создайте аккаунт для заказов и получения скидок
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Имя</Label>
                    <Input
                      id="register-name"
                      type="text"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                      className={registerErrors.name ? 'border-destructive' : ''}
                    />
                    {registerErrors.name && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className={registerErrors.email ? 'border-destructive' : ''}
                    />
                    {registerErrors.email && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className={registerErrors.password ? 'border-destructive' : ''}
                    />
                    {registerErrors.password && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="register-confirm-password">Подтверждение пароля</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className={registerErrors.confirmPassword ? 'border-destructive' : ''}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{registerErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-gold hover:bg-gold-dark">
                    Зарегистрироваться
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
