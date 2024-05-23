import React from "react";
import api from '/Users/michelle/Desktop/cs_proj/react_proj/frontend/src/api/axiosConfig';

function Group() {
    const [users, setUsers] = React.useState([]);
    const getUsers = async() => {
        try {
            const response = await api.get("/api/v1/users")

            setUsers(response.data);
            
            }
        catch(err) {
            console.log("err");
        }
    }
    React.useEffect(() => {
        getUsers();
    }, [])

    const usersByGroup = {};

    users.forEach(user => {
        user.appointments.forEach(appointment => {
            const group = appointment.group;
            const date = appointment.date;
            
            if (!usersByGroup[group]) {
                usersByGroup[group] = {};
            }

            if (!usersByGroup[group][date]) {
                usersByGroup[group][date] = [];
            }

            const appointmentWithNames = { ...appointment, firstName: user.firstName, lastName: user.lastName };
            usersByGroup[group][date].push(appointmentWithNames);
        });
    });

    console.log(usersByGroup["Bio"])



    function handleSubmit(e) {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value;
        if (searchTerm) {
            const targetGroup = usersByGroup[searchTerm];
            if (targetGroup) {
                const groupElements = document.querySelectorAll('.group h3');
                groupElements.forEach(groupElement => {
                    const text = groupElement.textContent.toLowerCase();
                    if (text.includes(searchTerm.toLowerCase())) {
                        groupElement.scrollIntoView({ behavior: "smooth" });
                        groupElement.style.backgroundColor = "yellow";
                        setTimeout(() => {
                            groupElement.style.backgroundColor = "";
                        }, 3000);
                    }});
            } else {
                alert("Group not found.");
            }
        } else {
            alert("Please enter a group name.");
        }
    }

    return (
        <div className = "reservationGroup">
            <h1>All Groups</h1>
            <div className = "search">
                <p>Search for group: 
                    <form onSubmit={handleSubmit}>
                        <input className="input-box" type="text" name="search"/>
                        <button className="input-box" type="submit">Search</button>
                    </form>
                </p>
            </div>
            <div className = "group-whole">
                {Object.keys(usersByGroup).map(group => (
                    <div className = "group">
                        <h3>{group}</h3>
                        <div className="date">
                            {Object.keys(usersByGroup[group]).map(date => (
                                <div>
                                    <p>Date: {date}</p>
                                    {usersByGroup[group][date].map(user => (
                                        <div className = "res-item">
                                            <p>Name: {user.firstName} {user.lastName}</p>
                                            <p>Date: {user.date}</p>
                                            <p>Bio: {user.description}</p>
                                        </div>
                                ))}
                                </div>
                            ))}
                        </div>
                    </div>

                ))
                }
            </div>
        </div>
    )
}

export default Group;