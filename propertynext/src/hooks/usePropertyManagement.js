'use client';

import { useState, useEffect, useCallback } from 'react';
import { propertyApi } from '@/lib/api-client';
import { toast } from 'react-hot-toast';

export const usePropertyManagement = (initialFilters = {}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
    });
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        type: '',
        city: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        ...initialFilters
    });

    // Fetch properties
    const fetchProperties = useCallback(async (page = 1, newFilters = filters) => {
        setLoading(true);
        setError(null);
        
        try {
            const params = {
                page,
                limit: pagination.limit,
                ...newFilters
            };

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === '' || params[key] === null || params[key] === undefined) {
                    delete params[key];
                }
            });

            const response = await propertyApi.getAll(params);
            setProperties(response.properties);
            setPagination(response.pagination);
        } catch (err) {
            setError(err.message || 'Failed to fetch properties');
            toast.error('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    }, [filters, pagination.limit]);

    // Create property
    const createProperty = useCallback(async (propertyData) => {
        try {
            setLoading(true);
            const newProperty = await propertyApi.create(propertyData);
            toast.success('Property created successfully');
            
            // Refresh the list
            await fetchProperties();
            
            return newProperty;
        } catch (err) {
            const errorMessage = err.message || 'Failed to create property';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchProperties]);

    // Update property
    const updateProperty = useCallback(async (propertyId, propertyData) => {
        try {
            setLoading(true);
            const updatedProperty = await propertyApi.update(propertyId, propertyData);
            toast.success('Property updated successfully');
            
            // Update the property in the list
            setProperties(prev => 
                prev.map(prop => 
                    prop.id === propertyId ? { ...prop, ...updatedProperty } : prop
                )
            );
            
            return updatedProperty;
        } catch (err) {
            const errorMessage = err.message || 'Failed to update property';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Delete property
    const deleteProperty = useCallback(async (propertyId) => {
        try {
            setLoading(true);
            await propertyApi.delete(propertyId);
            toast.success('Property deleted successfully');
            
            // Remove the property from the list
            setProperties(prev => prev.filter(prop => prop.id !== propertyId));
            
            // Adjust pagination if needed
            const newTotal = pagination.total - 1;
            const newPages = Math.ceil(newTotal / pagination.limit);
            
            setPagination(prev => ({
                ...prev,
                total: newTotal,
                pages: newPages,
                page: prev.page > newPages ? newPages : prev.page
            }));
            
        } catch (err) {
            const errorMessage = err.message || 'Failed to delete property';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [pagination]);

    // Update property status
    const updatePropertyStatus = useCallback(async (propertyId, status) => {
        try {
            const updatedProperty = await propertyApi.update(propertyId, { status });
            toast.success('Property status updated');
            
            // Update the property in the list
            setProperties(prev => 
                prev.map(prop => 
                    prop.id === propertyId ? { ...prop, status } : prop
                )
            );
            
            return updatedProperty;
        } catch (err) {
            const errorMessage = err.message || 'Failed to update property status';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
    }, []);

    // Update filters
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Apply filters and fetch
    const applyFilters = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        fetchProperties(1, updatedFilters);
    }, [filters, fetchProperties]);

    // Clear filters
    const clearFilters = useCallback(() => {
        const clearedFilters = {
            search: '',
            status: '',
            type: '',
            city: '',
            minPrice: '',
            maxPrice: '',
            bedrooms: ''
        };
        setFilters(clearedFilters);
        fetchProperties(1, clearedFilters);
    }, [fetchProperties]);

    // Change page
    const changePage = useCallback((page) => {
        fetchProperties(page);
    }, [fetchProperties]);

    // Get property by ID
    const getPropertyById = useCallback(async (propertyId) => {
        try {
            setLoading(true);
            const property = await propertyApi.getById(propertyId);
            return property;
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch property';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Search properties
    const searchProperties = useCallback(async (searchParams) => {
        try {
            setLoading(true);
            const response = await propertyApi.search(searchParams);
            setProperties(response.properties);
            setPagination(response.pagination);
            return response;
        } catch (err) {
            const errorMessage = err.message || 'Failed to search properties';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Get featured properties
    const getFeaturedProperties = useCallback(async () => {
        try {
            setLoading(true);
            const featuredProperties = await propertyApi.getFeatured();
            return featuredProperties;
        } catch (err) {
            const errorMessage = err.message || 'Failed to fetch featured properties';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        fetchProperties();
    }, []);

    return {
        // State
        properties,
        loading,
        error,
        pagination,
        filters,
        
        // Actions
        fetchProperties,
        createProperty,
        updateProperty,
        deleteProperty,
        updatePropertyStatus,
        updateFilters,
        applyFilters,
        clearFilters,
        changePage,
        getPropertyById,
        searchProperties,
        getFeaturedProperties,
        
        // Utilities
        refresh: () => fetchProperties(pagination.page),
        hasProperties: properties.length > 0,
        isEmpty: !loading && properties.length === 0,
        hasError: !!error
    };
};

export default usePropertyManagement;
