export type AnalyticsEvent = {
    id: string;
    name: string;
    page: string;
    userId: string;
    timestamp: string;
};

// create list of events
let events: AnalyticsEvent[] = [];
// adding singular events to the list
export function addEvent(event: AnalyticsEvent) {
    events.push(event);
}

export function getEvents() {
    return events;
}

