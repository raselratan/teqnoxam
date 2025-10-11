import { useState } from "react"
import "./calendar-schedule.css"

const CalendarSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1))

  const events = [
    { id: 1, title: "Body Contouring ...", time: "11:15 PM", date: "2024-10-01", type: "body-contouring" },
    { id: 2, title: "Microblading App...", time: "3:15 PM", date: "2024-10-01", type: "microblading" },
    { id: 3, title: "Staff Meeting", time: "5:30 PM", date: "2024-10-01", type: "staff-meeting" },
    { id: 4, title: "Facial Appointment", time: "11:15 PM", date: "2024-10-02", type: "facial" },
    { id: 5, title: "Teeth Whitening ...", time: "7:45 PM", date: "2024-10-02", type: "teeth-whitening" },
    { id: 6, title: "Massage Appoint...", time: "11:45 PM", date: "2024-10-03", type: "massage" },
    { id: 7, title: "Training Session", time: "4:30 PM", date: "2024-10-04", type: "training" },
    { id: 8, title: "Dermal Fillers App...", time: "1:45 PM", date: "2024-10-06", type: "dermal-fillers" },
    { id: 9, title: "Microblading App...", time: "3:15 PM", date: "2024-10-06", type: "microblading" },
    { id: 10, title: "Training Session", time: "9:45 PM", date: "2024-10-08", type: "training" },
    { id: 11, title: "Microdermabrasi...", time: "11:45 PM", date: "2024-10-09", type: "microdermabrasion" },
    { id: 12, title: "Laser Hair Remov...", time: "11:45 PM", date: "2024-10-11", type: "laser" },
    { id: 13, title: "Microblading App...", time: "5:45 PM", date: "2024-10-11", type: "microblading" },
    { id: 14, title: "Massage Appoint...", time: "5:30 PM", date: "2024-10-14", type: "massage" },
    { id: 15, title: "Laser Hair Remov...", time: "3:45 PM", date: "2024-10-15", type: "laser" },
    { id: 16, title: "Microdermabrasi...", time: "5:00 PM", date: "2024-10-16", type: "microdermabrasion" },
    { id: 17, title: "Botox Appointment", time: "3:15 PM", date: "2024-10-17", type: "botox" },
    { id: 18, title: "Facial Appointment", time: "7:00 PM", date: "2024-10-17", type: "facial" },
    { id: 19, title: "Massage Appoint...", time: "7:15 PM", date: "2024-10-17", type: "massage" },
    { id: 20, title: "Microblading App...", time: "9:45 PM", date: "2024-10-19", type: "microblading" },
    { id: 21, title: "Microblading App...", time: "4:00 AM", date: "2024-10-20", type: "microblading" },
    { id: 22, title: "Facial Appointment", time: "3:00 PM", date: "2024-10-20", type: "facial" },
    { id: 23, title: "Massage Therapy", time: "5:00 PM", date: "2024-10-20", type: "massage" },
    { id: 24, title: "Teeth Whitening", time: "8:00 PM", date: "2024-10-21", type: "teeth-whitening" },
    { id: 25, title: "Waxing", time: "3:00 PM", date: "2024-10-21", type: "waxing" },
    { id: 26, title: "Dermal Fillers", time: "4:00 PM", date: "2024-10-21", type: "dermal-fillers" },
    { id: 27, title: "Body Contouring ...", time: "2:00 PM", date: "2024-10-22", type: "body-contouring" },
    { id: 28, title: "Hair Coloring", time: "3:00 PM", date: "2024-10-22", type: "hair-coloring" },
    { id: 29, title: "Body Wrap", time: "4:00 PM", date: "2024-10-23", type: "body-wrap" },
    { id: 30, title: "Manicure", time: "7:00 PM", date: "2024-10-23", type: "manicure" },
    { id: 31, title: "Nail Art", time: "2:00 PM", date: "2024-10-24", type: "nail-art" },
    { id: 32, title: "Pedicure", time: "4:30 PM", date: "2024-10-24", type: "pedicure" },
    { id: 33, title: "Massage Therapy", time: "10:30 PM", date: "2024-10-25", type: "massage" },
    { id: 34, title: "Microdermabrasion", time: "3:30 PM", date: "2024-10-25", type: "microdermabrasion" },
    { id: 35, title: "Couples Massage", time: "5:00 PM", date: "2024-10-25", type: "couples-massage" },
    { id: 36, title: "Manicure", time: "11:15 PM", date: "2024-10-26", type: "manicure" },
    { id: 37, title: "Skin Consultation", time: "12:30 AM", date: "2024-10-26", type: "skin-consultation" },
    { id: 38, title: "Pedicure", time: "12:30 AM", date: "2024-10-27", type: "pedicure" },
    { id: 39, title: "Dermal Fillers App...", time: "10:00 PM", date: "2024-10-28", type: "dermal-fillers" },
    { id: 40, title: "Teeth Whitening ...", time: "10:15 PM", date: "2024-10-28", type: "teeth-whitening" },
    { id: 41, title: "Makeup Application", time: "3:00 PM", date: "2024-10-27", type: "makeup" },
    { id: 42, title: "Massage Appoint...", time: "10:45 PM", date: "2024-10-29", type: "massage" },
    { id: 43, title: "Microdermabras...", time: "7:00 PM", date: "2024-10-30", type: "microdermabrasion" },
    { id: 44, title: "Facial Appointment", time: "9:15 PM", date: "2024-10-31", type: "facial" },
    { id: 45, title: "Staff Meeting", time: "3:15 PM", date: "2024-10-31", type: "staff-meeting" },
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const getEventsForDate = (date) => events.filter((event) => event.date === date)

  const formatDate = (year, month, day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const monthAbbr = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getEventClasses = (type) => `event-${type}`

  const renderCalendarDays = () => {
    const days = []
    const prevMonthDays = new Date(year, month, 0).getDate()
    const prevMonthStart = prevMonthDays - startingDayOfWeek + 1

    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`prev-${i}`} className="calendar-day prev-month">
          <div className="day-number">{prevMonthStart + i}</div>
        </div>,
      )
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(year, month, day)
      const dayEvents = getEventsForDate(dateString)
      const visibleEvents = dayEvents.slice(0, 3)
      const remainingEvents = dayEvents.length - visibleEvents.length

      days.push(
        <div key={`current-${day}`} className="calendar-day current-month">
          <div className="day-number">{day}</div>
          <div className="events-container">
            {visibleEvents.map((event) => (
              <div key={event.id} className={`event-card ${getEventClasses(event.type)}`}>
                <span className="event-title">{event.title}</span>
                <span className="event-time">{event.time}</span>
              </div>
            ))}
            {remainingEvents > 0 && <div className="more-events">{remainingEvents} more...</div>}
          </div>
        </div>,
      )
    }

    // Next month days
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
    const nextMonthDays = totalCells - (startingDayOfWeek + daysInMonth)
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="calendar-day next-month">
          <div className="day-number">{i}</div>
        </div>,
      )
    }

    return days
  }

  const totalEvents = events.filter((e) => {
    const eventDate = new Date(e.date)
    return eventDate.getMonth() === month && eventDate.getFullYear() === year
  }).length

  return (
    <div className="calendar-schedule bg-white rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
          <div className="date-badge bg-primary text-white rounded text-center mr-3 mb-2">
            <div className="month-abbr">{monthAbbr[month]}</div>
            <div className="current-day">{new Date().getDate()}</div>
          </div>
          <div className="d-flex align-items-baseline mr-3 mb-2">
            <h2 className="h3 mb-0 mr-2">
              {monthNames[month]} {year}
            </h2>
            <span className="badge badge-secondary">{totalEvents} events</span>
          </div>
          <div className="date-navigation d-flex align-items-center bg-light rounded px-3 py-2 mb-2">
            <button className="btn btn-sm btn-light mr-2" onClick={previousMonth}>
              ‹
            </button>
            <span className="small text-nowrap">
              {monthNames[month]} 1, {year} - {monthNames[month]} {daysInMonth}, {year}
            </span>
            <button className="btn btn-sm btn-light ml-2" onClick={nextMonth}>
              ›
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              ☰ Day
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              ▦ Week
            </button>
            <button type="button" className="btn btn-sm btn-secondary">
              ▦ Month
            </button>
          </div>
          <button className="btn btn-sm btn-primary">
            <strong>+</strong> Add Event
          </button>
        </div>
      </div>

      <div className="calendar-grid border rounded overflow-hidden">
        <div className="calendar-header d-flex bg-light">
          {dayNames.map((day) => (
            <div key={day} className="day-header text-center font-weight-bold">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-body">{renderCalendarDays()}</div>
      </div>
    </div>
  )
}

export default CalendarSchedule