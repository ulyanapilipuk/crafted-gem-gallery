
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Package, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const favoriteProducts = products.filter(product => 
    user.favorites.includes(product.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В обработке':
        return 'bg-yellow-500';
      case 'Отправлен':
        return 'bg-blue-500';
      case 'Доставлен':
        return 'bg-green-500';
      case 'Отменен':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <User className="h-8 w-8 text-gold" />
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="favorites">Избранное</TabsTrigger>
            <TabsTrigger value="orders">История заказов</TabsTrigger>
          </TabsList>

          {/* Информация профиля */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Информация профиля</CardTitle>
                <CardDescription>
                  Ваши личные данные и статистика
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Личные данные</h3>
                    <div className="space-y-2">
                      <p><span className="text-muted-foreground">Имя:</span> {user.name}</p>
                      <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
                      <p><span className="text-muted-foreground">ID клиента:</span> {user.id}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Статистика</h3>
                    <div className="space-y-2">
                      <p><span className="text-muted-foreground">Заказов:</span> {user.orders.length}</p>
                      <p><span className="text-muted-foreground">В избранном:</span> {user.favorites.length}</p>
                      <p>
                        <span className="text-muted-foreground">Общая сумма покупок:</span>{' '}
                        <span className="font-bold text-gold">
                          {user.orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ₽
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Избранные товары */}
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Избранные товары</span>
                </CardTitle>
                <CardDescription>
                  Товары, которые вы добавили в избранное
                </CardDescription>
              </CardHeader>
              <CardContent>
                {favoriteProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoriteProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      У вас пока нет избранных товаров
                    </p>
                    <Button asChild>
                      <a href="/catalog">Перейти к покупкам</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* История заказов */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-gold" />
                  <span>История заказов</span>
                </CardTitle>
                <CardDescription>
                  Все ваши заказы и их статус
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <Card key={order.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">Заказ #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString('ru-RU', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                              <p className="text-lg font-bold text-gold mt-1">
                                {order.total.toLocaleString()} ₽
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-3 text-sm">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-muted-foreground">
                                    {item.quantity} шт. × {item.price.toLocaleString()} ₽
                                  </p>
                                </div>
                                <p className="font-medium">
                                  {(item.price * item.quantity).toLocaleString()} ₽
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      У вас пока нет заказов
                    </p>
                    <Button asChild>
                      <a href="/catalog">Сделать первый заказ</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
