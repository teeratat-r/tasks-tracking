import { useEffect, useState } from 'react'
import './App.css'
import { Row, Col, Flex } from 'antd';
import Header from './components/layout/header/Header';
import Calendar from './components/layout/calendar/Calendar';
import useDutyStore from './store/useDutyStore'

function App() {
  
  /**
   * Fetch All Data
   */
  const fetchAll = useDutyStore((state) => state.fetchAll);

  useEffect(() => {
    fetchAll();
  }, [fetchAll])
  

  return (
    <div className='bg-gray-200 h-screen'>
      <Row className='bg-white p-6'>
        <Header />
      </Row>
      <Row>
        <Col span={8} className='bg-white'>
          Col1
        </Col>
        <Col span={16} className='bg-white'>
          <div className='px-6'>
            <Calendar />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default App
