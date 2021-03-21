import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const HoldingsByToken = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [29, 19, 23, 29],
        backgroundColor: [
          colors.green[500],
          colors.pink[500],
          colors.indigo[500],
          colors.orange[500]
        ],
      }
    ],
    labels: ['5DR ($20,000)', 'NMR ($12,500)', 'CTR ($15,000)', 'RTN ($20,000)']
  };

  const options = {
    legend: {
      display: true
    },
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
          return percentage + "%";
        },                    
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
		  }
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Investment Per Asset" />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

HoldingsByToken.propTypes = {
  className: PropTypes.string
};

export default HoldingsByToken;