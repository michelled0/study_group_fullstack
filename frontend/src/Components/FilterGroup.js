import React from "react";


function FilterGroup() {
    const [reservations, setReservations] = React.useState([]);
    const searchRef = React.useRef(null);

    React.useEffect(() => {
        // Retrieve reservations from localStorage
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(storedReservations);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value.trim().toLowerCase();
        if (searchTerm) {
            const targetGroup = reservations.find(reservation => reservation.group.toLowerCase() === searchTerm);
            if (targetGroup) {
                const groupElement = document.getElementById(targetGroup.group);
                if (groupElement) {
                    groupElement.scrollIntoView({ behavior: "smooth" });
                    groupElement.style.backgroundColor = "yellow";
                    setTimeout(() => {
                        groupElement.style.backgroundColor = "";
                    }, 3000);
                }
            } else {
                alert("Group not found.");
            }
        } else {
            alert("Please enter a group name.");
        }
    };

    return (
        <div className='reservationGroup'>
            <h1>Groups</h1>
            <h3 >Search for group: 
                <form style={{margin:10}} onSubmit={handleSubmit}>
                    <input type="text" name="search" ref={searchRef}/>
                    <button type="submit">Search</button>
                </form>
            </h3>
            {Object.entries(
                reservations.reduce((groups, reservation) => {
                    const group = reservation.group;
                    const date = reservation.date.toString().split("T")[0]; // Get date part only
                    if (!groups[group]) {
                        groups[group] = {};
                    }
                    if (!groups[group][date]) {
                        groups[group][date] = [];
                    }
                    groups[group][date].push(reservation);
                    return groups;
                }, {})
            ).map(([group, groupReservations]) => (
                <div className="group" key={group} id={group}>
                    <h2>{group}</h2>
                    {Object.entries(groupReservations).map(([date, reservationsByDate]) => (
                        <div className = "date" key={date}>
                            <h4>{date}</h4>
                            {reservationsByDate.map((reservation, index) => (
                                <div className="res-item" key={index}>
                                    <p>Name: {reservation.firstName} {reservation.lastName}</p>
                                    <p>Date: {reservation.date.toString().split("T")[0]}</p>
                                    <p>Bio: {reservation.bio}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default FilterGroup;