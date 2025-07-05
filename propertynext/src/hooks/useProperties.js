import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useProperties(filters = {}) {
    // Convert filters to query string
    const queryString = new URLSearchParams(filters).toString();
    const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;

    return useQuery({
        queryKey: ['properties', filters],
        queryFn: () => apiClient.get(endpoint),
    });
}

export function useProperty(id) {
    return useQuery({
        queryKey: ['property', id],
        queryFn: () => apiClient.get(`/properties/${id}`),
        enabled: !!id, // Only run if ID exists
    });
}

export function useCreateProperty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (propertyData) => apiClient.post('/properties', propertyData),
        onSuccess: () => {
            // Invalidate and refetch properties list
            queryClient.invalidateQueries({ queryKey: ['properties'] });
        },
    });
}

export function useUpdateProperty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => apiClient.put(`/properties/${id}`, data),
        onSuccess: (data, variables) => {
            // Update both the list and the individual property
            queryClient.invalidateQueries({ queryKey: ['properties'] });
            queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
        },
    });
}

export function useDeleteProperty() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => apiClient.delete(`/properties/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] });
        },
    });
}