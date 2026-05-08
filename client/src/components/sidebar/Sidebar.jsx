import React, { useState } from 'react'
import moment from 'moment'

import { queryEvent } from '../../api/api';

import { Row, Card, Form, DatePicker, Button, Space, Tag } from 'antd'
const { RangePicker } = DatePicker;

import useDutyStore from '../../store/useDutyStore'

const Sidebar = () => {
  
  /**
   * Global State
   */
  const fetchAll = useDutyStore((state) => state.fetchAll);
  const events = useDutyStore((state) => state.events);
  const employees = useDutyStore((state) => state.employees);
  const taskStatus = useDutyStore((state) => state.taskStatus);
  const queryEvents = useDutyStore((state) => state.queryEvents);
  const queryStatus = useDutyStore((state) => state.queryStatus);
  const setQueryStatus = useDutyStore((state) => state.setQueryStatus);
  const setQueryEvents = useDutyStore((state) => state.setQueryEvents);
  const setEvents = useDutyStore((state) => state.setEvents);
  const fullCalendarEl = useDutyStore((state) => state.fullCalendarEl);

  /**
   * Component State
   */
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [queryRange, setQueryRange] = useState({
    start: '',
    end: '',
  });

  const thisDate = new Date();

  /**
   * Query Form Function
   */
  const [form] = Form.useForm();
  
  const onChangeRangePicker = (info) => {
    const [ start, end ] = info;
    setQueryRange({
      start: moment(start.$d).format('YYYY-MM-DD'),
      end: moment(end.$d).add(1,'days').format('YYYY-MM-DD'),
    })
  }

  const onFinish = (info) => {
    queryEvent(queryRange)
    .then(res => {
      const calendarApi = fullCalendarEl.current.getApi();
      const startDate = queryRange.start;
      calendarApi.gotoDate(startDate);
      setQueryEvents(res.data);
      setQueryStatus(true);
    })
    .catch(error => console.log(error));
  }

  const onReset = () => {
    if(queryStatus) {
      const calendarApi = fullCalendarEl.current.getApi();
      calendarApi.today();
    }
    form.resetFields();
    setQueryStatus(false);
    setQueryEvents([]);
    fetchAll();
  }

  return (
    <div className='w-full p-4'>
        <Row>
          <div className='w-full'>
            <Card>
              <div className='text-center'>
                <span className='text-xl font-semibold text-blue-600' >Tasks Status</span>
              </div>
              <ul>
                {taskStatus.map(task => {
                  return (
                    // <li key={task.name} style={{background: task.color, color: '#fff'}} className='p-2 my-2 text-center font-semibold'>
                    //   <span>{task.name}</span>
                    // </li>
                    <li key={task.name} className='my-2'>
                      <Tag color={task.color} className='w-full' >
                        <div className='w-full text-center'>
                          <span className='text-lg w-full'>{task.name}</span>
                        </div>
                      </Tag>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </div>
        </Row>
        <Row>
          <div className='w-full'>
            <Card>
              <span className='text-xl font-semibold text-blue-600' >Tasks in this month</span>
              <ol className='list-decimal px-5'>
                {events.filter(item => moment(item.start).format('M') === moment(thisDate).format('M')).sort((a, b) => moment(a.start) - moment(b.start)).map(item => {
                  return (
                    <li key={item._id} className='my-1 font-semibold'>
                      <span className='text-gray-600 mr-1' >{item.title}</span>
                      <span className='text-gray-600 mx-1 font-normal' >|</span>
                      <span className='text-gray-600 mx-1 font-normal' >{moment(item.start).format('D MMM YYYY')}</span>
                      <span className='mx-0.5 font-normal'><Tag color={item.color}>{item.status}</Tag></span>
                      {
                        thisDate > moment(item.end).add('-1', 'days')
                        ? <span className='mx-0.5 font-normal'><Tag color={'red'}>Late</Tag></span>
                        : <span className='mx-0.5 font-normal'><Tag color={'green'}>Ontime</Tag></span>
                      }
                    </li>
                  )
                })}
              </ol>
            </Card>
            <Card>
              <div className='mb-4 text-xl text-blue-600 font-semibold'>
                <span>Query Tasks</span>
              </div>
              <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                labelAlign='left'
                layout="vertical"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item 
                  name='QueryRange'
                  label={<span className='font-semibold text-gray-600'>Select Range:</span>}
                >
                  <RangePicker className='w-full' onChange={onChangeRangePicker} />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
              <hr className='mx-8 my-8 border-gray-300'/>
              <div className=''>
                <span className='text-xl text-blue-600 font-semibold'>Query Result</span>
                  {queryEvents == 0
                  ? <p className='px-5'>No Query Tasks</p>
                  : <ol className='list-decimal px-5'>
                      {queryEvents.map(item => {
                        return (
                          <li key={item._id}>{item.title} | {moment(item.start).format('D MMM YYYY')}</li>
                        )
                      })}
                    </ol>}
              </div>
            </Card>
          </div>
        </Row>
    </div>
  )
}

export default Sidebar