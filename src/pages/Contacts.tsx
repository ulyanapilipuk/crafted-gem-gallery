
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-12">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span>Наши адреса</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Главный офис и шоу-рум</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 15, стр. 1</p>
                  <p className="text-sm text-muted-foreground">м. Тверская, м. Пушкинская</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Производство</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Варшавское шоссе, д. 47</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gold" />
                  <span>Телефоны</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-semibold">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Основной номер</p>
                </div>
                <div>
                  <p className="font-semibold">+7 (495) 123-45-68</p>
                  <p className="text-sm text-muted-foreground">Отдел продаж</p>
                </div>
                <div>
                  <p className="font-semibold">+7 (495) 123-45-69</p>
                  <p className="text-sm text-muted-foreground">Индивидуальные заказы</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gold" />
                  <span>Email</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="font-semibold">info@luxjewel.ru</p>
                  <p className="text-sm text-muted-foreground">Общие вопросы</p>
                </div>
                <div>
                  <p className="font-semibold">sales@luxjewel.ru</p>
                  <p className="text-sm text-muted-foreground">Продажи</p>
                </div>
                <div>
                  <p className="font-semibold">support@luxjewel.ru</p>
                  <p className="text-sm text-muted-foreground">Техническая поддержка</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gold" />
                  <span>Режим работы</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span className="font-semibold">10:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="font-semibold">11:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span className="font-semibold">12:00 - 18:00</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  * В праздничные дни режим работы может изменяться
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Карта */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Как нас найти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gold mx-auto mb-2" />
                    <p className="text-muted-foreground">Интерактивная карта</p>
                    <p className="text-sm text-muted-foreground">г. Москва, ул. Тверская, д. 15</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>От метро Тверская:</strong> выход № 1, 2 минуты пешком</p>
                  <p><strong>От метро Пушкинская:</strong> выход № 3, 5 минут пешком</p>
                  <p><strong>Парковка:</strong> подземная парковка в здании (2 часа бесплатно)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Дополнительные услуги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Бесплатная консультация</p>
                    <p className="text-sm text-muted-foreground">Помощь в выборе украшений</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Индивидуальный заказ</p>
                    <p className="text-sm text-muted-foreground">Изготовление по эскизу</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Ремонт и реставрация</p>
                    <p className="text-sm text-muted-foreground">Восстановление украшений</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Оценка украшений</p>
                    <p className="text-sm text-muted-foreground">Экспертиза и сертификация</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
