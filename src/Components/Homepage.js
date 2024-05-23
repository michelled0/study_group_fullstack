import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '/Users/michelle/Desktop/cs_proj/react_proj/frontend/src/api/axiosConfig';

function Homepage() {
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedOption, setSelectedOption] = React.useState('');
    const [bio, setBio] = React.useState("")

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

    let usersByGroup = [];

    users.forEach(user => {
        user.appointments.forEach(appointment => {
            const group = appointment.group;
            if (!usersByGroup.includes(group)) {
                usersByGroup.push(group);
            }
        });
    });


    const SelectWithCustomInput = () => {
        const [options, setOptions] = React.useState([]);
        const [customInput, setCustomInput] = React.useState('');

        React.useEffect(() => {
            console.log("run")
           setOptions(usersByGroup)
        }, [usersByGroup]);
        
        React.useEffect(()=> {
            if (selectedOption != '') {
                usersByGroup.push(selectedOption);
            }
            console.log("list", options)
        }, [options])
        const handleSelectChange = (e) => {
            setSelectedOption(e.target.value);
        };

        const handleInputChange = (e) => {
            setCustomInput(e.target.value);
        };

        const handleAddCustomOption = () => {
            const trimmedInput = customInput.trim();
            if (trimmedInput !== '') {
                const lowerCaseInput = trimmedInput.toLowerCase();
                const matchingOption = options.find(option => option.toLowerCase() === lowerCaseInput);
                if (matchingOption) {
                    setSelectedOption(matchingOption);
                } else {
                    setSelectedOption(trimmedInput);
                    usersByGroup.push(trimmedInput);
                    
                }
                setCustomInput('');
            }
        };

        

        return (
            <div className='item'>
                <p className='grou-label'>Group: 
                    <select className = "input-box" style={{marginLeft: '10px'}} value={selectedOption} onChange={handleSelectChange}>
                        <option value="">Select an option...</option>
                        {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                    <input
                        className='input-box'
                        type="text"
                        value={customInput}
                        onChange={handleInputChange}
                        placeholder="Enter custom option"
                    />
                    <button className = "input-box" onClick={handleAddCustomOption}>Add</button>
                </p>
            </div>
        );
    };

    

    function handleChange(func, e) {
        func(e.target.value);
    }

    function clickHandler() {

        if (!first) {
            alert("Please fill out your first name")
        }
        else if (!last) {
            alert("Please fill out your last name")
        } else if(!selectedDate) {
            alert("Please fill out your available date")
        } else if (!selectedOption) {
            alert("Please select or create your choice for group")
        }
        else {
            addAppointment();
        }
    }

    const addAppointment = async () => {
        try {
            const usersResponse = await api.get("/api/v1/users/" + (first.toLowerCase() + "_" + last.toLowerCase()));
            console.log(usersResponse.data)
            if (!usersResponse.data) {
                await api.post("/api/v1/users", {
                    firstName: first,
                    lastName: last,
                    firstLast: first.toLowerCase() + "_" + last.toLowerCase()
                })
            }
            const response = await api.post("/api/v1/appointments", {
                firstLast: first.toLowerCase() + "_" + last.toLowerCase(),
                date: selectedDate.toDateString(),
                group: selectedOption,
                description: bio || ""
            });
            alert("You made a reservation!");
            console.log("Appointment added successfully:", response.data);
            
        } catch (error) {
            console.error("Error adding appointment:", error);
        }
    };

    function handleDateChange(date) {
        setSelectedDate(date);
    }
    
    return (<div className="homepage">
        <h1>Sign up for a study group!</h1>
        <div className='item'>
            <p>First Name: 
                <input style={{marginLeft: '10px'}} value = {first} onChange ={(e) => handleChange(setFirst,e)} required/>
            </p>
        </div>
        <div className = "item">
            <p>Last Name: 
                <input style={{marginLeft: '10px'}} value = {last} onChange = {(e) => handleChange(setLast, e)} required/>
            </p>
        </div>
        <div className="item">
            <p>Availability Date:</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                />
            
            
        </div>
        <SelectWithCustomInput/>
        <div className='item'>
            <p>Describe yourself, your question with the topic, what you want to study, etc:</p>
            <textarea value = {bio} onChange = {(e) => handleChange(setBio, e)} required/>
        </div>
        <div className='item'>
            <button onClick = {clickHandler}>Submit</button>
        </div>
    </div>)
}

export default Homepage;