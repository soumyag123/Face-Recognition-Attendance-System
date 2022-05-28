import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import React from 'react';

// setting routes and data for side navbar of student profile page

export const StudentProfileData = [
    {
        title: 'Profile',
        path: '',
        icon: <FaIcons.FaUserAlt />,
        cname:'nav-text'
    },
    {
        title: 'Authentication Code',
        path: '/profile/student/authenticateCode',
        icon: <FaIcons.FaCode />,
        cname: 'nav-text'
    },
    {
        title: 'ChatBox',
        path: 'chat',
        icon: <FaIcons.FaRocketchat />,
        cname: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout/student',
        icon: <AiIcons.AiOutlineLogout />,
        cname:'nav-text'
    }
]