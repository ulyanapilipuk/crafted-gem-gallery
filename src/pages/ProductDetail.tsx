
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites } = useAuth();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
          <Button asChild>
            <Link to="/catalog">Вернуться к каталогу</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isFavorite = user?.favorites.includes(product.id) || false;
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
    
    toast({
      title: 'Товар добавлен в корзину!',
      description: product.name,
    });
  };

  const handleToggleFavorite = () => {
    if (!user) {
      toast({
        title: 'Необходима авторизация',
        description: 'Войдите в аккаунт для добавления в избранное',
        variant: 'destructive',
      });
      return;
    }
    
    if (isFavorite) {
      removeFromFavorites(product.id);
      toast({
        title: 'Удалено из избранного',
        description: product.name,
      });
    } else {
      addToFavorites(product.id);
      toast({
        title: 'Добавлено в избранное!',
        description: product.name,
      });
    }
  };

  // Создаем массив изображений (в реальном проекте было бы несколько фото)
  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold transition-colors">Главная</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-gold transition-colors">Каталог</Link>
          <span>/</span>
          <Link 
            to={`/catalog?category=${encodeURIComponent(product.category)}`}
            className="hover:text-gold transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Button variant="ghost" asChild className="mb-6">
          <Link to="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к каталогу
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Изображения товара */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden border border-border">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-card rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-gold' 
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Заголовок и бейджи */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">Новинка</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary">Нет в наличии</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            {/* Цена */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gold">
                {product.price.toLocaleString()} ₽
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString()} ₽
                </span>
              )}
            </div>

            {/* Характеристики */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Характеристики</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Материал:</span>
                    <span className="ml-2 font-medium">{product.material}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="ml-2 font-medium">{product.weight}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Размер:</span>
                    <span className="ml-2 font-medium">{product.size}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Наличие:</span>
                    <span className={`ml-2 font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Описание */}
            <div>
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gold hover:bg-gold-dark text-white"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleFavorite}
                className={`${isFavorite ? 'text-red-500 border-red-500' : ''}`}
                size="lg"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Гарантии и доставка */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-gold" />
                <div>
                  <p className="text-sm font-medium">Быстрая доставка</p>
                  <p className="text-xs text-muted-foreground">1-3 дня по России</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-gold" />
                <div>
                  <p className="text-sm font-medium">Гарантия качества</p>
                  <p className="text-xs text-muted-foreground">Пожизненная гарантия</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-gold" />
                <div>
                  <p className="text-sm font-medium">Возврат 30 дней</p>
                  <p className="text-xs text-muted-foreground">Без объяснения причин</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
