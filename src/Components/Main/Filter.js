import React, { useState } from 'react';
import { Input, Button, DatePicker, Space } from 'antd';
import moment from 'moment';

const Filter = ({ onFilter }) => {
    const [date, setDate] = useState(null);

    const handleDateChange = (date, dateString) => {
        setDate(dateString);
    };

    const handleFilter = () => {
        onFilter(date);
    };

    const handleClearFilter = () => {
        setDate(null);
        onFilter('');
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Space>
                <DatePicker onChange={handleDateChange} value={date ? moment(date) : null} />
                <Button type="primary" onClick={handleFilter}>Filter</Button>
                <Button onClick={handleClearFilter}>Clear Filter</Button>
            </Space>
        </div>
    );
};

export default Filter;
