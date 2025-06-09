
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, Heart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { products } from '@/data/products';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<typeof products>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchSuggestions([]);
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4">
        {/* Верхняя строка */}
        <div className="flex items-center justify-between py-2 text-sm text-muted-foreground border-b border-border">
          <div className="hidden md:flex items-center space-x-4">
            <span>📞 +7 (495) 123-45-67</span>
            <span>📧 info@jewelry-store.ru</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <span>Доставка по всей России</span>
          </div>
        </div>

        {/* Основной хедер */}
        <div className="flex items-center justify-between py-4">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💎</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gold-accent">LuxJewel</h1>
              <p className="text-xs text-muted-foreground">Ювелирный дом</p>
            </div>
          </Link>

          {/* Поиск */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Input
                type="text"
                placeholder="Поиск украшений..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Подсказки поиска */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-background border border-border rounded-md shadow-lg z-50">
                {searchSuggestions.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center space-x-3 p-3 hover:bg-accent transition-colors"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.price.toLocaleString()} ₽</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Действия пользователя */}
          <div className="flex items-center space-x-2">
            {/* Избранное */}
            {user && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Профиль */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline ml-1">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border border-border">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Личный кабинет</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline ml-1">Войти</span>
                </Link>
              </Button>
            )}

            {/* Корзина */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </Button>

            {/* Мобильное меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                <DropdownMenuItem asChild>
                  <Link to="/">Главная</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/catalog">Каталог</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/promotions">Акции</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/about">О нас</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center justify-center space-x-8 py-3 border-t border-border">
          <Link to="/" className="hover:text-gold transition-colors">
            Главная
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-gold transition-colors">
              Каталог
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border border-border">
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=Кольца">Кольца</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=Серьги">Серьги</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=Колье и подвески">Колье и подвески</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=Браслеты">Браслеты</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog?category=Свадебные украшения">Свадебные украшения</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/catalog">Все категории</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/promotions" className="hover:text-gold transition-colors">
            Акции
          </Link>
          <Link to="/about" className="hover:text-gold transition-colors">
            О нас
          </Link>
          <Link to="/contacts" className="hover:text-gold transition-colors">
            Контакты
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
