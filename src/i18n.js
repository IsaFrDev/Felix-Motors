import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  uz: {
    translation: {
      "nav": {
        "home": "Asosiy",
        "inventory": "Avtosalon",
        "about": "Biz haqimizda",
        "contact": "Aloqa",
        "admin": "Admin"
      },
      "hero": {
        "title": "Felix",
        "subtitle": "Motors",
        "tagline": "Premium Avtomobillar. Eksklyuziv Haydah Tajribasi.",
        "browse": "To'plamni ko'rish",
        "contact": "Biz bilan bog'lanish"
      },
      "stats": {
        "sold": "Sotilgan",
        "experience": "Yillik Tajriba",
        "clients": "Baxtli Mijozlar",
        "brands": "Brendlar"
      },
      "featured": {
        "title": "Tanlangan",
        "subtitle": "Avtomobillar",
        "view_all": "Barcha avtomobillar"
      },
      "promise": {
        "title": "Nega Felix Motors?",
        "premium": "Premium Tanlov",
        "premium_desc": "Bizning har bir avtomobilimiz qattiq tekshiruvdan o'tadi.",
        "tradein": "Trade-In Xizmati",
        "tradein_desc": "Eskisini yangisiga almashtirish endi oson.",
        "sourcing": "Avtomobil qidirish",
        "sourcing_desc": "Orzuingizdagi avtomobilni biz topib beramiz.",
        "trusted": "Ishonchli Diler",
        "trusted_desc": "6 yillik tajriba va yuzlab mamnun mijozlar."
      },
      "footer": {
        "desc": "Eng yaxshi lyuks avtomobillar dileri. Sifatli xizmat va eksklyuziv tanlov.",
        "links": "Tezkor havolalar",
        "services": "Xizmatlar",
        "contact": "Aloqa",
        "hours": "Ish vaqti"
      },
      "card": {
        "available": "Mavjud",
        "sold": "Sotilgan",
        "price": "Narxi",
        "view": "Ko'rish"
      },
      "inventory": {
        "title": "Bizning",
        "subtitle": "Avtosalon",
        "desc": "Bizning saralangan premium va ultra-lyuks avtomobillar to'plamimizni o'rganing.",
        "search": "Brend, model yoki dvigatel bo'yicha qidiruv...",
        "filters": "Filtrlar",
        "active": "faol",
        "clear": "Tozalash",
        "sort": "Saralash",
        "found": "ta avtomobil topildi",
        "not_found": "Hech narsa topilmadi",
        "try_adjust": "Filtrlar yoki qidiruv so'zlarini o'zgartirib ko'ring."
      },
      "detail": {
        "back": "Orqaga",
        "book": "Test Drive Band qilish",
        "contact_wa": "WhatsApp orqali bog'lanish",
        "specs": "To'liq Xususiyatlar",
        "related": "Sizga yoqishi mumkin",
        "form": {
          "title": "Band qilish",
          "name": "To'liq ism",
          "phone": "Telefon",
          "date": "Sana",
          "message": "Xabar",
          "submit": "Tasdiqlash",
          "success": "So'rov yuborildi!",
          "success_desc": "Biz 2 soat ichida siz bilan bog'lanamiz."
        }
      },
      "admin": {
        "sidebar": {
          "dashboard": "Boshqaruv paneli",
          "inventory": "Avtosalon",
          "analytics": "Tahlil",
          "inquiries": "So'rovlar",
          "settings": "Sozlamalar",
          "view_site": "Saytni ko'rish",
          "logout": "Chiqish"
        },
        "dashboard": {
          "title": "Boshqaruv paneli",
          "welcome": "Xush kelibsiz, Admin",
          "total_cars": "Jami avtomobillar",
          "total_value": "Umumiy qiymat",
          "new_inquiries": "Yangi so'rovlar",
          "sold_cars": "Sotilganlar",
          "recent_inquiries": "Oxirgi so'rovlar",
          "no_inquiries": "Hozircha so'rovlar yo'q",
          "view_all": "Hammasini ko'rish"
        },
        "inventory": {
          "title": "Avtosalon boshqaruvi",
          "add_new": "Yangi qo'shish",
          "search": "Qidiruv...",
          "all_brands": "Barcha brendlar",
          "all_categories": "Barcha toifalar",
          "all_status": "Barcha holatlar",
          "table": {
            "vehicle": "Avtomobil",
            "price": "Narxi",
            "category": "Toifa",
            "status": "Holati",
            "actions": "Amallar"
          },
          "status": {
            "available": "Mavjud",
            "sold": "Sotilgan"
          },
          "featured": "Tanlangan",
          "not_featured": "Oddiy",
          "edit": "Tahrirlash",
          "delete_confirm": "Haqiqatan ham ushbu avtomobilni o'chirmoqchimisiz?"
        },
        "form": {
          "add_title": "Yangi avtomobil qo'shish",
          "edit_title": "Avtomobilni tahrirlash",
          "back": "Orqaga",
          "save": "Saqlash",
          "saving": "Saqlanmoqda...",
          "saved": "Saqlandi!",
          "basic_info": "Asosiy ma'lumotlar",
          "performance": "Texnik xususiyatlar",
          "images": "Rasmlar",
          "brand": "Brend",
          "model": "Model",
          "year": "Yil",
          "price": "Narxi (USD)",
          "mileage": "Masofa (km)",
          "color": "Rangi",
          "category": "Toifa",
          "status": "Holati",
          "description": "Tavsifi",
          "featured_label": "Asosiy sahifada ko'rsatish",
          "engine": "Dvigatel",
          "power": "Ot kuchi",
          "torque": "Burilish momenti",
          "acceleration": "0-100 tezlanish",
          "fuel": "Yoqilg'i",
          "transmission": "KPP",
          "main_image": "Asosiy rasm URL",
          "add_image": "Rasm qo'shish",
          "errors": {
            "required": "To'ldirish shart",
            "number": "Raqam bo'lishi kerak",
            "image": "Kamida bitta rasm kerak"
          }
        },
        "analytics": {
          "title": "Tahlil",
          "subtitle": "Hozirgi holat bo'yicha umumiy ko'rinish",
          "kpi": {
            "value": "Portfolio qiymati",
            "available": "Mavjud",
            "sold": "Sotilgan",
            "featured": "Tanlangan"
          },
          "charts": {
            "price": "Narxlar taqsimoti",
            "category": "Toifalar bo'yicha",
            "brand": "Brendlar taqsimoti"
          }
        },
        "inquiries": {
          "title": "So'rovlar",
          "no_results": "So'rovlar topilmadi",
          "status": {
            "new": "Yangi",
            "replied": "Javob berilgan"
          },
          "mark_read": "O'qilgan deb belgilash",
          "details": "Batafsil ma'lumot",
          "date": "Sana"
        },
        "settings": {
          "title": "Sozlamalar",
          "general": "Umumiy sozlamalar",
          "contact": "Aloqa ma'lumotlari",
          "working_hours": "Ish vaqti",
          "site_name": "Sayt nomi",
          "tagline": "Shior",
          "phone": "Telefon",
          "email": "Email",
          "address": "Manzil",
          "instagram": "Instagram",
          "weekday": "Ish kunlari",
          "sunday": "Yakshanba",
          "save_success": "Sozlamalar saqlandi"
        },
        "login": {
          "title": "Admin panelga kirish",
          "password": "Parol",
          "submit": "Kirish",
          "error": "Noto'g'ri parol"
        }
      }
    }
  },
  ru: {
    translation: {
      "nav": {
        "home": "Главная",
        "inventory": "Инвентарь",
        "about": "О нас",
        "contact": "Контакты",
        "admin": "Админ"
      },
      "hero": {
        "title": "Felix",
        "subtitle": "Motors",
        "tagline": "Премиальные Автомобили. Исключительный Опыт Вождения.",
        "browse": "Посмотреть коллекцию",
        "contact": "Связаться с нами"
      },
      "stats": {
        "sold": "Продано",
        "experience": "Лет опыта",
        "clients": "Счастливых клиентов",
        "brands": "Брендов"
      },
      "featured": {
        "title": "Избранные",
        "subtitle": "Автомобили",
        "view_all": "Весь инвентарь"
      },
      "promise": {
        "title": "Почему Felix Motors?",
        "premium": "Премиальный Выбор",
        "premium_desc": "Каждый автомобиль проходит строгую проверку качества.",
        "tradein": "Услуга Trade-In",
        "tradein_desc": "Беспроблемный обмен вашего авто на новое.",
        "sourcing": "Поиск авто",
        "sourcing_desc": "Мы найдем автомобиль вашей мечты.",
        "trusted": "Надежный Дилер",
        "trusted_desc": "6 лет совершенства и сотни довольных клиентов."
      },
      "footer": {
        "desc": "Дилер автомобилей премиум-класса. Качественный сервис и эксклюзивный выбор.",
        "links": "Быстрые ссылки",
        "services": "Услуги",
        "contact": "Контакты",
        "hours": "Часы работы"
      },
      "card": {
        "available": "В наличии",
        "sold": "Продано",
        "price": "Цена",
        "view": "Смотреть"
      },
      "inventory": {
        "title": "Наш",
        "subtitle": "Инвентарь",
        "desc": "Изучите нашу тщательно отобранную коллекцию автомобилей премиум-класса и ультра-люкс.",
        "search": "Поиск по марке, модели или двигателю...",
        "filters": "Фильтры",
        "active": "активно",
        "clear": "Очистить",
        "sort": "Сортировка",
        "found": "автомобилей найдено",
        "not_found": "Ничего не найдено",
        "try_adjust": "Попробуйте изменить фильтры или условия поиска."
      },
      "detail": {
        "back": "Назад",
        "book": "Забронировать тест-драйв",
        "contact_wa": "Связаться через WhatsApp",
        "specs": "Полные характеристики",
        "related": "Вам также может понравиться",
        "form": {
          "title": "Бронирование",
          "name": "Полное имя",
          "phone": "Телефон",
          "date": "Дата",
          "message": "Сообщение",
          "submit": "Подтвердить",
          "success": "Запрос отправлен!",
          "success_desc": "Мы свяжемся с вами в течение 2 часов."
        }
      },
      "admin": {
        "sidebar": {
          "dashboard": "Панель управления",
          "inventory": "Инвентарь",
          "analytics": "Аналитика",
          "inquiries": "Запросы",
          "settings": "Настройки",
          "view_site": "Перейти на сайт",
          "logout": "Выйти"
        },
        "dashboard": {
          "title": "Панель управления",
          "welcome": "Добро пожаловать, Админ",
          "total_cars": "Всего авто",
          "total_value": "Общая стоимость",
          "new_inquiries": "Новые запросы",
          "sold_cars": "Продано",
          "recent_inquiries": "Последние запросы",
          "no_inquiries": "Запросов пока нет",
          "view_all": "Смотреть все"
        },
        "inventory": {
          "title": "Управление инвентарем",
          "add_new": "Добавить новый",
          "search": "Поиск...",
          "all_brands": "Все марки",
          "all_categories": "Все категории",
          "all_status": "Все статусы",
          "table": {
            "vehicle": "Автомобиль",
            "price": "Цена",
            "category": "Категория",
            "status": "Статус",
            "actions": "Действия"
          },
          "status": {
            "available": "В наличии",
            "sold": "Продано"
          },
          "featured": "Избранное",
          "not_featured": "Обычное",
          "edit": "Редактировать",
          "delete_confirm": "Вы уверены, что хотите удалить этот автомобиль?"
        },
        "form": {
          "add_title": "Добавить новый автомобиль",
          "edit_title": "Редактирование автомобиля",
          "back": "Назад",
          "save": "Сохранить",
          "saving": "Сохранение...",
          "saved": "Сохранено!",
          "basic_info": "Основная информация",
          "performance": "Характеристики",
          "images": "Изображения",
          "brand": "Марка",
          "model": "Модель",
          "year": "Год",
          "price": "Цена (USD)",
          "mileage": "Пробег (км)",
          "color": "Цвет",
          "category": "Категория",
          "status": "Статус",
          "description": "Описание",
          "featured_label": "Показывать на главной",
          "engine": "Двигатель",
          "power": "Мощность",
          "torque": "Крутящий момент",
          "acceleration": "Разгон 0-100",
          "fuel": "Топливо",
          "transmission": "КПП",
          "main_image": "URL главного фото",
          "add_image": "Добавить фото",
          "errors": {
            "required": "Обязательно",
            "number": "Должно быть числом",
            "image": "Минимум одно фото"
          }
        },
        "analytics": {
          "title": "Аналитика",
          "subtitle": "Обзор эффективности инвентаря",
          "kpi": {
            "value": "Стоимость портфеля",
            "available": "Доступно",
            "sold": "Продано",
            "featured": "Избранное"
          },
          "charts": {
            "price": "Распределение по цене",
            "category": "По категориям",
            "brand": "По маркам"
          }
        },
        "inquiries": {
          "title": "Запросы",
          "no_results": "Запросов не найдено",
          "status": {
            "new": "Новый",
            "replied": "Отвечено"
          },
          "mark_read": "Отметить как прочитанное",
          "details": "Детали запроса",
          "date": "Дата"
        },
        "settings": {
          "title": "Настройки",
          "general": "Общие настройки",
          "contact": "Контактная информация",
          "working_hours": "Часы работы",
          "site_name": "Название сайта",
          "tagline": "Слоган",
          "phone": "Телефон",
          "email": "Email",
          "address": "Адрес",
          "instagram": "Instagram",
          "weekday": "Будни",
          "sunday": "Воскресенье",
          "save_success": "Настройки сохранены"
        },
        "login": {
          "title": "Вход в админ-панель",
          "password": "Пароль",
          "submit": "Войти",
          "error": "Неверный пароль"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
