import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

import { Modal, Input, Tooltip, Button, Select } from 'antd'
const { TextArea } = Input;

import { createEvent, getEvent, deleteEvent, updateEvent } from '../../api/api'
import { create } from 'axios'
import useDutyStore from '../../store/useDutyStore'

const Calendar = () => {

    /**
     * Global State
     */
    const events = useDutyStore((state) => state.events);
    const employees = useDutyStore((state) => state.employees);
    const queryEvents = useDutyStore((state) => state.queryEvents);
    const setFullCalendarEl = useDutyStore((state) => state.setFullCalendarEl);
    const fetchAll = useDutyStore((state) => state.fetchAll);

    // Component State
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isEventInfoModalOpen, setIsEventInfoModalOpen] = useState(false);
    // const displayEvents = queryEvents || events;
    
    if(queryEvents.length > 0) {
        var displayEvents = queryEvents
    } else {
        var displayEvents = events
    }

    const calendarEl = useRef(null);
    
    useEffect(() => {
        setFullCalendarEl(calendarEl);
    },[setFullCalendarEl])

    // Select Date Model State
    const [values, setValues] = useState({
        _id: '',
        title: '',
        start: '',
        end: '',
        personInCharge: '',
        color: '',
        description: '',
    });

    /**
     * Clear Values State Function
     */
    const clearValues = () => {
        setValues({
            title: '',
            start: '',
            end: '',
            personInCharge: '',
            color: '',
            description: '',
        })
    }


    /**
     * Select Date Modal
     */

    const handleSelectDate = (info) => {
        setValues({
            ...values,
            start: info.startStr,
            end: info.endStr,
        })
        showDateModal();
    }

    const showDateModal = () => {
        setIsDateModalOpen(true);
    };

    const handleDateModalOk = () => {
        if(!values.title.trim() || !values.personInCharge.trim()) {
            alert("Reqiured Field!")
            return;
        }
        const { _id, ...dataToPost } = values;
        createEvent(dataToPost)
        .then(res => {
            clearValues();
            fetchAll();
            setIsDateModalOpen(false);
        })
        .catch(error => console.log(error));  
    };

    const handleDateModalCancel = () => {
        clearValues();
        setIsDateModalOpen(false);
    };

    const handleOnChangeValue = (info) => {
        setValues({
            ...values,
            [info.target.name]: info.target.value
        });
        console.log(values);
    }

    const handleOnSelectValue = (info) => {
        const { name, bgColor } = employees.find(item => item._id === info)
        setValues({
            ...values,
            color: bgColor,
            personInCharge: name,
        })
    }

    /**
     * On Click Event
     */
    const handleClickEvent = (info) => {
        const { title, start, end, extendedProps } = info.event;
        const { personInCharge, color, description, _id } = extendedProps;
        setValues({
            _id: _id,
            title: title,
            start: moment(start).format('D MMM YYYY'),
            end: moment(end).add('-1', 'day').format('D MMM YYYY'),
            personInCharge: personInCharge,
            color: color,
            description: description,
        })
        showEventInfoModal();
    }

    const showEventInfoModal = () => {
        setIsEventInfoModalOpen(true);
    };
    
    const handleEventInfoModalUpdate = () => {
        updateEvent(values)
        .then(res => {
            console.log(res);
            fetchAll();
            clearValues();
            setIsEventInfoModalOpen(false);
        })
    }

    const handleEventInfoModalCancel = () => {
        clearValues();
        setIsEventInfoModalOpen(false);
    }

    const handleEventInfoModalDelete = () => {
        if(window.confirm("Do you want to delete this task?")) {
            deleteEvent(values._id)
            .then(res => {
                console.log(res);
                fetchAll();
                clearValues();
                setIsEventInfoModalOpen(false);
            })
            .catch(error => console.log(error));
        }
    }

    const handleOnChangeEventInfo = (info) => {
        setValues({
            ...values,
            [info.target.name]: info.target.value
        });
    }

    /**
     * Tooltip Event
     */
    const renderEventContent = (info) => {
        const { personInCharge } = info.event.extendedProps;
        const tooltipTitle = (
            <div className='text-gray-800 bg-white rounded-md'>
                <div className='px-3 py-2 font-bold border-b border-gray-200'>
                    {info.event.title}
                </div>
                <div className='px-3 py-2 text-sm leading-snug'>
                    <p className='text-xs text-gray-500 italic'>
                        {personInCharge}
                    </p>
                </div>
            </div>
        )

        return (
            <Tooltip title={tooltipTitle} placement="top" color='white'>
                <div className="" style={{ width: '100%', cursor: 'pointer' }}>
                    <div className="px-2 py-0.5">
                        <div className="">{info.event.title}</div>
                    </div>
                </div>
            </Tooltip>
        )
    }

    /**
     * Person In Charge Option
     */
    const personInChargeOptions = employees.reduce((total, current) => {
        total.push({ value: current._id, label: current.name})
        return total;
    },[])

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, listPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev next today',
                    center: 'title',
                    right: 'dayGridMonth dayGridWeek listWeek'
                }}
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                    list: 'List',
                }}
                ref={calendarEl}
                selectable={true}
                select={handleSelectDate}
                events={displayEvents}
                eventContent={renderEventContent}
                eventClick={handleClickEvent}
            />
            <Modal
                name='DateModal'
                title={<div className='font-bold text-2xl border-b-2 border-gray-200 py-2 '>Create Tasks</div>}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isDateModalOpen}
                onOk={handleDateModalOk}
                onCancel={handleDateModalCancel}
                okButtonProps={{ disabled: !values.title.trim() || !values.personInCharge.trim()}}
            >
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1 py-1'>
                        <label className='font-semibold text-lg'>
                            <span className='text-red-500'>* </span>
                            <span>Title:</span>
                        </label>
                        <Input 
                            name='title' 
                            placeholder='Title' 
                            style={{width: '80%'}} 
                            allowClear 
                            onChange={handleOnChangeValue} 
                            value={values.title || undefined} 
                            status={!values.title ? 'error' : 'Required'}
                        />
                        {!values.title && <span className="text-red-500 text-xs">Title is required</span>}
                    </div>
                    <div className='flex flex-col gap-1 py-1'>
                        <label className='font-semibold text-lg'>
                            <span className='text-red-500'>* </span>
                            <span>Person In Charge:</span>
                        </label>
                        <Select
                            name='personInCharge' 
                            style={{ width: '80%' }}
                            allowClear
                            options={personInChargeOptions}
                            placeholder="Select Person In Charge"
                            onSelect={handleOnSelectValue}
                            status={!values.personInCharge ? 'error' : 'Required'}
                            value={values.personInCharge || undefined} 
                        />
                        {/* <Input 
                            name='personInCharge' 
                            placeholder='Person In Charge' 
                            style={{width: '80%'}} 
                            allowClear 
                            onChange={handleOnChangeValue} 
                            value={values.personInCharge} 
                            status={!values.personInCharge ? 'error' : 'Required'}
                        /> */}
                        {!values.personInCharge && <span className="text-red-500 text-xs">Person In Charge is required</span>}
                    </div>
                    <div className='flex flex-col gap-1 py-1'>
                        <label className='font-semibold text-lg'>Task Description:</label>
                        <TextArea name='description' placeholder='Maxinum Length is 255' maxLength={255} rows={8} onChange={handleOnChangeValue} value={values.description || undefined} />
                    </div>
                </div>
            </Modal>
            <Modal
                open={isEventInfoModalOpen}
                name='EventInfoModal'
                title={<div className='font-bold text-2xl border-b-2 border-gray-400 py-2 '>{values.title}</div>}
                onOk={handleEventInfoModalUpdate}
                onCancel={handleEventInfoModalCancel}
                footer={[
                <Button key="cancel" onClick={handleEventInfoModalCancel}>
                    Cancel
                </Button>,
                <Button key="delete" type='primary' onClick={handleEventInfoModalDelete} danger>
                    Delete
                </Button>,
                <Button key="submit" type='primary' onClick={handleEventInfoModalUpdate}>
                    Update
                </Button>,
                ]}
            >
                <div className='flex flex-col gap-2 text-base py-2'>
                    <div className='flex gap-2 items-center'>
                        <span className='font-semibold'>Start Date:</span>
                        <span>{values.start}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-semibold'>End Date:</span>
                        <span>{values.end}</span>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='font-semibold'>Person In Charge: </span>
                        <Select
                            name='personInCharge' 
                            style={{ width: 'auto' }}
                            allowClear
                            options={personInChargeOptions}
                            placeholder="Select Person In Charge"
                            onSelect={handleOnSelectValue}
                            status={!values.personInCharge ? 'error' : 'Required'}
                            value={values.personInCharge || undefined} 
                        />
                        {/* <Input name='personInCharge' style={{width: 'auto'}} value={values.personInCharge} onChange={handleOnChangeEventInfo} /> */}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='font-semibold'>Task Description: </span>
                        <TextArea name='description' rows={8} onChange={handleOnChangeEventInfo} value={values.description} />
                    </div>
                </div>
            </Modal>
        </div>
  )
}

export default Calendar