import { create } from 'zustand';
import { getEvent, getEmployee } from '../api/api';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';


const dutyStore = (set) => ({
    events: [],
    employees: [],
    queryEvents: [],
    fullCalendarEl: null,
    queryStatus: false,
    taskStatus: [
                    {
                        name: 'Pending',
                        color: '#64748B'
                    },
                    {
                        name: 'In-Progress',
                        color: '#b45309'
                    },
                    {
                        name: 'Done',
                        color: '#16a34a'
                    },
                ],
    setQueryEvents: (data) => set({ queryEvents: data }),
    setFullCalendarEl: (data) => set({ fullCalendarEl: data}),
    setEvents: (data) => set({ events: data }),
    setQueryStatus: (value) => set({ queryStatus: value}),
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