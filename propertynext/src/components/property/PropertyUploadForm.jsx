'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { propertyApi, uploadApi } from '@/lib/api-client';
import { Card, CardBody, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import SelectFormInput from '@/components/form/SelectFormInput';
import ImageUploadZone from './ImageUploadZone';

// Validation schema
const propertySchema = yup.object({
    title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
    description: yup.string().required('Description is required').min(20, 'Description must be at least 20 characters'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string(),
    zipCode: yup.string().required('ZIP code is required'),
    country: yup.string().required('Country is required'),
    propertyType: yup.string().required('Property type is required'),
    bedrooms: yup.number().required('Number of bedrooms is required').min(0, 'Bedrooms cannot be negative'),
    bathrooms: yup.number().required('Number of bathrooms is required').min(0, 'Bathrooms cannot be negative'),
    area: yup.number().required('Area is required').positive('Area must be positive'),
    featured: yup.boolean().default(false),
});

const PropertyUploadForm = ({ onSuccess, initialData = null, isEdit = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState(initialData?.images || []);
    const [imageUploading, setImageUploading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(propertySchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            price: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'USA',
            propertyType: '',
            bedrooms: 1,
            bathrooms: 1,
            area: '',
            featured: false,
        }
    });

    const propertyTypes = [
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'villa', label: 'Villa' },
        { value: 'studio', label: 'Studio' },
        { value: 'loft', label: 'Loft' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'land', label: 'Land' },
        { value: 'other', label: 'Other' }
    ];

    const handleImageUpload = async (files) => {
        if (!files || files.length === 0) return;

        setImageUploading(true);
        try {
            const uploadPromises = files.map(file => uploadApi.uploadFile(file, 'properties'));
            const results = await Promise.allSettled(uploadPromises);

            const successfulUploads = results
                .filter(result => result.status === 'fulfilled')
                .map(result => result.value);

            const failedUploads = results
                .filter(result => result.status === 'rejected')
                .length;

            setUploadedImages(prev => [...prev, ...successfulUploads]);

            if (successfulUploads.length > 0) {
                toast.success(`${successfulUploads.length} image(s) uploaded successfully`);
            }

            if (failedUploads > 0) {
                toast.error(`${failedUploads} image(s) failed to upload`);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Failed to upload images');
        } finally {
            setImageUploading(false);
        }
    };

    const handleImageDelete = async (imageIndex) => {
        const image = uploadedImages[imageIndex];

        try {
            if (image.url) {
                await uploadApi.deleteFile(image.url);
            }

            setUploadedImages(prev => prev.filter((_, index) => index !== imageIndex));
            toast.success('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    const onSubmit = async (data) => {
        if (uploadedImages.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setIsLoading(true);
        try {
            const propertyData = {
                ...data,
                images: uploadedImages.map(img => img.url)
            };

            let result;
            if (isEdit && initialData?.id) {
                result = await propertyApi.update(initialData.id, propertyData);
                toast.success('Property updated successfully');
            } else {
                result = await propertyApi.create(propertyData);
                toast.success('Property created successfully');
            }

            if (onSuccess) {
                onSuccess(result);
            }

            if (!isEdit) {
                reset();
                setUploadedImages([]);
            }
        } catch (error) {
            console.error('Error saving property:', error);
            toast.error(error.message || 'Failed to save property');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardBody>
                <h4 className="mb-4">{isEdit ? 'Edit Property' : 'Add New Property'}</h4>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={6}>
                            <TextFormInput
                                name="title"
                                label="Property Title"
                                placeholder="Enter property title"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectFormInput
                                name="propertyType"
                                label="Property Type"
                                control={control}
                                errors={errors}
                                options={propertyTypes}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <TextAreaFormInput
                                name="description"
                                label="Description"
                                placeholder="Enter property description"
                                rows={4}
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <TextFormInput
                                name="price"
                                label="Price ($)"
                                type="number"
                                placeholder="Enter price"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={4}>
                            <TextFormInput
                                name="bedrooms"
                                label="Bedrooms"
                                type="number"
                                placeholder="Number of bedrooms"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={4}>
                            <TextFormInput
                                name="bathrooms"
                                label="Bathrooms"
                                type="number"
                                placeholder="Number of bathrooms"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <TextFormInput
                                name="address"
                                label="Address"
                                placeholder="Enter full address"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <TextFormInput
                                name="city"
                                label="City"
                                placeholder="Enter city"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={4}>
                            <TextFormInput
                                name="state"
                                label="State"
                                placeholder="Enter state"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={4}>
                            <TextFormInput
                                name="zipCode"
                                label="ZIP Code"
                                placeholder="Enter ZIP code"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <TextFormInput
                                name="area"
                                label="Area (sq ft)"
                                type="number"
                                placeholder="Enter area in square feet"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                        <Col md={6}>
                            <TextFormInput
                                name="country"
                                label="Country"
                                placeholder="Enter country"
                                control={control}
                                errors={errors}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <ImageUploadZone
                                images={uploadedImages}
                                onUpload={handleImageUpload}
                                onDelete={handleImageDelete}
                                uploading={imageUploading}
                                maxImages={20}
                            />
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => {
                                reset();
                                setUploadedImages([]);
                            }}
                            disabled={isLoading}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading || imageUploading}
                        >
                            {isLoading && <Spinner size="sm" className="me-2" />}
                            {isEdit ? 'Update Property' : 'Create Property'}
                        </Button>
                    </div>
                </Form>
            </CardBody>
        </Card>
    );
};

export default PropertyUploadForm;
