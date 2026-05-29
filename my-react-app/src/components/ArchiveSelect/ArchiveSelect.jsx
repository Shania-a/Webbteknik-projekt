import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function ArchiveSelect({ onDateSubmit }) {
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(1);

    // List for all months users select month index is used for date api query
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    //  Get the correct amount of total amount of days for each month by selecting one month ahead then selecting index 0 we get the final day of the previous month 
    // ie. we get the final day of the selected month
    const totalDays = new Date(Number(selectedYear), selectedMonth + 1, 0).getDate();
    // Loop through total days and add to list
    const days = [];
    for (let i = 1; i <= totalDays; i++) days.push(i);

    // Get the current year
    const currentYear = new Date().getFullYear();
    // Loop through current year and until 1995 when the pictures started getting uploaded
    const years = [];
    for (let y = currentYear; y >= 1995; y--) {
        years.push(y);
    }

    const submitButton = () => {
        // Pad single digit months and days with a zero to match NASAs API format (YYYY-MM-DD)
        const formatMonth = String(selectedMonth + 1).padStart(2, '0');
        const formatDay = String(selectedDay).padStart(2, '0');
        const correctDate = `${selectedYear}-${formatMonth}-${formatDay}`;

        const chosenDate = new Date(correctDate);
        const today = new Date();
        // If date picked is after todays date, return  early and alert incorrect selection
        if (chosenDate > today) {
            alert("You are not allowed to view the future!");
            return; 
        }

        console.log(correctDate);
        // if the parent component provided a callback function, send the correctly formatted date back
        if (onDateSubmit) {
            onDateSubmit(correctDate);
        }
    };

    return (
        <Container className="mt-3 text-light" style={{ maxWidth: '500px' }}>

            <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    1. Select Year
                </Form.Label>
                <Form.Select
                    className="bg-dark text-light border-secondary form-select-sm"
                    value={selectedYear}
                    onChange={(e) => {
                        setSelectedYear(e.target.value);
                    }}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <div className="mb-3">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    2. Select Month
                </Form.Label>
                <Row className="g-1">
                    {months.map((month, index) => {
                        const isMonthSelected = selectedMonth === index;
                        return (
                            <Col xs={3} key={month}>
                                <Button
                                    variant={isMonthSelected ? "primary" : "outline-light"}
                                    className="w-100 py-1 text-light btn-sm"
                                    style={{
                                        backgroundColor: isMonthSelected ? '' : 'rgba(255, 255, 255, 0.03)',
                                        fontSize: '0.85rem'
                                    }}
                                    onClick={() => {
                                        setSelectedMonth(index);
                                    }}
                                >
                                    {month}
                                </Button>
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="mb-4">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    3. Select Day
                </Form.Label>
                <div className="d-flex flex-wrap" style={{ gap: '0.25rem' }}>
                    {days.map((day) => {
                        const isDaySelected = selectedDay === day;
                        return (
                            <div key={day} style={{ width: 'calc(14.28% - 0.22rem)' }}>
                                <Button
                                    variant={isDaySelected ? "success" : "outline-light"}
                                    className="w-100 p-0 d-flex align-items-center justify-content-center text-light"
                                    style={{
                                        aspectRatio: '1/1',
                                        fontSize: '0.8rem',
                                        backgroundColor: isDaySelected ? '' : 'rgba(255, 255, 255, 0.03)'
                                    }}
                                    onClick={() => setSelectedDay(day)}
                                >
                                    {day}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="primary"
                    className="fw-bold px-4 py-2 btn-sm"
                    style={{ fontSize: '0.9rem' }}
                    onClick={submitButton}
                >
                    Clicko
                </Button>
            </div>
        </Container>
    );
}