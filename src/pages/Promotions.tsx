
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { promotions } from '@/data/products';

const Promotions = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Акции и специальные предложения</h1>
          <p className="text-xl text-muted-foreground">
            Эксклюзивные скидки и выгодные предложения на лучшие украшения
          </p>
        </div>

        {/* Основные акции */}
        <div className="space-y-8 mb-16">
          {promotions.map((promotion, index) => (
            <Card key={promotion.id} className="overflow-hidden">
              <div className={`bg-gradient-to-r ${promotion.color} text-white`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
                  <div className="p-8 flex items-center">
                    <div>
                      <Badge className="bg-white/20 text-white mb-4">
                        {promotion.discount}
                      </Badge>
                      <h2 className="text-3xl font-bold mb-4">{promotion.title}</h2>
                      <p className="text-lg opacity-90 mb-6">{promotion.description}</p>
                      <Button 
                        variant="secondary" 
                        size="lg"
                        asChild
                      >
                        <Link to="/catalog">Смотреть товары</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={promotion.image}
                      alt={promotion.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Дополнительные предложения */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Дополнительные предложения</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Подарочная упаковка</h3>
                <p className="text-muted-foreground mb-4">
                  Элегантная подарочная упаковка в подарок при покупке от 50 000 ₽
                </p>
                <Badge variant="secondary">Бесплатно</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Гравировка</h3>
                <p className="text-muted-foreground mb-4">
                  Персональная гравировка на украшениях при покупке обручальных колец
                </p>
                <Badge variant="secondary">В подарок</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Быстрая доставка</h3>
                <p className="text-muted-foreground mb-4">
                  Бесплатная экспресс-доставка по Москве при заказе от 100 000 ₽
                </p>
                <Badge variant="secondary">Бесплатно</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Программа лояльности</h3>
                <p className="text-muted-foreground mb-4">
                  Накопительная скидка до 10% для постоянных клиентов
                </p>
                <Badge className="bg-gold text-white">До 10%</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Бесплатная чистка</h3>
                <p className="text-muted-foreground mb-4">
                  Профессиональная чистка украшений раз в год бесплатно
                </p>
                <Badge variant="secondary">Пожизненно</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Первый заказ онлайн</h3>
                <p className="text-muted-foreground mb-4">
                  Скидка 5% на первый заказ при регистрации на сайте
                </p>
                <Badge className="bg-green-500 text-white">-5%</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Условия акций */}
        <section className="mt-16 bg-muted/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Условия акций</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Общие условия:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Акции не суммируются с другими скидками</li>
                <li>• Действуют только на товары в наличии</li>
                <li>• Количество товара по акции ограничено</li>
                <li>• Действительны до окончания срока акции</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Дополнительно:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Подробности уточняйте у консультантов</li>
                <li>• Возможна оплата в рассрочку</li>
                <li>• Скидки распространяются на основную коллекцию</li>
                <li>• Индивидуальные заказы рассчитываются отдельно</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Promotions;
