# 🌦️ SkyFlow Weather (OpenWeather)

A modern, full-stack weather application providing real-time conditions, 5-day forecasts, 24-hour hourly projections, and geolocation lookup using Spring Boot and React.

---

## 🚀 Implemented Features

* 🌍 **Search by City Name**: Instant weather details for any city worldwide.
* 📍 **Geolocation Support (GPS)**: One-click local weather discovery using browser coordinates (`lat`, `lon`).
* 🌡️ **Comprehensive Real-Time Metrics**:
  * Temperature, Feels-like, Min & Max daily range
  * Humidity with comfort indicator
  * Wind speed & 8-point compass wind direction
  * Atmospheric pressure (hPa)
  * Visibility distance (km)
  * Cloud cover percentage
  * Local sunrise & sunset times
* 📅 **5-Day Daily Forecast**: Aggregated daily weather overview with high/low temperatures, precipitation chance, and wind speed.
* ⏱️ **24-Hour Hourly Forecast**: Interactive 3-hour interval horizontal timeline with rain probability.
* 🔄 **Unit Switcher**: Seamless 1-click toggle between Celsius (°C) and Fahrenheit (°F).
* 📜 **Recent Searches**: Local history chips with quick-select and removal.
* 🎨 **Dynamic Glassmorphic UI**: Adaptive backgrounds that transition based on day/night cycles and real-time conditions (Clear, Clouds, Rain, Snow, Thunderstorm, Mist).
* 🛡️ **Robust Error Handling**: User-friendly alerts and centralized exception handling in the backend.

---

## 🛠️ Tech Stack

### Backend
* **Java 21 & Spring Boot 4**
* **Spring Web MVC**
* **RestTemplate**
* **Lombok & Jackson**
* **JUnit 5 & Mockito** (Unit & Integration tests)
* **Docker** (Multi-stage Eclipse Temurin 21 JRE container)

### Frontend
* **React 19 & TypeScript**
* **Vite**
* **Tailwind CSS v4**
* **Framer Motion** (Smooth spring animations & tab transitions)
* **Lucide React** (Modern weather & interface icons)
* **Axios**
* **Nginx** (For containerized deployments)

---

## ☁️ Render.com Deployment (Qo'llanma)

Loyiha **Render.com** platformasiga avtomatik va qo'lda joylash uchun to'liq tayyorlangan.

### Usul 1: Blueprint orqali avtomatik joylash (Tavsiya etiladi - 1-Click)

Loyiha ildizida joylashgan `render.yaml` fayli tufayli ikkala xizmat ham bitta tugma orqali ishga tushadi:

1. [dashboard.render.com](https://dashboard.render.com) ga kiring.
2. **New +** tugmasini bosing va **Blueprint** ni tanlang.
3. GitHub reponi (`openweather`) ulang.
4. Render avtomatik ravishda `render.yaml` ni o'qiydi va quyidagilarni sozlaydi:
   - **`openweather-backend`**: Docker Web Service (Spring Boot)
   - **`openweather-frontend`**: Static Site (React/Vite)
5. **Apply** tugmasini bosing.
6. Backend ishga tushgach, uning URL manzilini (masalan, `https://openweather-backend.onrender.com`) nusxalang.
7. Frontend sozlamalariga kirib, `VITE_API_URL` muhit o'zgaruvchisiga ushbu manzilni qo'ying va qayta deploy qiling.

---

### Usul 2: Qo'lda (Manual) joylash

#### 1. Backendni joylash:
- Renderda **New +** -> **Web Service** ni tanlang.
- GitHub reponi ulang.
- **Runtime**: `Docker`
- **Dockerfile Path**: `./backend/Dockerfile`
- **Docker Context**: `./backend`
- **Environment Variables**:
  - `PORT`: `8080`
  - `API_KEY`: `caa78e410727423502f6d7225aced2b4`
  - `API_URL`: `https://api.openweathermap.org/data/2.5/weather`
  - `API_FORECAST_URL`: `https://api.openweathermap.org/data/2.5/forecast`

#### 2. Frontendni joylash:
- Renderda **New +** -> **Static Site** ni tanlang.
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://sizning-backend-servisingiz.onrender.com`
- **Redirects/Rewrites**:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

---

## 🐳 Docker & Docker Compose orqali mahalliy ishga tushirish

Butun tizimni konteynerlarda bitta buyruq orqali ishga tushirishingiz mumkin:

```bash
docker compose up --build
```

- Frontend: `http://localhost:80`
- Backend API: `http://localhost:8080`

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/v1/weather` | Current weather | `city` OR `lat` & `lon` |
| `GET` | `/api/v1/weather/coordinates` | Current weather by coordinates | `lat`, `lon` |
| `GET` | `/api/v1/weather/forecast` | 5-day / 3-hour forecast | `city` OR `lat` & `lon` |
| `GET` | `/api/v1/weather/forecast/coordinates` | 5-day forecast by coordinates | `lat`, `lon` |

---

## 🧪 Running Backend Tests

```bash
cd backend
./gradlew test
```

---

## 👨‍💻 Author

Izzat Abdusharipov  
GitHub: [https://github.com/IncridableAcuman](https://github.com/IncridableAcuman)
