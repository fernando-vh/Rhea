import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createNormalNotification, createResponseNotification } from '../../../helpers/create-notification';
import { changeProfilePicRequest } from '../../../services/filesService';

const standarImageSize = 225;

const initialState = {
    upImg:undefined,
    crop:{ unit: 'px', width: standarImageSize, aspect: 1 },
    completedCrop:null
}

export function ProfilePicForm({uid}) {
    const [upImg, setUpImg] = useState(initialState.upImg);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState(initialState.crop);
    const [completedCrop, setCompletedCrop] = useState(initialState.completedCrop);
    const hiddenFileInput = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!completedCrop?.width || !completedCrop?.height){
            createNormalNotification('File error', `Image not loaded`);
        }
        else{
            changeUserProfilePicture(previewCanvasRef.current, completedCrop);
        }
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const changeUserProfilePicture = (canvas, crop) => {
        if (!crop || !canvas) {
            return;
        }
    
        canvas.toBlob(
            async (blob) => {
                const file = new File([blob], "f.jpg");
                const resp = await changeProfilePicRequest(uid, file);
                createResponseNotification(resp);
            },
            'image/jpg',
            1
        );
    }

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const _URL = window.URL || window.webkitURL;

            if (file) {
                const img = new Image();
                const objectUrl = _URL.createObjectURL(file);

                img.onload = function () {
                    if(img.width >= standarImageSize && img.height >= standarImageSize 
                        && img.width > img.height/2 && img.height > img.width/2){
                        const reader = new FileReader();
                        reader.addEventListener('load', () => setUpImg(reader.result));
                        reader.readAsDataURL(file);
                    }
                    else{
                        createNormalNotification('File error', 
                            `Image not loaded, use one with a square shape and greater than ${standarImageSize}x${standarImageSize}`);
                    }
                    _URL.revokeObjectURL(objectUrl);
                };

                img.src = objectUrl;
            }

            e.target.value = "";
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <div>

            <Form 
                onSubmit={handleSubmit}>
                <p>Change your profile picture</p>
                <Form.File id="formcheck-api-regular" className="mb-3 editor-card-header">

                    <div 
                        className="editor-card-header btn btn-outline-light d-flex justify-content-center"
                        onClick={handleClick}>
                            Select file
                    </div>

                    <Form.File.Input 
                        ref={hiddenFileInput}
                        accept="image/*"
                        onChange={onSelectFile}
                        style={{display:'none'}}/>

                </Form.File>

                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    locked
                    minHeight={standarImageSize}
                    minWidth={standarImageSize}
                    maxHeight={standarImageSize}
                    maxWidth={standarImageSize}
                />
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            // Canvas is needed to save image {this is Fer talking}
                            width: 0,
                            height: 0
                        }}
                    />
                </div>

                <div className="d-flex justify-content-center">
                    <Button type="submit" variant="outline-warning">
                        Change Profile Picture
                    </Button>
                </div>

            </Form>
                
            
        </div>
    );
}
