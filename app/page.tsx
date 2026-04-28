"use client";

import { useState } from "react";
import { addEvent, getEvents, AnalyticsEvent } from "../lib/events";

export default function Home() {
  const [events, setEvents] = useState<AnalyticsEvent[]>(getEvents());
  
  function handleAddEvent(name: string) {
    const newEvent: AnalyticsEvent = {
      id: crypto.randomUUID(),
      name:name,
      page: "/dashboard",
      userId: "user_1",
      timestamp: new Date().toISOString(),
    };

    addEvent(newEvent);
    setEvents([...getEvents()]);
  }

  const eventCounts = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.name] = (acc[event.name] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">Kamel Analytics Dashboard</h1>
      <p className="mt-2 text-gray-600">
        A event collection and analytics Dashboard
      </p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Event Collector</h2>

        <div className = "mt-4 flex gap-3">
          <button
            onClick={() => handleAddEvent("ride_booked")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Ride Booked
          </button>

          <button
            onClick={() => handleAddEvent("search")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Search
          </button>

          <button
            onClick={() => handleAddEvent("payment_started")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Payment Started
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <p className="mt-2">Total Events: {events.length}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold"> Recent Events</h2>

        <ul className="mt-4 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="rounded-lg border p-3">
              <p className="font-medium">{event.name}</p>
              <p className="text-sm text-gray-500">{event.timestamp}</p>
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}