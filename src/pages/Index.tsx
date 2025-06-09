
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PromotionSlider from '@/components/PromotionSlider';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.filter(p => p.isNew || p.isSale).slice(0, 4);
  const bestSellers = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Главный баннер */}
      <section className="relative bg-gradient-to-br from-gold-light via-gold to-gold-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Роскошные ювелирные изделия
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Откройте для себя коллекцию изысканных украшений
          </p>
          <Button asChild size="lg" className="bg-white text-gold hover:bg-gray-100">
            <Link to="/catalog">Смотреть каталог</Link>
          </Button>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Слайдер акций */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Актуальные акции</h2>
          <PromotionSlider />
        </div>
      </section>

      {/* Рекомендуемые товары */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Рекомендуемые товары</h2>
            <Button variant="outline" asChild>
              <Link to="/catalog">Смотреть все</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Хиты продаж */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Хиты продаж</h2>
            <Button variant="outline" asChild>
              <Link to="/catalog">Смотреть все</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* О нас секция */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">О ювелирном доме LuxJewel</h2>
              <p className="text-lg mb-4 text-muted-foreground">
                Более 25 лет мы создаем уникальные ювелирные изделия, которые становятся
                семейными реликвиями и передаются из поколения в поколение.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                Наши мастера используют только драгоценные металлы высшей пробы и
                сертифицированные камни для создания украшений исключительного качества.
              </p>
              <Button asChild>
                <Link to="/about">Узнать больше</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
                alt="Ювелирная мастерская"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Премиальное качество</h3>
              <p className="text-muted-foreground">
                Только сертифицированные материалы и камни высшего качества
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                Доставка по всей России в течение 1-3 дней
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">
                Пожизненная гарантия на все ювелирные изделия
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
