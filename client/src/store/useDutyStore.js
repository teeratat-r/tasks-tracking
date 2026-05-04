import { create } from 'zustand';
import { getEvent, getEmployee } from '../api/api';
import axios from 'axios';


const dutyStore = (set) => ({
    events: [],
    employees: [],
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