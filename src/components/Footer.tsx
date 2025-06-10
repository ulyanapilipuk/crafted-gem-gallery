
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 md:col-span-2">
            <button onClick={() => handleNavigation('/')} className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/eb9d886f-9194-4685-9771-c9d36a3f6dc6.png" 
                alt="Aurora Jewelry"
                className="w-10 h-10 object-contain"
              />
            </button>
            <p className="text-muted-foreground mb-4">
              Создаем уникальные ювелирные изделия более 25 лет. 
              Качество, красота и элегантность в каждом украшении.
            </p>
            <div className="flex space-x-4">
              <span>📞 +375 (17) 234-56-78</span>
              <span>📧 info@aurora-jewelry.by</span>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><button onClick={() => handleNavigation('/')} className="hover:text-gold transition-colors">Главная</button></li>
              <li><button onClick={() => handleNavigation('/catalog')} className="hover:text-gold transition-colors">Каталог</button></li>
              <li><button onClick={() => handleNavigation('/promotions')} className="hover:text-gold transition-colors">Акции</button></li>
              <li><button onClick={() => handleNavigation('/about')} className="hover:text-gold transition-colors">О нас</button></li>
              <li><button onClick={() => handleNavigation('/contacts')} className="hover:text-gold transition-colors">Контакты</button></li>
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
            © 2024 Aurora Jewelry. Все права защищены.
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
