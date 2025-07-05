'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, Button, Row, Col, Spinner, Badge } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { IconifyIcon } from '@/components/wrappers/IconifyIcon'
import Image from 'next/image'

const ImageUploadZone = ({
  images = [],
  onUpload,
  onDelete,
  uploading = false,
  maxImages = 20,
  maxFileSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [dragActive, setDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error) => {
            if (error.code === 'file-too-large') {
              toast.error(`${file.name} is too large. Maximum size is 5MB.`)
            } else if (error.code === 'file-invalid-type') {
              toast.error(`${file.name} is not a valid image type.`)
            }
          })
        })
      }

      if (acceptedFiles.length > 0) {
        const remainingSlots = maxImages - images.length
        const filesToUpload = acceptedFiles.slice(0, remainingSlots)

        if (acceptedFiles.length > remainingSlots) {
          toast.warning(`Only ${remainingSlots} more images can be uploaded.`)
        }

        onUpload(filesToUpload)
      }
    },
    [images.length, maxImages, onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: maxFileSize,
    multiple: true,
    disabled: uploading || images.length >= maxImages,
  })

  const handleDelete = (index) => {
    onDelete(index)
  }

  const canUploadMore = images.length < maxImages

  return (
    <div className="image-upload-zone">
      <label className="form-label">Property Images</label>

      {/* Upload Zone */}
      {canUploadMore && (
        <Card className={`upload-dropzone mb-3 ${isDragActive ? 'drag-active' : ''}`} {...getRootProps()}>
          <Card.Body className="text-center py-5">
            <input {...getInputProps()} />

            {uploading ? (
              <div>
                <Spinner animation="border" className="mb-3" />
                <p className="mb-0">Uploading images...</p>
              </div>
            ) : (
              <div>
                <IconifyIcon icon="solar:cloud-upload-bold-duotone" className="fs-1 text-primary mb-3" />
                <h5>Drop images here or click to browse</h5>
                <p className="text-muted mb-0">
                  Supports: JPEG, PNG, WebP (Max 5MB each)
                  <br />
                  {images.length}/{maxImages} images uploaded
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="uploaded-images">
          <Row className="g-3">
            {images.map((image, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Card className="image-preview-card">
                  <div className="position-relative">
                    <Image
                      src={image.url}
                      alt={`Property image ${index + 1}`}
                      width={200}
                      height={150}
                      className="card-img-top object-fit-cover"
                      style={{ height: '150px' }}
                    />

                    {/* Primary Badge */}
                    {index === 0 && (
                      <Badge bg="primary" className="position-absolute top-0 start-0 m-2">
                        Primary
                      </Badge>
                    )}

                    {/* Delete Button */}
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 rounded-circle p-1"
                      onClick={() => handleDelete(index)}
                      style={{ width: '30px', height: '30px' }}>
                      <IconifyIcon icon="solar:trash-bin-minimalistic-bold" />
                    </Button>
                  </div>

                  <Card.Body className="p-2">
                    <small className="text-muted d-block text-truncate">{image.filename || `Image ${index + 1}`}</small>
                    {image.size && <small className="text-muted">{(image.size / 1024 / 1024).toFixed(2)} MB</small>}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Upload Instructions */}
      {images.length === 0 && !uploading && (
        <div className="text-center text-muted mt-3">
          <small>
            <IconifyIcon icon="solar:info-circle-bold" className="me-1" />
            Upload high-quality images to attract more buyers. The first image will be set as the primary image.
          </small>
        </div>
      )}
    </div>
  )
}

export default ImageUploadZone
