import React, { useState, useEffect } from "react";
import api from '/Users/michelle/Desktop/cs_proj/react_proj/frontend/src/api/axiosConfig';

function ReservationFilter() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [showReservations, setShowReservations] = useState(false);

    useEffect(() => {
        if (showReservations) {
            const fetchReservations = async () => {
                try {
                    const usersResponse = await api.get("/api/v1/users/" + firstName.toLowerCase() + "_" + lastName.toLowerCase());
                    console.log("API Response:", usersResponse.data);
                    if (usersResponse.data) {
                        setFilteredReservations(usersResponse.data.appointments);
                    } else {
                        console.error("Unexpected response structure:", usersResponse.data);
                        setFilteredReservations([]);
                    }
                } catch (error) {
                    console.error("Error fetching reservations:", error);
                    setFilteredReservations([]);
                }
            };

            fetchReservations();
        }
    }, [showReservations, firstName, lastName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowReservations(true);
    };

    return (
        <div className="reservationFilter">
            <h1>Enter your name to view your sign ups</h1>
            <form onSubmit={handleSubmit}>
                <label className="name">
                    First Name:
                    <input
                        style={{margin:10}}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label lassName="name">
                    Last Name:
                    <input
                        style={{margin:10}}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <button type="submit">Search</button>
            </form>

            
            {(showReservations) && (
                <div>
                    <h2>Existed sign ups</h2>
                    <ul style = {{listStyleType: 'none'}}>
                        {filteredReservations
                            .map((reservation, index) => (
                                <li className = "key" key={index}>
                                    <p>Name: {firstName} {lastName}</p>
                                    
                                    <p>Date: {reservation.date.toString().split("T")[0]}</p>
                                    
                                    <p>Group: {reservation.group}</p>
                                    
                                    <p>Bio: {reservation.bio}</p>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ReservationFilter;
