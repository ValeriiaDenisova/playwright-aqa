# Используем официальный образ Playwright
FROM mcr.microsoft.com/playwright:v1.48.2-noble

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем оставшиеся файлы проекта
COPY . .

# Устанавливаем зависимости Playwright и браузеры
RUN npx playwright install

# Устанавливаем пользовательскую команду по умолчанию
CMD ["npx", "playwright", "test"]
