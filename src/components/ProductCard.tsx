
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites } = useAuth();

  const isFavorite = user?.favorites.includes(product.id) || false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Бейджи */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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

        {/* Кнопка избранного */}
        {user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isFavorite ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        )}

        {/* Кнопка добавления в корзину */}
        {product.inStock && (
          <Button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gold hover:bg-gold-dark text-white"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gold">
              {product.price.toLocaleString()} ₽
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.originalPrice.toLocaleString()} ₽
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-1">{product.material}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
