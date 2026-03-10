const events = [
  { date: "Apr 12, 2026", venue: "Neon Festival — Main Stage", city: "Los Angeles, CA" },
  { date: "Apr 26, 2026", venue: "Club Voltage", city: "Las Vegas, NV" },
  { date: "May 3, 2026", venue: "Beachside Rave", city: "Miami, FL" },
  { date: "May 17, 2026", venue: "Warehouse Collective", city: "Chicago, IL" },
  { date: "Jun 7, 2026", venue: "Summer Solstice Festival", city: "Austin, TX" },
]

export default function EventCalendar() {
  import CalendarWidget from "./CalendarWidget"

  const events = [
    { date: "Apr 12, 2026", venue: "Neon Festival — Main Stage", city: "Los Angeles, CA" },
    { date: "Apr 26, 2026", venue: "Club Voltage", city: "Las Vegas, NV" },
    { date: "May 3, 2026", venue: "Beachside Rave", city: "Miami, FL" },
    { date: "May 17, 2026", venue: "Warehouse Collective", city: "Chicago, IL" },
    { date: "Jun 7, 2026", venue: "Summer Solstice Festival", city: "Austin, TX" },
  ]

  export default function EventCalendar() {
    // Handle calendar widget submit
    const handleCalendarSubmit = (days) => {
      // Here you would send the email or booking request
      alert("Consult request sent!\n" + JSON.stringify(days, null, 2))
    }
    return (
      <section id="calendar" style={{ padding: "60px 40px", background: "#111", color: "#fff" }}>
        <h2 style={{ color: "#ff2d95", fontSize: "36px", marginBottom: "32px" }}>Upcoming Events</h2>

        <div style={{ border: "1px solid #1e1e1e", borderRadius: "18px", overflow: "hidden", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #333", textAlign: "left" }}>
                <th style={{ padding: "12px 16px", color: "#ff2d95", fontWeight: 600 }}>Date</th>
                <th style={{ padding: "12px 16px", color: "#ff2d95", fontWeight: 600 }}>Venue</th>
                <th style={{ padding: "12px 16px", color: "#ff2d95", fontWeight: 600 }}>Location</th>
                <th style={{ padding: "12px 16px" }} />
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.date + event.venue} style={{ borderBottom: "1px solid #1e1e1e" }}>
                  <td style={{ padding: "16px", color: "#ccc", whiteSpace: "nowrap" }}>{event.date}</td>
                  <td style={{ padding: "16px", color: "#fff" }}>{event.venue}</td>
                  <td style={{ padding: "16px", color: "#ccc" }}>{event.city}</td>
                  <td style={{ padding: "16px" }}>
                    <a
                      href="/booking"
                      style={{
                        padding: "6px 16px",
                        border: "1px solid #ff2d95",
                        color: "#ff2d95",
                        textDecoration: "none",
                        borderRadius: "18px",
                        fontSize: "13px",
                      }}
                    >
                      Book
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Calendar widget for consult request */}
        <CalendarWidget onSubmit={handleCalendarSubmit} />
      </section>
    )
  }
