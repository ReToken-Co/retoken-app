import React, { useState } from 'react';
import {
    Container,
    Box, 
    Grid,
    makeStyles
  } from '@material-ui/core';

import { Navbar, UserSidebar } from "../../components";
import TokenCard from "./TokenCard";
import data from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

export default function Investments () {

  const classes = useStyles();
  const [tokens] = useState(data);

    return (
        <div>
            <Navbar />
            <UserSidebar />
            <div style={{ marginLeft: '220px' }}>
                <Container maxWidth={false}>
                  <Box mt={3}>
                    <Grid
                      container
                      spacing={3}
                    >
                    {tokens.map((token) => (
                      <Grid
                        item
                        key={token.id}
                        md={6}
                        xs={12}
                      >
                      <TokenCard
                      className={classes.productCard}
                      token={token}
                      />
                      </Grid>
                    ))}
                    </Grid>
                  </Box>
                </Container>
            </div> 
        </div>
    );
};