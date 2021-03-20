import React from 'react';
import {
    Container,
    Grid
  } from '@material-ui/core';

import { Navbar, UserSidebar } from "../../components";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";

export default function Account () {
    
    return (
        <div>
            <Navbar />
            <UserSidebar />
            <div style={{ padding: '30px 10px', marginLeft: '220px' }}>
            <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
            </div> 
        </div>
    );
};