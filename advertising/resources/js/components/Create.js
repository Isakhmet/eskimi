import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import AppContainer from "./AppContainer";
import axios from "axios";

function Create() {

    const [name, setName]               = useState('');
    const [from, setFrom]               = useState('');
    const [to, setTo]                   = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [dailyBudget, setDailyBudget] = useState('');
    const [images, setImage]            = useState(null);
    const history                       = useHistory();

    const onCreateSubmit = async () => {
        const formData = new FormData();

        if (images  && images.length > 0) {
            images.map((file) => {
                console.log(file.name);
                formData.append(file.name, file);
            })
        }
        formData.append('name', name);
        formData.append('from', from);
        formData.append('to', to);
        formData.append('totalBudget', totalBudget);
        formData.append('dailyBudget', dailyBudget);

        await axios.post(
            '/api/advertising',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(res => {
                if (!res.data.success) {
                    alert('Error message: ' + res.data.message)
                } else {
                    history.push('/');
                }
            })
    }

    const uploadFile = (event) => {
        const files = Object.values(event.target.files)
        setImage(files);
    }

    return (
        <AppContainer title="Create Advertising">
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
                    <label>Upload creative</label>
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
                        onClick={onCreateSubmit}
                    >
                        CREATE
                    </button>
                </div>
            </form>
        </AppContainer>
    );
}

export default Create;
