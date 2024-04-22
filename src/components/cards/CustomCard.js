// CustomCard.js

import React from 'react';
import './CustomCard.css';

const CustomCard = ({type, details, onClick }) => {
    console.log(__dirname)
    return (
    <>
    {type==='internship' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>INTERNSHIP AT {details.employer_name}</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
            <h3 className="card-title">Stipend : {details.ctc}</h3>
            <h3 className="card-title">Duration : {details.InternshipDuration} Months</h3>
        </div>

    </div>}

    {type==='scholarship' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>SCHOLARSHIP FROM {details.ScholarshipProvider}</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
        <h3 className="card-title">Amount : {details.amount}</h3>
        </div>

    </div>}

    {type==='project' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>PROJECT</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
        <h3 className="card-title">Title : {details.title}</h3>
        </div>

    </div>}

    {type==='sports' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>SPORT</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
        <h3 className="card-title">Event Name : {details.event_name}</h3>
        </div>

    </div>}

    {type==='papers' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>PAPER PUBLISHED</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
        <h3 className="card-title">Title: {details.title}</h3>
        </div>

    </div>}

    {type==='events' && <div className="custom-card" onClick={onClick}>
        <div>
            <center><h2 className='card-heading'>EVENT</h2></center>
        </div>

        <div className='card-personal'>
            <img src={`http://localhost:5000/getImage/${details.roll_number}`} alt={"IMAGE NOT FOUND"} className="card-image" />
            <div className='card-personal-text'>
                <p>Name : {details.Name}</p>
                <p>Reg No : {details.roll_number}</p>
                <p>Mobile : {details.Phone}</p>
            </div>
        </div>

        <div className="card-content">
        <h3 className="card-title">Name : {details.event_name}</h3>
        <h3 className="card-title">Award : {details.awards}</h3>
        </div>

    </div>}
    </>

  );
};

export default CustomCard;
