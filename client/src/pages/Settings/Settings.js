import React from 'react';

import {
    Box,
    Container
  } from '@material-ui/core';

import { Navbar, UserSidebar } from "../../components";
import Notifications from './Notifications';
import Password from './Password';

export default function Settings () {

    return (
        <div>
            <Navbar />
            <UserSidebar />
            <div style={{ padding: '30px 10px', marginLeft: '220px' }}>
                <Container maxWidth="lg">
                    <Notifications />
                    <Box mt={3}>
                        <Password />
                    </Box>
                </Container>
            </div> 
        </div>
    );
};