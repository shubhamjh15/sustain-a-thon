# 🌱 Sustain-a-thon: Gamifying the Green Revolution

![Sustain-a-thon Banner](https://images.unsplash.com/photo-1542601906990-24d4c16419d0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3)

> **"Gamifying sustainability with AI coaching and real-time tracking to make saving the planet fun."**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI/OpenRouter](https://img.shields.io/badge/AI-OpenRouter-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## 🌍 Overview

**Sustain-a-thon** tackles "eco-anxiety" by turning sustainable living into an engaging game. Instead of feeling helpless about climate change, users log daily eco-actions (like recycling or biking), earn XP, unlock badges, and visualize their carbon impact in real-time. 

Featuring **EcoBot**, a witty AI sustainability consultant, the platform provides personalized advice to help you level up your green game.

## ✨ Key Features

- **🎮 Gamified Sustainability**: Earn XP and level up by logging real-world actions.
- **🤖 EcoBot AI Coach**: A witty, intelligent assistant (powered by LLMs) that answers your climate questions without the bore.
- **📊 Real-time Impact Tracking**: Visual charts showing your CO2 saved over time.
- **🏆 Badge System**: Unlock achievements like "10kg Club" and "Eco Master".
- **🧠 Micro-Learning APIs**: Bite-sized education modules to demystify climate science.
- **🎨 Neo-Brutalist Design**: A bold, high-contrast UI that stands out.

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/sustain-a-thon.git
    cd sustain-a-thon
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory. You will need an API key for the AI features (OpenRouter).
    
    ```bash
    touch .env
    ```
    
    Add the following line to `.env`:
    ```env
    VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
    ```
    > **Note:** The app uses OpenRouter to access LLMs. You can get a key from [openrouter.ai](https://openrouter.ai/).

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

5.  **Open in Browser**
    Visit `http://localhost:5173` to see the app in action!

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with Neo-Brutalist design system)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **AI Integration**: OpenAI SDK (pointing to OpenRouter)
- **Icons**: Lucide React

---

## 📂 Project Structure

```bash
sustain-a-thon/
├── src/
│   ├── components/      # Reusable UI components (NeoCard, NeoButton, etc.)
│   ├── pages/           # Main route components (Home, Dashboard, Tracker, etc.)
│   ├── services/        # API integrations (aiService.ts)
│   ├── types/           # TypeScript interfaces
│   ├── App.tsx          # Main application logic & routing
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files
```

---

## 🤝 Contributing

We love contributions! whether it's fixing bugs, improving the documentation, or proposing new features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with 💚 for the planet during the Hackathon.</p>
</div>
