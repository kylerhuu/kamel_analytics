"use client";

import { useState } from "react";
import { addEvent, getEvents, AnalyticsEvent } from "../lib/events";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,} from "recharts";

export default function Home() {
  const [events, setEvents] = useState<AnalyticsEvent[]>(getEvents());
  
  function handleAddEvent(name: string, page:string) {
    const newEvent: AnalyticsEvent = {
      id: crypto.randomUUID(),
      name,
      page,
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

  const chartData = Object.entries(eventCounts).map(([name, count])=> ({
    name,
    count,
  }));

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
            onClick={() => handleAddEvent("ride_booked", "/booking")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Ride Booked
          </button>

          <button
            onClick={() => handleAddEvent("search", "/search")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Search
          </button>

          <button
            onClick={() => handleAddEvent("payment_started", "/chekout")}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Track Payment Started
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Total Events</p>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
          {Object.entries(eventCounts).map(([name, count]) => (
            <div key={name} className="rounded-lg border p-4">
              <p className="text-sm text-gray-500">{name}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Events by Type</h2>
        <div className="mt-4 h-72 rounded-lg border p-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width = "100%" height = "100%">
                <BarChart data = {chartData}>
                  <XAxis dataKey = "name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            ): (
              <p className="text-gray-500">No events yet. Track an event to see analytics.</p>
            )}
          </div> 
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