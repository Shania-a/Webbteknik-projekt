import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function ArchiveSelect() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = [];
    for (let i = 1; i <= 31; i++) days.push(i);

    return (
        <Container className="mt-3 text-light" style={{ maxWidth: '500px' }}>

            <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    1. Select Year
                </Form.Label>
                <Form.Select className="bg-dark text-light border-secondary form-select-sm">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                </Form.Select>
            </Form.Group>

            <div className="mb-3">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    2. Select Month
                </Form.Label>
                <Row className="g-1">
                    {months.map((month) => (
                        <Col xs={3} key={month}>
                            <Button
                                variant="outline-light"
                                className="w-100 py-1 text-light btn-sm"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', fontSize: '0.85rem' }}
                            >
                                {month}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="mb-4">
                <Form.Label className="small fw-bold text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
                    3. Select Day
                </Form.Label>
                <div className="d-flex flex-wrap" style={{ gap: '0.25rem' }}>
                    {days.map((day) => (
                        <div
                            key={day}
                            style={{ width: 'calc(14.28% - 0.22rem)' }}
                        >
                            <Button
                                variant="outline-light"
                                className="w-100 p-0 d-flex align-items-center justify-content-center text-light"
                                style={{
                                    aspectRatio: '1/1',
                                    fontSize: '0.8rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                                }}
                            >
                                {day}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button
                    variant="primary"
                    className="fw-bold px-4 py-2 btn-sm"
                    style={{ fontSize: '0.9rem' }}
                >
                    View Image
                </Button>
            </div>

        </Container>
    );
}