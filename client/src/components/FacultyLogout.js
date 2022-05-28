import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FacultyLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        
        fetch('/logout/faculty', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials:'include'
        }).then((res) => {
            navigate('/login/faculty');

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    })

  return (
    <div>Faculty Logout page</div>
  )
}

export default FacultyLogout