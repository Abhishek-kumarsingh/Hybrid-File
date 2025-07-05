'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Button, Row, Col, Spinner, Badge, Alert } from 'react-bootstrap';
import { IconifyIcon } from '@/components/wrappers/IconifyIcon';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

const ImageUpload = ({
    images = [],
    onUpload,
    onRemove,
    uploading = false,
    maxImages = 10,
    maxFileSize = 5 * 1024 * 1024 // 5MB
}) => {
    const [dragActive, setDragActive] = useState(false);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            rejectedFiles.forEach(({ file, errors }) => {
                errors.forEach(error => {
                    if (error.code === 'file-too-large') {
                        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
                    } else if (error.code === 'file-invalid-type') {
                        toast.error(`${file.name} is not a valid image type.`);
                    }
                });
            });
        }

        if (acceptedFiles.length > 0) {
            const remainingSlots = maxImages - images.length;
            const filesToUpload = acceptedFiles.slice(0, remainingSlots);

            if (acceptedFiles.length > remainingSlots) {
                toast.warning(`Only ${remainingSlots} more images can be uploaded.`);
            }

            onUpload(filesToUpload);
        }
    }, [images.length, maxImages, onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxSize: maxFileSize,
        multiple: true,
        disabled: uploading || images.length >= maxImages
    });

    const handleRemove = (index) => {
        onRemove(index);
    };

    const canUploadMore = images.length < maxImages;

    return (
        <div className="image-upload-component">
            {/* Upload Zone */}
            {canUploadMore && (
                <Card
                    className={`upload-dropzone mb-4 border-2 border-dashed ${
                        isDragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary'
                    } ${uploading ? 'opacity-50' : ''}`}
                    {...getRootProps()}
                    style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
                >
                    <Card.Body className="text-center py-5">
                        <input {...getInputProps()} />

                        {uploading ? (
                            <div>
                                <Spinner animation="border" variant="primary" className="mb-3" />
                                <h6 className="text-primary">Uploading images...</h6>
                                <p className="text-muted mb-0">Please wait while we process your images</p>
                            </div>
                        ) : (
                            <div>
                                <IconifyIcon
                                    icon="solar:cloud-upload-bold-duotone"
                                    className="fs-1 text-primary mb-3"
                                />
                                <h5 className="mb-2">Drop images here or click to browse</h5>
                                <p className="text-muted mb-3">
                                    Supports: JPEG, PNG, WebP (Max 5MB each)
                                </p>
                                <Badge bg="light" text="dark" className="px-3 py-2">
                                    {images.length}/{maxImages} images uploaded
                                </Badge>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            )}

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="uploaded-images">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">
                            <IconifyIcon icon="solar:gallery-bold" className="me-2" />
                            Uploaded Images ({images.length})
                        </h6>
                        {images.length >= maxImages && (
                            <Badge bg="warning">Maximum images reached</Badge>
                        )}
                    </div>
                    
                    <Row className="g-3">
                        {images.map((imageUrl, index) => (
                            <Col key={index} xs={6} sm={4} md={3} lg={2}>
                                <Card className="image-preview-card h-100 shadow-sm">
                                    <div className="position-relative">
                                        <Image
                                            src={imageUrl}
                                            alt={`Property image ${index + 1}`}
                                            width={200}
                                            height={150}
                                            className="card-img-top object-fit-cover"
                                            style={{ height: '150px', borderRadius: '0.375rem 0.375rem 0 0' }}
                                        />

                                        {/* Primary Badge */}
                                        {index === 0 && (
                                            <Badge
                                                bg="success"
                                                className="position-absolute top-0 start-0 m-2"
                                            >
                                                <IconifyIcon icon="solar:star-bold" className="me-1" />
                                                Primary
                                            </Badge>
                                        )}

                                        {/* Delete Button */}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            className="position-absolute top-0 end-0 m-2 rounded-circle d-flex align-items-center justify-content-center"
                                            onClick={() => handleRemove(index)}
                                            style={{ width: '32px', height: '32px', padding: '0' }}
                                            title="Remove image"
                                        >
                                            <IconifyIcon icon="solar:trash-bin-minimalistic-bold" />
                                        </Button>
                                    </div>

                                    <Card.Body className="p-2">
                                        <small className="text-muted d-block text-center">
                                            Image {index + 1}
                                            {index === 0 && (
                                                <span className="text-success fw-semibold"> (Primary)</span>
                                            )}
                                        </small>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}

            {/* Upload Instructions */}
            {images.length === 0 && !uploading && (
                <Alert variant="info" className="mt-3">
                    <IconifyIcon icon="solar:info-circle-bold" className="me-2" />
                    <strong>Upload Tips:</strong> Add high-quality images to attract more buyers. 
                    The first image will be set as the primary image and displayed prominently.
                </Alert>
            )}

            {/* Status Messages */}
            {!canUploadMore && (
                <Alert variant="warning" className="mt-3">
                    <IconifyIcon icon="solar:danger-triangle-bold" className="me-2" />
                    Maximum number of images ({maxImages}) reached. Remove some images to upload new ones.
                </Alert>
            )}
        </div>
    );
};

export default ImageUpload;
