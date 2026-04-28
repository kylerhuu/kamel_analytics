# Kamel Analytics Dashboard

A simple TypeScript-based event tracking system that collects user events and displays analytics in a dashboard.

## Overview

This project demonstrates a basic analytics pipeline:

User action → Event collected → Stored → Aggregated → Visualized

The application allows users to simulate events and view real-time analytics through cards, charts, and tables.

## Features

- Event Collection  
  Users can trigger events such as:
  - Ride Booked
  - Search
  - Payment Started  

- Analytics Dashboard  
  Displays:
  - Total number of events
  - Event counts by type
  - Top page (most frequent event location)
  - Bar chart visualization of event distribution  

- Recent Events Table  
  Shows detailed event data including:
  - Event name
  - Page
  - User ID
  - Timestamp  

## Tech Stack

- TypeScript
- Next.js (App Router)
- React
- Tailwind CSS
- Recharts (data visualization)

## Data Model

Each event follows this structure:

```ts
type AnalyticsEvent = {
  id: string;
  name: string;
  page: string;
  userId: string;
  timestamp: string;
};