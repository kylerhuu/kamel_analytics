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

  const pageCounts = events.reduce<Record<string, number>>((acc, event) => {
    acc[event.page] = (acc[event.page] || 0) + 1;
    return acc;
  }, {})

  const topPage = Object.entries(pageCounts).sort((a, b)=> b[1]-a[1])[0]?.[0] || "No data yet";

  const chartData = Object.entries(eventCounts).map(([name, count])=> ({
    name,
    count,
  }));

  return (
    <main className="min-h-screen bg-gray-50 p-8">
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
          <div className="ounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700">
            <p className="text-sm text-gray-500">Total Events</p>
            <p className="text-2xl font-bold">{events.length}</p>
          </div>
          {Object.entries(eventCounts).map(([name, count]) => (
            <div key={name} className="ounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700">
              <p className="text-sm text-gray-500">{name}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
          <div className="ounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700">
            <p className="text-sm text-gray-500">Top Page</p>
            <p className="text-2xl font-bold">{topPage}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Events by Type</h2>
        <div className="mt-4 h-72 rounded-lg border p-4 shadow-sm">
            {chartData.length > 0 ? (
              <ResponsiveContainer width = "100%" height = "100%">
                <BarChart data = {chartData}>
                  <XAxis dataKey = "name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#e14949ff" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ): (
              <p className="text-gray-500">No events yet. Track an event to see analytics.</p>
            )}
          </div> 
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold"> Recent Events</h2>
        <div className="mt-4 overflow-hidden rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Event</th>
                <th className="p-3">Page</th>
                <th className="p-3">User</th>
                <th className="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event)=> (
                  <tr key={event.id} className="border-t">
                    <td className="p-3 font-medium">{event.name}</td>
                    <td className="p-3">{event.page}</td>
                    <td className="p-3">{event.userId}</td>
                    <td className="p-3 text-gray-500">{event.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={4}>
                    No events yet. Track an event to visualize it here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}