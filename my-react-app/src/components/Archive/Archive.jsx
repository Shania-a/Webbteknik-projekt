import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function ArchiveSelect({ onDateSubmit }) {
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(1);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const totalDays = new Date(Number(selectedYear), selectedMonth + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= totalDays; i++) days.push(i);

    const currentYear = new Date().getFullYear();
    const years = [];

    for (let y = currentYear; y >= 1995; y--) {
        years.push(y);
    }

    const submitButton = () => {
        const formatMonth = String(selectedMonth + 1).padStart(2, '0');
        const formatDay = String(selectedDay).padStart(2, '0');
        const correctDate = `${selectedYear}-${formatMonth}-${formatDay}`;

        console.log(correctDate);
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