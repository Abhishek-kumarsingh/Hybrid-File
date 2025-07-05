import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from '@phosphor-icons/react'

const RecentOrdersOne = () => {
    return (
        <div className="col-xxl-9 col-lg-6">
            <div className="card h-100 dashboard-card shadow-custom">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <div className="d-flex align-items-center gap-2">
                            <ShoppingBag size={24} weight="duotone" className="text-primary-600" />
                            <h6 className="mb-2 fw-bold text-lg mb-0">Skribrie Customer Orders</h6>
                        </div>
                        <Link
                            to="#"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1 hover-lift"
                        >
                            View All Orders
                            <ArrowRight
                                size={18}
                                weight="bold"
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="table-responsive scroll-sm">
                        <table className="table bordered-table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col" className="text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="profile-avatar ananya-sharma pattern-1 flex-shrink-0 me-12 hover-effect">
                                                AS
                                            </div>
                                            <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                                Ananya Sharma
                                            </span>
                                        </div>
                                    </td>
                                    <td>#NX78945</td>
                                    <td>iPhone 15 Pro</td>
                                    <td>2</td>
                                    <td>$2,399.98</td>
                                    <td className="text-center">
                                        {" "}
                                        <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                            Completed
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="profile-avatar rahul-mehta pattern-2 flex-shrink-0 me-12 hover-effect">
                                                RM
                                            </div>
                                            <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                                Rahul Mehta
                                            </span>
                                        </div>
                                    </td>
                                    <td>#NX78946</td>
                                    <td>MacBook Air M2</td>
                                    <td>1</td>
                                    <td>$1,299.00</td>
                                    <td className="text-center">
                                        {" "}
                                        <span className="bg-warning-focus text-warning-main px-24 py-4 rounded-pill fw-medium text-sm">
                                            Processing
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="profile-avatar priya-desai pattern-3 flex-shrink-0 me-12 hover-effect">
                                                PD
                                            </div>
                                            <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                                Priya Desai
                                            </span>
                                        </div>
                                    </td>
                                    <td>#NX78947</td>
                                    <td>Samsung Galaxy Watch</td>
                                    <td>2</td>
                                    <td>$599.98</td>
                                    <td className="text-center">
                                        {" "}
                                        <span className="bg-info-focus text-info-main px-24 py-4 rounded-pill fw-medium text-sm">
                                            Shipped
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="profile-avatar vikram-patel pattern-4 flex-shrink-0 me-12 hover-effect">
                                                VP
                                            </div>
                                            <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                                Vikram Patel
                                            </span>
                                        </div>
                                    </td>
                                    <td>#NX78948</td>
                                    <td>Nike Air Max 270</td>
                                    <td>1</td>
                                    <td>$150.00</td>
                                    <td className="text-center">
                                        {" "}
                                        <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                                            Cancelled
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="profile-avatar neha-gupta pattern-5 flex-shrink-0 me-12 hover-effect">
                                                NG
                                            </div>
                                            <span className="text-lg text-secondary-light fw-semibold flex-grow-1">
                                                Neha Gupta
                                            </span>
                                        </div>
                                    </td>
                                    <td>#NX78949</td>
                                    <td>Sony WH-1000XM5</td>
                                    <td>1</td>
                                    <td>$349.99</td>
                                    <td className="text-center">
                                        {" "}
                                        <span className="bg-danger-focus text-danger-main px-24 py-4 rounded-pill fw-medium text-sm">
                                            Refunded
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentOrdersOne