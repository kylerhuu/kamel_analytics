"use client";

import { useState } from "react";
import { addEvent, getEvents, AnalyticsEvent } from "../lib/events";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [events, setEvents] = useState<AnalyticsEvent[]>(getEvents());

  function handleAddEvent(name: string, page: string) {
    const newEvent: AnalyticsEvent = {
      id: crypto.randomUUID(),
      name,
      page,
      userId: "user_1",
      timestamp: new Date().toLocaleString(),
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
  }, {});

  const topPage =
    Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "No data yet";

  const chartData = Object.entries(eventCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-500 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">
            Product Engineer Assignment
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white">
            Kamel Analytics Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-blue-50">
            A TypeScript event collection system that tracks user actions and
            turns them into dashboard analytics.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Event Collector
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Click a button to simulate a user event.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => handleAddEvent("ride_booked", "/booking")}
              className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Track Ride Booked
            </button>

            <button
              onClick={() => handleAddEvent("search", "/search")}
              className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Track Search
            </button>

            <button
              onClick={() => handleAddEvent("payment_started", "/checkout")}
              className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              Track Payment Started
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Total Events</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {events.length}
              </p>
            </div>

            {Object.entries(eventCounts).map(([name, count]) => (
              <div
                key={name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-600">{name}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">
                  {count}
                </p>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-600">Top Page</p>
              <p className="mt-2 text-3xl font-bold text-slate-950">
                {topPage}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Events by Type
          </h2>

          <div className="mt-4 h-80 rounded-xl bg-white">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#475569" />
                  <YAxis allowDecimals={false} stroke="#475569" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4f46e5" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                No events yet. Track an event to see analytics.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Events
          </h2>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm text-slate-800">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-3 font-semibold">Event</th>
                  <th className="p-3 font-semibold">Page</th>
                  <th className="p-3 font-semibold">User</th>
                  <th className="p-3 font-semibold">Timestamp</th>
                </tr>
              </thead>

              <tbody className="bg-white text-slate-800">
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-t border-slate-200 hover:bg-slate-50"
                    >
                      <td className="p-3 font-medium text-slate-900">
                        {event.name}
                      </td>
                      <td className="p-3 text-slate-700">{event.page}</td>
                      <td className="p-3 text-slate-700">{event.userId}</td>
                      <td className="p-3 text-slate-500">
                        {event.timestamp}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3 text-slate-600" colSpan={4}>
                      No events yet. Track an event to visualize it here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}