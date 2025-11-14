# Project In-Brief (nexus-brief)

This is a rapid prototype for "Project In-Brief," an intelligent, personalized information dashboard built for the Nexus Labs R&D team.

The application allows users to configure "rules" for various data sources (stocks, tech news, world news) and then view a consolidated dashboard of "alerts" that match their criteria. This project was built in a 2-week (10-day) sprint.

### 🚀 Live Demo
[Add your Vercel URL here: https://nexus-brief.vercel.app]

---

## 🎯 Aim & Purpose

The vision of this project is to solve the problem of information fatigue and context-switching for high-value team members. Instead of manually checking 10+ sources, a user can open this one dashboard and get a concise, filtered briefing of only the updates they *actually* care about.

This prototype was built to:
1.  **Prove technical feasibility:** Can we integrate these disparate APIs and process data against user rules?
2.  **Validate user value:** Is a consolidated, filtered dashboard useful?
3.  **Serve as a proof-of-concept** for a larger future investment.

---

## ✨ Features

* **Configurable Modules:** Users can add and view rules for three distinct data sources.
* **Module 1: Stock Ticker:** Get an alert if a stock symbol (e.g., `GOOGL`) goes above or below a set price.
* **Module 2: Hacker News:** Get an alert for new stories that match a keyword (e.g., `AI`) and a minimum point threshold.
* **Module 3: News API:** Get an alert for new top headlines that match a keyword (e.g., `quantum computing`).
* **Automated Backend:** An automated cron job (Vercel Cron) runs every hour to check all rules against live API data.
* **Alert Dashboard:** A clean, card-based UI with icons and a custom layout to view all generated alerts.

---

## 🛠️ Tech Stack

This project was built using a modern, serverless, full-stack tech stack for rapid development and easy deployment.

* **Framework:** **Next.js 14** (App Router)
* **Language:** **TypeScript**
* **Database:** **Vercel Postgres** (powered by Neon)
* **ORM:** **Prisma**
* **Deployment:** **Vercel**
* **Scheduled Tasks:** **Vercel Cron Jobs**
* **Styling:** **Tailwind CSS** (with a custom **Teal Green** theme)
* **Icons:** **React Icons**
* **Font:** **Poppins** (via `next/font`)
* **APIs:** Finnhub.io, NewsAPI.org, and the HN Algolia API.

---

## 🔮 Future Enhancements (Stretch Goals)

This prototype has laid a strong foundation. The following "stretch goals" from the original brief (and new ideas) would be the logical next steps:

* **Email Digest:** A daily email summary of all generated alerts using a service like **Resend** or **SendGrid**.
* **Dashboard Filtering:** Allow users to filter the dashboard by source (e.g., "Show me only Stock alerts").
* **Real-time Alerts:** Use polling or WebSockets to have alerts "pop up" on the dashboard in real-time, without needing a page refresh.
* **"Edit Rule" Functionality:** Add the ability to edit an existing rule instead of just creating and deleting.
* **"Delete Rule" Functionality:** Re-implement the delete button that was paused during development.
* **More Modules:** Add new modules like Weather, GitHub activity, or internal company metrics.
* **WhatsApp/SMS Alerts:** Integrate with an API (like **Twilio**) to send high-priority alerts directly to a user's phone.