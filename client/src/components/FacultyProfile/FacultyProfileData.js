import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import React from 'react';

// setting routes and data for side navbar of faculty profile page

export const FacultyProfileData = [
    {
        title: 'Profile',
        path: '',
        icon: <FaIcons.FaUserAlt />,
        cname:'nav-text'
    },
    {
        title: 'Generate Code',
        path: '/profile/faculty/generateCode',
        icon: <FaIcons.FaCode />,
        cname: 'nav-text'
    },
    {
        title: 'Attendance Sheet',
        path: '',
        icon: <AiIcons.AiFillFileText />,
        iconClosed: <AiIcons.AiFillCaretDown />,
        iconOpen: <AiIcons.AiFillCaretUp />,
        subNav: [
            {
                title: 'Daily Attendance',
                path: 'daily',
                icon:<AiIcons.AiFillFileText />,
            },
            {
                title: 'Monthly Attendance',
                path: 'monthly',
                icon:<AiIcons.AiFillFileText />
            }
        ]
    },
    {
        title: 'ChatBox',
        path: 'chat',
        icon: <FaIcons.FaRocketchat/>
    },
    {
        title: 'Logout',
        path: '/logout/faculty',
        icon: <AiIcons.AiOutlineLogout />
    }
]
