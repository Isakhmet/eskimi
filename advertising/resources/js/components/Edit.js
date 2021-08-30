import React, {useState, useEffect} from 'react';
import AppContainer from "./AppContainer";
import {useParams} from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";
import Slider from "./slider/Slider";

function Edit() {
    const {id}                            = useParams();
    const [modalActive, setModalActive]   = useState(false)
    const [name, setName]                 = useState('');
    const [from, setFrom]                 = useState('');
    const [to, setTo]                     = useState('');
    const [totalBudget, setTotalBudget]   = useState('');
    const [dailyBudget, setDailyBudget]   = useState('');
    const [images, setImages]             = useState([]);
    const [newImages, setNewImages]       = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    useEffect(() => {
        axios.get(
            '/api/advertising/' + id
        )
            .then(res => {
                const data = res.data;
                setName(data.name);
                setFrom(data.from);
                setTo(data.to);
                setTotalBudget(data.total_budget);
                setDailyBudget(data.daily_budget);
                setImages(data.images);
            })
    }, [deleteImages])

    const onUpdateSubmit = () => {
        const formData = new FormData();

        if (newImages && newImages.length > 0) {
            newImages.map((file) => {
                formData.append(file.name, file);
            })
        }

        formData.append('id', id);
        formData.append('name', name);
        formData.append('from', from);
        formData.append('to', to);
        formData.append('totalBudget', totalBudget);
        formData.append('dailyBudget', dailyBudget);

        axios.post(
            '/api/advertising/update',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                setDeleteImages(true);
            })
    }

    const renderSlider = () => {
        if (images && images.length > 0) {
            return (<Slider images={images}/>)
        } else {
            return (<p>There is not images</p>)
        }
    }

    const removeImage = (index) => {

        axios.post(
            '/api/images/delete',
            {
                image_id: images[index].id,
                id:       images[index].laravel_through_key,
            }
        ).then(res => {
            setDeleteImages(images[index])
        })
    }

    const deleteAllImages = () => {
        axios.post(
            '/api/images/delete-all',
            {
                id: id,
                images: images
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setDeleteImages(images)
        })
    }

    const uploadFile = (event) => {
        const files = Object.values(event.target.files)
        setNewImages(files);
    }

    return (
        <AppContainer title={"Edit"}>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>From</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>To</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Total budget ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={totalBudget}
                        onChange={e => setTotalBudget(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Daily budget ($)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={dailyBudget}
                        onChange={e => setDailyBudget(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Upload creative</label>
                    <ul className="list-group">
                        {images &&
                        images.map((item, index) => (

                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {item.name}
                                <span onClick={() => removeImage(index)} className="remove-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-file-earmark-x-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.854 7.146 8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                </span>
                            </li>

                        ))
                        }
                    </ul>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            setModalActive(true)
                        }}
                    >
                        Creative preview
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            deleteAllImages()
                        }}
                    >
                        Delete all
                    </button>
                    <Modal active={modalActive} setActive={setModalActive}>
                        {renderSlider()}
                    </Modal>
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={uploadFile}
                        multiple
                    />
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={onUpdateSubmit}
                    >
                        UPDATE
                    </button>
                </div>
            </form>
        </AppContainer>
    );
}

export default Edit;
