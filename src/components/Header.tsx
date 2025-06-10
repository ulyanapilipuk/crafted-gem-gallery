
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
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchSuggestions([]);
      setIsSearchFocused(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchSuggestions([]);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // Прокрутка к началу страницы
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4">
        {/* Основной хедер */}
        <div className="flex items-center justify-between py-4">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-3" onClick={() => handleNavigation('/')}>
            <img 
              src="/lovable-uploads/eb9d886f-9194-4685-9771-c9d36a3f6dc6.png" 
              alt="Aurora Jewelry"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold gold-accent">Aurora Jewelry</h1>
              <p className="text-xs text-muted-foreground">Ювелирный дом</p>
            </div>
          </Link>

          {/* Поиск и навигация в одной строке */}
          <div className="flex items-center space-x-6 flex-1 max-w-4xl mx-8">
            {/* Поиск */}
            <div className="relative max-w-xs">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Поиск украшений..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pr-10 rounded-full w-64"
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
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => handleSuggestionClick(product.id)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.price.toLocaleString()} BYN</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Навигация в одной строке */}
            <nav className="hidden lg:flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-gold transition-colors">
                  Каталог
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background border border-border">
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog?category=Кольца')}>
                    Кольца
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog?category=Серьги')}>
                    Серьги
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog?category=Колье и подвески')}>
                    Колье и подвески
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog?category=Браслеты')}>
                    Браслеты
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog?category=Свадебные украшения')}>
                    Свадебные украшения
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/catalog')}>
                    Все категории
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={() => handleNavigation('/promotions')} className="hover:text-gold transition-colors">
                Акции
              </button>
              <button onClick={() => handleNavigation('/about')} className="hover:text-gold transition-colors">
                О нас
              </button>
              <button onClick={() => handleNavigation('/contacts')} className="hover:text-gold transition-colors">
                Контакты
              </button>
            </nav>
          </div>

          {/* Действия пользователя */}
          <div className="flex items-center space-x-2">
            {/* Переключатель темы */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Избранное */}
            {user && (
              <Button variant="ghost" size="sm" onClick={() => {
                navigate('/profile');
                setTimeout(() => {
                  const favoritesSection = document.getElementById('favorites');
                  if (favoritesSection) {
                    favoritesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}>
                <Heart className="h-5 w-5" />
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
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    Личный кабинет
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleNavigation('/auth')}>
                <User className="h-5 w-5" />
                <span className="hidden sm:inline ml-1">Войти</span>
              </Button>
            )}

            {/* Корзина */}
            <Button variant="ghost" size="sm" className="relative" onClick={() => handleNavigation('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Мобильное меню */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border border-border">
                <DropdownMenuItem onClick={() => handleNavigation('/catalog')}>
                  Каталог
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/promotions')}>
                  Акции
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/about')}>
                  О нас
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/contacts')}>
                  Контакты
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
