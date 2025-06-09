
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { toast } = useToast();
  
  const [orderForm, setOrderForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    comment: ''
  });
  const [orderErrors, setOrderErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateOrderForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!orderForm.name.trim()) {
      errors.name = 'Имя обязательно';
    }
    
    if (!orderForm.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderForm.email)) {
      errors.email = 'Некорректный email';
    }
    
    if (!orderForm.phone.trim()) {
      errors.phone = 'Телефон обязателен';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(orderForm.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.phone = 'Некорректный номер телефона';
    }
    
    if (!orderForm.address.trim()) {
      errors.address = 'Адрес доставки обязателен';
    }
    
    setOrderErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: 'Корзина пуста',
        description: 'Добавьте товары в корзину для оформления заказа',
        variant: 'destructive',
      });
      return;
    }
    
    if (!validateOrderForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (user) {
        addOrder({
          total: getTotalPrice(),
          status: 'В обработке',
          items: items
        });
      }
      
      clearCart();
      
      toast({
        title: 'Заказ оформлен!',
        description: 'Мы свяжемся с вами в ближайшее время',
      });
      
      // Сброс формы
      setOrderForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        comment: ''
      });
      
    } catch (error) {
      toast({
        title: 'Ошибка оформления заказа',
        description: 'Попробуйте еще раз',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-6">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button asChild className="bg-gold hover:bg-gold-dark">
            <Link to="/catalog">Перейти к покупкам</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <Link 
                        to={`/product/${item.id}`}
                        className="font-semibold hover:text-gold transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-lg font-bold text-gold mt-1">
                        {item.price.toLocaleString()} ₽
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Форма заказа */}
          <div className="space-y-6">
            {/* Итого */}
            <Card>
              <CardHeader>
                <CardTitle>Итого</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)} шт.)</span>
                    <span>{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>К оплате</span>
                    <span className="text-gold">{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Форма оформления заказа */}
            <Card>
              <CardHeader>
                <CardTitle>Оформление заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={orderForm.name}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                      className={orderErrors.name ? 'border-destructive' : ''}
                    />
                    {orderErrors.name && (
                      <p className="text-sm text-destructive mt-1">{orderErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, email: e.target.value }))}
                      className={orderErrors.email ? 'border-destructive' : ''}
                    />
                    {orderErrors.email && (
                      <p className="text-sm text-destructive mt-1">{orderErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                      className={orderErrors.phone ? 'border-destructive' : ''}
                    />
                    {orderErrors.phone && (
                      <p className="text-sm text-destructive mt-1">{orderErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      value={orderForm.address}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                      className={orderErrors.address ? 'border-destructive' : ''}
                    />
                    {orderErrors.address && (
                      <p className="text-sm text-destructive mt-1">{orderErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Input
                      id="comment"
                      value={orderForm.comment}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, comment: e.target.value }))}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Оформляем заказ...' : 'Оформить заказ'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
