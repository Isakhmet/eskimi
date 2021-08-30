import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Modal from './Modal'
import Slider from "./slider/Slider";

function Table() {
    const [advertisings, setAdvertising] = useState(null);
    const [images, setImages] = useState(null);
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        axios.get('/api/advertising')
            .then(res => {
                setAdvertising(res.data)
            })
    }, [])

    const renderSlider = () => {
        if(images && images.length > 0) {
            return (<Slider images={images}/>)
        }else {
            return (<p>There is not images</p>)
        }
    }

    const renderAdvertising = () => {
        if(!advertisings) {
            return (
                <tr>
                    <td colSpan="7">
                        Loading data...
                    </td>
                </tr>
            )
        }

        if(advertisings.length === 0) {
            return (
                <tr>
                    <td colSpan="7">
                        There are no data yet
                    </td>
                </tr>
            )
        }

        return advertisings.map((advertising, index) => (
            <tr key={index}>
                <th scope="row">{advertising.id}</th>
                <td>{advertising.name}</td>
                <td>{advertising.from}</td>
                <td>{advertising.to}</td>
                <td>{advertising.total_budget}</td>
                <td>{advertising.daily_budget}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => { setModalActive(true); setImages(advertisings[index].images)}}>Creative preview</button>
                    <Link to={`/edit/${advertising.id}`} className="btn btn-warning">Edit</Link>
                </td>
            </tr>
            )
        )
    }

    return (
    <div className="wrap">
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">from</th>
                <th scope="col">to</th>
                <th scope="col">Total budget</th>
                <th scope="col">Daily budget</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {renderAdvertising()}
            </tbody>
        </table>
        <Modal active={modalActive} setActive={setModalActive}>
            {renderSlider()}
        </Modal>
    </div>
);
}

export default Table;
