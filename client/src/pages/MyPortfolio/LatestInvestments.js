import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  withStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    asset: 'RTN',
    quantity: 1,
    value: 1000
  },
  {
    id: uuid(),
    asset: '5DR',
    quantity: 2,
    value: 1000
  },
  {
    id: uuid(),
    asset: 'NMR',
    quantity: 3,
    value: 1500
  },
  {
    id: uuid(),
    asset: 'CTR',
    quantity: 1,
    value: 1000
  }
];

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles(() => ({
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestInvestments = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);

  return (
    <Card
      {...rest}
    >
      <CardHeader 
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
        )}
      title="Latest Investments" />
      <Divider />
        <Box 
        minWidth={200}
        height={450}
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Asset</StyledTableCell>
                <StyledTableCell align="center">No. of Tokens</StyledTableCell>
                <StyledTableCell align="right">Value (USD)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow
                  hover
                  key={order.id}
                >
                  <StyledTableCell>
                    {order.asset}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.value}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
    </Card>
  );
};

LatestInvestments.propTypes = {
  className: PropTypes.string
};

export default LatestInvestments;