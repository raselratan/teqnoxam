"use client"

import { useState, useEffect } from "react"
import "./multi-date-picker.css"

export default function MultiDatePicker({
  initialDates = [],
  onChange = () => {},
  minDate = null,
  maxDate = null,
  disabledDates = [],
  dateFormat = "YYYY/MM/DD",
  showSelectedDates = true,
  maxSelections = null,
}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState(initialDates)

  useEffect(() => {
    onChange(selectedDates)
  }, [selectedDates])

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

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    switch (dateFormat) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`
      case "YYYY-MM-DD":
        return `${year}-${month}-${day}`
      default:
        return `${year}/${month}/${day}`
    }
  }

  const isDateSelected = (day) => {
    return selectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear(),
    )
  }

  const isDateDisabled = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)

    // Check if date is before minDate
    if (minDate && date < minDate) return true

    // Check if date is after maxDate
    if (maxDate && date > maxDate) return true

    // Check if date is in disabledDates array
    return disabledDates.some((disabledDate) => disabledDate.getTime() === date.getTime())
  }

  const handleDateClick = (day) => {
    if (isDateDisabled(day)) return

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const isSelected = selectedDates.some((date) => date.getTime() === clickedDate.getTime())

    if (isSelected) {
      setSelectedDates(selectedDates.filter((date) => date.getTime() !== clickedDate.getTime()))
    } else {
      if (maxSelections && selectedDates.length >= maxSelections) {
        return
      }
      setSelectedDates([...selectedDates, clickedDate].sort((a, b) => a - b))
    }
  }

  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates(selectedDates.filter((date) => date.getTime() !== dateToRemove.getTime()))
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day)
      const isDisabled = isDateDisabled(day)
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="multi-date-picker-container">
      <div className="calendar-section">
        {/* Calendar Header */}
        <div className="calendar-header-nav">
          <button className="nav-btn" onClick={handlePrevMonth}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="month-year">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </div>
          <button className="nav-btn" onClick={handleNextMonth}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Day Names */}
        <div className="calendar-grid">
          {dayNames.map((day, index) => (
            <div key={day} className={`day-name ${index === 0 ? "sunday" : ""} ${index === 6 ? "saturday" : ""}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-grid">{renderCalendarDays()}</div>
      </div>

      {showSelectedDates && (
        <div className="dates-section">
          <h5 className="dates-title">Dates</h5>
          <div className="selected-dates-list">
            {selectedDates.map((date, index) => (
              <div key={index} className="selected-date-badge">
                <span>{formatDate(date)}</span>
                <button onClick={() => handleRemoveDate(date)} className="remove-btn" aria-label="Remove date">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}