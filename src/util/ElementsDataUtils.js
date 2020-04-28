export function getLink4Description(category) {
    switch (category) {
        case 'Данные':
            return '/shop/category/data/api?id=';
        case 'Финансы':
            return '/shop/category/finance/api?id=';
        case 'Мобильные':
            return '/shop/category/mobile/api?id=';
        case 'Карты':
            return '/shop/category/map/api?id=';
        case 'Реклама':
            return '/shop/category/adv/api?id=';
        case 'Социальные сети':
            return '/shop/category/social/api?id=';
        case 'Здравохранение':
            return '/shop/category/health/api?id=';
        case 'Спорт':
            return '/shop/category/sport/api?id=';
        case 'Web':
            return '/shop/category/web/api?id=';
        case 'Новости':
            return '/shop/category/news/api?id=';
        case 'Медиа':
            return '/shop/category/media/api?id=';
        default:
            return '/shop/category/other/api?id=';
    }
}

export function getLink4Category(category) {
    switch (category) {
        case 'Данные':
            return '/shop/category/data';
        case 'Финансы':
            return '/shop/category/finance';
        case 'Мобильные':
            return '/shop/category/mobile';
        case 'Карты':
            return '/shop/category/map';
        case 'Реклама':
            return '/shop/category/adv';
        case 'Социальные сети':
            return '/shop/category/social/';
        case 'Здравохранение':
            return '/shop/category/health';
        case 'Спорт':
            return '/shop/category/sport';
        case 'Web':
            return '/shop/category/web';
        case 'Новости':
            return '/shop/category/news';
        case 'Медиа':
            return '/shop/category/media';
        default:
            return '/shop/category/other';
    }
}

export function getIconColor(category) {
    switch (category) {
        case 'Данные':
            return 'red';
        case 'Финансы':
            return 'orange';
        case 'Мобильные':
            return 'yellow';
        case 'Карты':
            return 'green';
        case 'Реклама':
            return 'olive';
        case 'Социальные сети':
            return 'blue';
        case 'Здравохранение':
            return 'purple';
        case 'Спорт':
            return 'teal';
        case 'Web':
            return 'violet';
        case 'Медиа':
            return 'green';
        case 'Новости':
            return 'blue';
        default:
            return 'grey';
    }
}

export function getClassName4Color(category) {
    switch (category) {
        case 'Данные':
            return 'category-label red-label';
        case 'Финансы':
            return 'category-label orange-label';
        case 'Мобильные':
            return 'category-label yellow-label';
        case 'Карты':
            return 'category-label green-label';
        case 'Реклама':
            return 'category-label olive-label';
        case 'Социальные сети':
            return 'category-label blue-label';
        case 'Здравохранение':
            return 'category-label purple-label';
        case 'Спорт':
            return 'category-label teal-label';
        case 'Медиа':
            return 'category-label green-label';
        case 'Новости':
            return 'category-label blue-label';
        case 'Web':
            return 'category-label violet-label';
        default:
            return 'category-label grey-label';
    }
}

export function getCategoryName(category) {
    switch (category) {
        case 'data':
            return 'Данные';
        case 'finance':
            return 'Финансы';
        case 'mobile':
            return 'Мобильные';
        case 'map':
            return 'Карты';
        case 'adv':
            return 'Реклама';
        case 'social':
            return 'Социальные сети';
        case 'health':
            return 'Здравохранение';
        case 'sport':
            return 'Спорт';
        case 'media':
            return ' Медиа';
        case 'news':
            return 'Новости';
        case 'web':
            return 'Web';
        default:
            return 'Другое';
    }
}




