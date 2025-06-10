
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">О ювелирном доме Aurora Jewelry</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Более четверти века мы создаем украшения, которые становятся частью самых важных моментов в жизни наших клиентов
          </p>
        </div>

        {/* Наша история */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Наша история</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ювелирный дом Aurora Jewelry был основан в 1998 году мастером-ювелиром Евгением Кузнецовым. 
                  Начав с небольшой мастерской в центре Минска, мы постепенно завоевали доверие тысяч клиентов по всей Беларуси.
                </p>
                <p>
                  Сегодня Aurora Jewelry — это команда профессиональных ювелиров, дизайнеров и геммологов, 
                  которые создают уникальные украшения из драгоценных металлов и камней высшего качества.
                </p>
                <p>
                  Наша миссия — сделать каждое украшение не просто красивым аксессуаром, 
                  а символом важных жизненных моментов, который будет передаваться из поколения в поколение.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
                alt="Ювелирная мастерская"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Наши принципы */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Качество</h3>
                <p className="text-muted-foreground">
                  Используем только сертифицированные материалы и камни высшего качества. 
                  Каждое изделие проходит строгий контроль качества.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Уникальность</h3>
                <p className="text-muted-foreground">
                  Каждое украшение создается с особым вниманием к деталям. 
                  Мы можем изготовить изделие по индивидуальному эскизу.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Доверие</h3>
                <p className="text-muted-foreground">
                  За 25+ лет работы мы завоевали доверие тысяч клиентов по всей Беларуси. 
                  Предоставляем пожизненную гарантию на все изделия.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Команда */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍💼</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Евгений Кузнецов</h3>
                <p className="text-gold font-medium mb-2">Основатель и главный ювелир</p>
                <p className="text-sm text-muted-foreground">
                  Мастер с 30-летним стажем, создатель уникальных коллекций Aurora
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👩‍🎨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Анна Волкова</h3>
                <p className="text-gold font-medium mb-2">Главный дизайнер</p>
                <p className="text-sm text-muted-foreground">
                  Создает современные дизайны, сочетающие белорусские традиции и мировые тенденции
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🔬</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Дмитрий Петров</h3>
                <p className="text-gold font-medium mb-2">Геммолог</p>
                <p className="text-sm text-muted-foreground">
                  Эксперт по драгоценным камням, отвечает за качество материалов
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Сертификаты и награды */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Сертификаты и награды</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🏆</span>
                </div>
                <h4 className="font-semibold text-sm">Лучший ювелирный дом Беларуси</h4>
                <p className="text-xs text-muted-foreground">Премия "Золотая корона" 2023</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">📜</span>
                </div>
                <h4 className="font-semibold text-sm">Сертификат качества</h4>
                <p className="text-xs text-muted-foreground">STB ISO 9001-2015</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🌟</span>
                </div>
                <h4 className="font-semibold text-sm">Выбор покупателей</h4>
                <p className="text-xs text-muted-foreground">Рейтинг 4.9/5.0</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">✅</span>
                </div>
                <h4 className="font-semibold text-sm">Ассоциация ювелиров Беларуси</h4>
                <p className="text-xs text-muted-foreground">Член АЮБ с 2005 года</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

