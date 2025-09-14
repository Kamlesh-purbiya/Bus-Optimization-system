# Bus For You - Smart Bus Management System

Bus For You is a modern, AI-powered web application designed to streamline bus transit operations and enhance the passenger experience. It provides administrators with a comprehensive dashboard for monitoring bus routes, predicting passenger demand, and managing system alerts, while offering users intuitive tools for booking tickets and finding routes.

## Key Features

- **Real-Time Dashboard**: A central hub displaying key performance indicators (KPIs) like total buses, active routes, on-time rates, and total passengers.
- **Live Bus Map**: A real-time map visualizing the location and status of all active buses.
- **AI-Powered Demand Prediction**: Utilizes a sophisticated AI model to forecast passenger demand for specific routes, helping optimize schedules and resource allocation.
- **Ticket Booking**: A simple and intuitive interface for passengers to book tickets for their desired routes and times.
- **AI Chatbot ("Sage")**: An intelligent, multilingual chatbot powered by Gemini that can assist users with questions about routes, bookings, and general app usage. It understands English, Hindi, Gujarati, and Hinglish.
- **Smart Route Search**: An AI-driven search functionality that allows users to find the best bus routes for their destination.
- **Dynamic Notifications**: Real-time alerts and notifications are delivered as toasts to keep both admins and users informed of delays, schedule changes, and other important updates.

## Technology Stack

This project is built with a modern, robust, and scalable technology stack:

- **Core Framework**: [Next.js](https://nextjs.org/) (using the App Router) with [React](https://reactjs.org/) for building the user interface.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, with [ShadCN UI](https://ui.shadcn.com/) for the component library.
- **Artificial Intelligence**:
  - **AI Framework**: [Genkit](https://firebase.google.com/docs/genkit) for orchestrating AI flows and connecting to models.
  - **AI Model**: [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) for powering the chatbot, demand prediction, and route search.
- **Charting**: [Recharts](https://recharts.org/) for creating beautiful and interactive data visualizations on the dashboard.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.

## Getting Started

To get the project up and running on your local machine, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables**:
    Create a `.env` file in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js application, typically on [http://localhost:9002](http://localhost:9002).

4.  **Run the Genkit AI Flows** (in a separate terminal):
    ```bash
    npm run genkit:dev
    ```
    This starts the Genkit development server, allowing the AI features to function correctly.

## AI-Powered Features

The "Bus For You" app leverages the power of Google's Gemini model through Genkit to provide several intelligent features:

- **Demand Prediction**: The flow in `src/ai/flows/predict-passenger-demand.ts` analyzes historical data to forecast passenger counts for upcoming hours, enabling proactive adjustments to bus schedules.
- **Route Search**: The flow in `src/ai/flows/get-routes-for-destination.ts` intelligently parses user queries to match them with the most relevant bus routes from the available data.
- **Conversational AI**: The chatbot, defined in `src/ai/flows/chat.ts`, uses the Gemini model's conversational abilities to provide support in multiple languages, making the app more accessible to a diverse user base.
