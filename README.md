# 🌍 VoyageAI - Organizador de Viajes Inteligente

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge" />
</p>

## ✨ Características

- 🔍 **Búsqueda Inteligente** - IA que encuentra las mejores ofertas de vuelos y hoteles
- 📊 **Análisis de Reviews** - Score de confianza basado en análisis de sentimiento
- 💰 **Detector de Ofertas** - Alertas en tiempo real de precios bajos
- 📋 **Itinerario en Vivo** - Navegación en aeropuertos y estaciones
- 📄 **Gestor de Visas** - Automatización de visados electrónicos
- 💸 **Reembolsos Automáticos** - Reclamaciones gestionadas por IA
- 🧠 **Perfil Inteligente** - Aprende tus preferencias de viaje

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/klaker79/voyageai.git
cd voyageai

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 16 | Framework React |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos |
| Zustand | Estado global |
| Framer Motion | Animaciones |
| Lucide React | Iconos |

## 📁 Estructura

```
voyageai/
├── src/
│   ├── app/           # App Router (páginas)
│   ├── components/    # Componentes React
│   └── lib/           # Utilidades
├── public/            # Assets estáticos
└── package.json
```

## 🔗 Integraciones

- **Amadeus API** - Búsqueda de vuelos
- **Booking.com API** - Reserva de hoteles
- **Google Maps** - Mapas y navegación
- **n8n** - Automatizaciones
- **OpenAI / Gemini** - Análisis IA

## 📦 Deploy

Configurado para deploy en **Dokploy** con Docker.

```bash
# Build producción
npm run build

# Start producción
npm start
```

## 📝 Licencia

MIT © 2026 Iker
