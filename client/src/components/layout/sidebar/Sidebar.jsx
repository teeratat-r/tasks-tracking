import React, { useState } from 'react'
import moment from 'moment'

import { Row, Card, Form, DatePicker, Button, Space } from 'antd'
const { RangePicker } = DatePicker;

import useDutyStore from '../../../store/useDutyStore'

const Sidebar = () => {
  
  /**
   * Global Store
   */
  const events = useDutyStore((state) => state.events);
  const employees = useDutyStore((state) => state.employees);
  const fetchAll = useDutyStore((state) => state.fetchAll);

  /**
   * Component Store
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
  
  const onFinish = (info) => {
    const { QueryRange } = info;
    const [ start, end ] = QueryRange;
    setQueryRange({
      start: moment(start.$d).format('YYYY-MM-DD'),
      end: moment(end.$d).format('YYYY-MM-DD'),
    })
    console.log(queryRange);
  }

  const onReset = () => {
    form.resetFields();
  }

  return (
    <div className='w-full p-4'>
        <Row>
          <div className='w-full'>
            <Card>
              <span className='text-xl font-semibold text-blue-600' >Tasks in this month</span>
              <ol className='list-decimal px-5'>
                {events.filter(item => moment(item.start).format('M') === moment(thisDate).format('M')).sort((a, b) => moment(a.start) - moment(b.start)).map(item => {
                  return (
                    <li key={item._id}><span className='text-gray-600 '>{item.title} | {moment(item.start).format('D MMM YYYY')}</span></li>
                  )
                })}
              </ol>
            </Card>
            <Card>
              <div className='my-4 text-xl text-blue-600 font-semibold'>
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
                  <RangePicker className='w-full' />
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
            </Card>
          </div>
        </Row>
    </div>
  )
}

export default Sidebar