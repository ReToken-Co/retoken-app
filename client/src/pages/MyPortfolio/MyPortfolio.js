import React from 'react';
import {
    Container,
    Grid,
    makeStyles
  } from '@material-ui/core';

import { Navbar, UserSidebar } from "../../components";
import PortfolioValue from "./PortfolioValue";
import TotalTokens from "./TotalTokens";
import LatestInvestments from "./LatestInvestments";
import InvestmentPerAsset from "./InvestmentPerAsset";


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

export default function MyPortfolio () {

    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <UserSidebar />
            <div style={{ padding: '30px 10px', marginLeft: '220px' }}>
              <Container maxWidth={false}>
                <Grid
                  container
                  spacing={3}
                >
                    <Grid
                      item
                      sm={6}
                      xs={12}
                    >
                      <PortfolioValue />
                    </Grid>
                    <Grid
                    item
                    sm={6}
                    xs={12}
                  >
                    <TotalTokens />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <LatestInvestments />
                  </Grid>
                  <Grid
                    item
                    md={8}
                    xs={12}
                  >
                    <InvestmentPerAsset />
                  </Grid>
                </Grid>
              </Container>
            </div> 
        </div>
    );
};