import api from '/Users/michelle/Desktop/cs_proj/react_proj/frontend/src/api/axiosConfig';
import {useState, useEffect} from 'react';

function Reservation() {
    
    const [users, setUsers] = useState([]);
    const getUsers = async() => {
        try {
            const response = await api.get("/api/v1/users")
            
            console.log(response.data);

            setUsers(response.data);
            
            }
        catch(err) {
            console.log("err");
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className = "user">
            {users.map(user => (
                <div key = {user.firstLast}>
                    <h3>Name: {user.firstName} {user.lastName}</h3>
                    <div className = "appointment">{
                        user.appointments.map((appointment) => (
                            <div>
                                <p>Date: {appointment.date}</p>
                                <p>Group: {appointment.group}</p>
                                <p>Bio: {appointment.description}</p>
                            </div>
                        ))
                    }</div>
                </div>
            ))}
        </div>
    )
}

export default Reservation;