import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingCart } from '@phosphor-icons/react'

const TopSellingProductOne = () => {
    return (
        <div className="col-xxl-6">
            <div className="card h-100 dashboard-card shadow-custom">
                <div className="card-body p-24">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <div className="d-flex align-items-center gap-2">
                            <ShoppingCart size={24} weight="duotone" className="text-primary-600" />
                            <h6 className="mb-2 fw-bold text-lg mb-0">Skribrie Top Products</h6>
                        </div>
                        <Link
                            to="#"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1 hover-lift"
                        >
                            View All Products
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
                                    <th scope="col">Items</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Discount </th>
                                    <th scope="col">Sold</th>
                                    <th scope="col" className="text-center">
                                        Total Orders
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="product-image-placeholder electronics flex-shrink-0 me-12">
                                                E
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="text-md mb-0 fw-normal">Premium Wireless Earbuds</h6>
                                                <span className="text-sm text-secondary-light fw-normal">
                                                    Electronics
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$129.99</td>
                                    <td>20%</td>
                                    <td>1,245</td>
                                    <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            328
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="product-image-placeholder footwear flex-shrink-0 me-12">
                                                F
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="text-md mb-0 fw-normal">Ultra Boost Running Shoes</h6>
                                                <span className="text-sm text-secondary-light fw-normal">
                                                    Footwear
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$179.99</td>
                                    <td>15%</td>
                                    <td>987</td>
                                    <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            256
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="product-image-placeholder apparel flex-shrink-0 me-12">
                                                A
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="text-md mb-0 fw-normal">Organic Cotton Dress</h6>
                                                <span className="text-sm text-secondary-light fw-normal">
                                                    Apparel
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$89.99</td>
                                    <td>25%</td>
                                    <td>876</td>
                                    <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            215
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="product-image-placeholder wearables flex-shrink-0 me-12">
                                                W
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="text-md mb-0 fw-normal">Smart Fitness Tracker</h6>
                                                <span className="text-sm text-secondary-light fw-normal">
                                                    Wearables
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$79.99</td>
                                    <td>10%</td>
                                    <td>765</td>
                                    <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            189
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="product-image-placeholder lifestyle flex-shrink-0 me-12">
                                                L
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="text-md mb-0 fw-normal">Eco-Friendly Water Bottle</h6>
                                                <span className="text-sm text-secondary-light fw-normal">
                                                    Lifestyle
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>$34.99</td>
                                    <td>5%</td>
                                    <td>654</td>
                                    <td className="text-center">
                                        <span className="bg-success-focus text-success-main px-32 py-4 rounded-pill fw-medium text-sm">
                                            142
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

export default TopSellingProductOne