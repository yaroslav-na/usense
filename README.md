# Конвертер валют

## Опис

1. **Header з курсом валют**
   - У header-е необхідно відображати актуальний курс валют (USD, EUR) по відношенню до гривні (UAH)
   - Актуальний курс валют повинен приходити з будь-якого публічного API
1. **Компонент із конвертацією**
   - Для однієї валюти має бути свій input і select.
   - окремий input+select для першої валюти, і окремий input+select для другої валюти
   - в input задається число, щоб вказати кількість одиниць для конвертування
   - у select має бути не менше трьох валют - UAH, USD, EUR.
   - конвертація має відбуватися в обох напрямках
     1. при зміні значення у першій валюті, має перераховуватися значення у другій, і навпаки
     1. при зміні валюти в кожному select-і конвертація обох валют повинна перераховуватися коректно

## Плюсом буде:

- Добре продуманий інтерфейс та зовнішній вигляд
- Чистий код
