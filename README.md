# 🎬 BMX Cinemas - Next-Gen Multiplex & Cine Cafe Platform

> **A Premium, Glassmorphic React & Vite Web Application** built for **BMX Cinemas**, representing luxury movie theater outlets across Navi Mumbai (Kopar Khairane, Kharghar) and Ambernath.

---

## 🌟 Key Features

- **🚀 Dynamic Landing & Hero Showcase**: Auto-scrolling movie showcase every 4 seconds with custom vignette gradient overlays, movie meta tags, and high-res backdrops.
- **🎟️ Quick Booking Engine**: Real-time outlet & movie selector card that routes users directly to official BookMyShow ticketing links for Kopar Khairane, Kharghar, and Ambernath screens.
- **🍿 BMX Experience Section**: Single-page 2-tab interactive showcase:
  - **BMX Cine Cafe**: Gourmet snacks & chef recommendations with hover/touch info overlays.
  - **Inside Theater**: 70/30 split 2-column cards highlighting Dolby Atmos 360 soundstages & Motorized VIP Italian Leather Recliners.
- **📺 Cinematic Dedicated Trailers Section**: Interactive inline video player transformation with a side playlist sidebar.
- **📅 Dynamic Upcoming Shows Filter**: Automated dynamic month filter calculation engine that automatically adjusts upcoming month tabs starting from the current date.
- **🎬 Featured Shows Carousel**: Smooth horizontal card track with `useRef` navigation arrows and scroll-synced pagination dots.
- **📱 Responsive & Glassmorphic UI**: Ultra-premium dark mode aesthetic featuring glassmorphic blur filters, 3D mascot avatar props, and mobile navigation drawer.

---

## 🛠️ Technology Stack

- **Core**: React 18, JavaScript (ES6+)
- **Build Tool & Dev Server**: Vite
- **Routing**: `react-router-dom` (v6)
- **Styling**: Vanilla CSS3 with CSS Variables (Glassmorphism & Micro-animations)
- **Icons & Fonts**: FontAwesome 6.5.1, Google Fonts (*Outfit* & *Plus Jakarta Sans*)

---

## 📂 Project Architecture

```
BMX-React/
├── public/
│   └── img/                     # Movie posters, backdrops, food & avatar assets
├── src/
│   ├── components/
│   │   ├── common/              # Shared reusable components
│   │   │   ├── Footer.jsx       # Reusable 4-column footer with 3D avatars
│   │   │   └── TrailerModal.jsx # Global YouTube trailer modal player
│   │   └── home/                # Modular home page sections
│   │       ├── Navbar.jsx       # Glass header with mobile drawer & MORE dropdown
│   │       ├── Landing.jsx      # Hero section & Quick Booking card
│   │       ├── featuredSection.jsx # Featured shows carousel
│   │       ├── upcomingSection.jsx # Dynamic month filter upcoming carousel
│   │       ├── TrailersSection.jsx # Dedicated trailer showcase player
│   │       └── experienceSection.jsx # Cine Cafe & Inside Theater 2-tab section
│   ├── data/                    # Data sources
│   │   ├── movieDataSet.js
│   │   ├── upcomingMovieDataSet.js
│   │   └── experienceDataSet.js
│   ├── pages/                   # Main page routes
│   │   └── Home.jsx
│   ├── routes/                  # React Router configuration
│   │   └── AppRoutes.jsx
│   ├── styles/                  # Modular component stylesheets
│   │   ├── global.css
│   │   ├── navigation.css
│   │   ├── landing.css
│   │   ├── featuredSection.css
│   │   ├── upcomingSection.css
│   │   ├── trailersSection.css
│   │   ├── experienceSection.css
│   │   ├── trailerModal.css
│   │   └── footer.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 💻 Installation & Local Setup

To run the project locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bmx-cinemas.git

# 2. Navigate to project directory
cd BMX-React

# 3. Install dependencies
npm install

# 4. Start Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser to view the application.

---

## 🔮 Roadmap & Upcoming Pages

- [x] **Home Page** (Hero, Quick Booking, Featured, Upcoming, Trailers, Experience, Footer)
- [ ] **About Us Page** (Brand story, technological innovations & vision)
- [ ] **Career Page** (Job openings & application form submission)
- [ ] **Corporate Booking Page** (Private screening inquiries & event venue booking)
- [ ] **Contact Us Page** (Interactive location maps & customer support)

---

## 📄 License

Associated with **Purple Parrots Entertainment** © 2025 BMX Cinemas. All rights reserved.
