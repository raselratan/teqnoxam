import CalendarSchedule from '@/components/calender/calendar-schedule';
import MultiDatePicker from '@/components/calender/multi-date-picker';
import React from 'react'

function Calendar() {
    return (
        <div>
            {/* <CalendarSchedule /> */}
            <MultiDatePicker />
        </div>
    )
}

Calendar.layout = null;

export default Calendar;