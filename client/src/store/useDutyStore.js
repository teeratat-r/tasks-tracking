import { create } from 'zustand';
import { getEvent, getEmployee } from '../api/api';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';


const dutyStore = (set) => ({
    events: [],
    employees: [],
    queryEvents: [],
    fullCalendarEl: null,
    setQueryEvents: (data) => set({ queryEvents: data }),
    setFullCalendarEl: (data) => set({ fullCalendarEl: data}),
    fetchAll: async () => {
        try {
            // const events = await getEvent();
            // const employees = await getEmployee();
            const [events, employees] = await Promise.all([
                getEvent(),
                getEmployee(),
            ])

            set({
                events: events.data,
                employees: employees.data,
            })

        } catch (error) {
            console.log(error);
        }
    }
})

const useDutyStore = create(dutyStore);

export default useDutyStore;