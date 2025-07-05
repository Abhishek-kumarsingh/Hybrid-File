'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Spinner } from 'react-bootstrap';
import { propertyApi } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

const PropertyCharts = () => {
    const [chartData, setChartData] = useState({
        typeDistribution: {},
        locationDistribution: {},
        priceRanges: {},
        statusDistribution: {},
        monthlyTrends: {},
        loading: true
    });

    const fetchChartData = async () => {
        try {
            const allPropsData = await propertyApi.getAll({ limit: 1000 });
            const properties = allPropsData.properties || [];

            // Property type distribution
            const typeDistribution = properties.reduce((acc, prop) => {
                const type = prop.propertyType || 'Unknown';
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});

            // Location distribution (top 10 cities)
            const locationDistribution = properties.reduce((acc, prop) => {
                const location = prop.city || 'Unknown';
                acc[location] = (acc[location] || 0) + 1;
                return acc;
            }, {});

            // Price range distribution
            const priceRanges = {
                'Under $100K': 0,
                '$100K - $250K': 0,
                '$250K - $500K': 0,
                '$500K - $750K': 0,
                '$750K - $1M': 0,
                'Over $1M': 0
            };

            properties.forEach(prop => {
                const price = parseFloat(prop.price || 0);
                if (price < 100000) priceRanges['Under $100K']++;
                else if (price < 250000) priceRanges['$100K - $250K']++;
                else if (price < 500000) priceRanges['$250K - $500K']++;
                else if (price < 750000) priceRanges['$500K - $750K']++;
                else if (price < 1000000) priceRanges['$750K - $1M']++;
                else priceRanges['Over $1M']++;
            });

            // Status distribution
            const statusDistribution = properties.reduce((acc, prop) => {
                const status = prop.status || 'Unknown';
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});

            // Monthly trends (last 12 months)
            const monthlyTrends = {};
            const now = new Date();
            for (let i = 11; i >= 0; i--) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                monthlyTrends[monthKey] = 0;
            }

            properties.forEach(prop => {
                const createdDate = new Date(prop.createdAt);
                const monthKey = createdDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                if (monthlyTrends.hasOwnProperty(monthKey)) {
                    monthlyTrends[monthKey]++;
                }
            });

            setChartData({
                typeDistribution,
                locationDistribution,
                priceRanges,
                statusDistribution,
                monthlyTrends,
                loading: false
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
            toast.error('Failed to load chart data');
            setChartData(prev => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    const ChartCard = ({ title, data, loading, type = 'bar' }) => {
        const getTopEntries = (data, limit = 5) => {
            return Object.entries(data)
                .sort(([,a], [,b]) => b - a)
                .slice(0, limit);
        };

        const getPercentage = (value, total) => {
            return total > 0 ? ((value / total) * 100).toFixed(1) : 0;
        };

        const total = Object.values(data).reduce((sum, val) => sum + val, 0);

        return (
            <Card className="h-100">
                <CardBody>
                    <h6 className="mb-3">{title}</h6>
                    {loading ? (
                        <div className="text-center py-4">
                            <Spinner size="sm" />
                        </div>
                    ) : (
                        <div className="chart-data">
                            {type === 'bar' && (
                                <div className="bar-chart">
                                    {getTopEntries(data).map(([key, value]) => (
                                        <div key={key} className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="text-capitalize small">{key}</span>
                                                <span className="fw-bold">{value}</span>
                                            </div>
                                            <div className="progress" style={{ height: '8px' }}>
                                                <div 
                                                    className="progress-bar bg-primary" 
                                                    style={{ width: `${getPercentage(value, total)}%` }}
                                                ></div>
                                            </div>
                                            <small className="text-muted">{getPercentage(value, total)}%</small>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {type === 'pie' && (
                                <div className="pie-chart">
                                    {Object.entries(data).map(([key, value]) => (
                                        <div key={key} className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex align-items-center">
                                                <div 
                                                    className="me-2 rounded-circle" 
                                                    style={{ 
                                                        width: '12px', 
                                                        height: '12px', 
                                                        backgroundColor: `hsl(${Object.keys(data).indexOf(key) * 60}, 70%, 50%)` 
                                                    }}
                                                ></div>
                                                <span className="text-capitalize small">{key}</span>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-bold">{value}</div>
                                                <small className="text-muted">{getPercentage(value, total)}%</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {type === 'line' && (
                                <div className="line-chart">
                                    {Object.entries(data).map(([key, value]) => (
                                        <div key={key} className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded">
                                            <span className="small">{key}</span>
                                            <span className="fw-bold text-primary">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="property-charts">
            <Row className="g-4">
                <Col lg={6}>
                    <ChartCard
                        title="Property Types Distribution"
                        data={chartData.typeDistribution}
                        loading={chartData.loading}
                        type="bar"
                    />
                </Col>
                
                <Col lg={6}>
                    <ChartCard
                        title="Status Distribution"
                        data={chartData.statusDistribution}
                        loading={chartData.loading}
                        type="pie"
                    />
                </Col>
            </Row>

            <Row className="g-4 mt-2">
                <Col lg={6}>
                    <ChartCard
                        title="Top Locations"
                        data={chartData.locationDistribution}
                        loading={chartData.loading}
                        type="bar"
                    />
                </Col>
                
                <Col lg={6}>
                    <ChartCard
                        title="Price Range Distribution"
                        data={chartData.priceRanges}
                        loading={chartData.loading}
                        type="bar"
                    />
                </Col>
            </Row>

            <Row className="g-4 mt-2">
                <Col lg={12}>
                    <ChartCard
                        title="Monthly Property Additions (Last 12 Months)"
                        data={chartData.monthlyTrends}
                        loading={chartData.loading}
                        type="line"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default PropertyCharts;
