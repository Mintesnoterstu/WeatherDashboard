# Weather Dashboard

A modern, responsive weather dashboard built with Next.js, Redux Toolkit, and TypeScript that provides real-time weather information for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-Latest-purple?style=for-the-badge&logo=redux)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🌟 Features

### Core Features
- **City Search**: Search for weather information by city name
- **Real-time Data**: Get current weather conditions from OpenWeatherMap API
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Detailed Weather Info**: View temperature, humidity, wind speed, and weather conditions
- **Weather Icons**: Visual representations of weather conditions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- **Smart Caching**: Previously searched cities are cached to avoid repeated API calls
- **Recent Searches**: Quick access to recently searched cities
- **Loading States**: Beautiful loading indicators during data fetching
- **Error Handling**: Comprehensive error messages for invalid cities or API failures
- **Dark Mode Support**: Automatic dark/light theme adaptation
- **TypeScript**: Full type safety throughout the application

## 🚀 Live Demo

[Live Demo Link](#) *(Update with your deployed URL)*

## 📸 Screenshots

### Homepage
Clean, intuitive search interface with recent searches

### Weather Details
Comprehensive weather information with beautiful UI cards

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **State Management**: Redux Toolkit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: OpenWeatherMap API
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **OpenWeatherMap API Key** (free registration required)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weather-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

The API key is already configured in the application. For production deployment, you should:

1. Create a `.env.local` file in the root directory
2. Add your OpenWeatherMap API key:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

3. Update the API key in `src/lib/features/weatherSlice.ts`

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
weather-dashboard/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Homepage with search
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── globals.css        # Global styles
│   │   └── weather/
│   │       └── [city]/
│   │           └── page.tsx   # Dynamic weather details page
│   ├── components/
│   │   └── StoreProvider.tsx  # Redux store provider
│   └── lib/
│       ├── store.ts           # Redux store configuration
│       ├── hooks.ts           # Typed Redux hooks
│       └── features/
│           └── weatherSlice.ts # Weather state management
├── public/                     # Static assets (cleaned up)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🧠 State Management

The application uses Redux Toolkit for state management with the following structure:

### Weather Slice
- `current`: Current weather data for the selected city
- `cache`: Cached weather data for previously searched cities
- `loading`: Loading state for API requests
- `error`: Error messages for failed requests
- `temperatureUnit`: Current temperature unit preference (metric/imperial)

### Actions
- `fetchWeatherData`: Async thunk for fetching weather data
- `toggleTemperatureUnit`: Toggle between Celsius and Fahrenheit
- `loadFromCache`: Load cached weather data
- `clearError`: Clear error messages

## 🌐 API Integration

### OpenWeatherMap API
- **Base URL**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**:
  - `q`: City name
  - `appid`: API key
  - `units`: metric (for Celsius) or imperial (for Fahrenheit)

### Example Request
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
```

### Response Format
```json
{
  "id": 2643743,
  "name": "London",
  "sys": { "country": "GB" },
  "main": {
    "temp": 15.5,
    "humidity": 72,
    "feels_like": 14.2
  },
  "weather": [{
    "id": 800,
    "main": "Clear",
    "description": "clear sky",
    "icon": "01d"
  }],
  "wind": {
    "speed": 3.6
  }
}
```

## 🎨 UI/UX Features

### Design Principles
- **Clean Interface**: Minimalist design focusing on essential information
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Visual Feedback**: Loading states, hover effects, and smooth transitions

### Color Scheme
- **Primary**: Blue tones for action elements
- **Success**: Green for wind speed indicators
- **Warning**: Orange for weather conditions
- **Error**: Red for error messages
- **Neutral**: Gray tones for text and backgrounds

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment
```bash
npm run build
npm run start
```

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your API key is valid
   - Check rate limits (free tier: 60 calls/minute)

2. **Build Errors**
   - Run `npm run lint` to check for linting issues
   - Ensure all TypeScript errors are resolved

3. **Styling Issues**
   - Clear browser cache
   - Ensure Tailwind CSS is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the development team.

---

Made with ❤️ using Next.js and Redux Toolkit
