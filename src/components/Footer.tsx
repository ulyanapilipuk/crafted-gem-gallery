
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💎</span>
              </div>
              <div>
                <h3 className="text-lg font-bold gold-accent">LuxJewel</h3>
                <p className="text-xs text-muted-foreground">Ювелирный дом</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-4">
              Создаем уникальные ювелирные изделия более 25 лет. 
              Качество, красота и элегантность в каждом украшении.
            </p>
            <div className="flex space-x-4">
              <span>📞 +7 (495) 123-45-67</span>
              <span>📧 info@jewelry-store.ru</span>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/" className="hover:text-gold transition-colors">Главная</Link></li>
              <li><Link to="/catalog" className="hover:text-gold transition-colors">Каталог</Link></li>
              <li><Link to="/promotions" className="hover:text-gold transition-colors">Акции</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">О нас</Link></li>
              <li><Link to="/contacts" className="hover:text-gold transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-gold transition-colors">Доставка и оплата</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Возврат и обмен</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Гарантия</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Размеры</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Уход за украшениями</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 LuxJewel. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-sm">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
