import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  FormControl,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { Button } from "../../globalStyles";
import { InputContainer, useStyles } from "./InputForm.style";

export default function InputForm(props) {
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  console.log(`in form seller ${props.seller}`);

  return (
    <div className={classes.root}>
      <InputContainer>
        <form onSubmit={handleSubmit(props.addAuction)}>
          <Paper className={classes.paper}>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <Controller
                name="owner"
                as={
                  <TextField
                    id="owner"
                    label="Owner"
                    disabled
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue={props.owner}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <Controller
                name="addressStreet"
                as={
                  <TextField
                    id="addressStreet"
                    label="Street"
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="city"
                as={<TextField id="city" label="City" variant="outlined" />}
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="state"
                as={
                  <TextField
                    id="state"
                    label="State/Province"
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="country"
                as={
                  <TextField id="country" label="Country" variant="outlined" />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="zipcode"
                as={
                  <TextField id="zipcode" label="Zipcode" variant="outlined" />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <Controller
                name="image"
                as={
                  <TextField id="image" label="Image File" variant="outlined" />
                }
                control={control}
                defaultValue="images/"
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <Controller
                name="description"
                as={
                  <TextField
                    id="description"
                    multiline
                    rows={4}
                    label="Description"
                    helperText=""
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="askingprice"
                as={
                  <TextField
                    id="askingprice"
                    label="Asking Price"
                    helperText="in (USD)"
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue=""
              />
            </FormControl>
            <FormControl className={classes.margin} variant="outlined">
              <Controller
                name="duration"
                as={
                  <TextField
                    id="duration"
                    label="Duration"
                    helperText="Duration (min)"
                    variant="outlined"
                  />
                }
                control={control}
                defaultValue="60"
              />
            </FormControl>
          </Paper>

          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.margin} variant="h6">
                  Property Highlights
                </Typography>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="propertyType"
                    as={
                      <TextField
                        id="propertyType"
                        label="Property Type"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="builtSize"
                    as={
                      <TextField
                        id="builtSize"
                        label="Building Size"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="landSize"
                    as={
                      <TextField
                        id="landSize"
                        label="Land Size"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="yearBuilt"
                    as={
                      <TextField
                        id="yearBuilt"
                        label="Year Built"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="occupancy"
                    as={
                      <TextField
                        id="occupancy"
                        label="Occupancy (%)"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.margin} variant="h6">
                  Financials (USD)
                </Typography>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="annualGrossRent"
                    as={
                      <TextField
                        id="annualGrossRent"
                        label="Gross Rent/year"
                        helperText="rolling 12 months"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="annualExpenses"
                    as={
                      <TextField
                        id="annualExpenses"
                        label="Annual Expenses"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="NOI"
                    as={
                      <TextField
                        id="NOI"
                        label="NOI"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl className={classes.margin} variant="outlined">
                  <Controller
                    name="expectedYield"
                    as={
                      <TextField
                        id="expectedYield"
                        label="Expected Yield (%)"
                        variant="outlined"
                      />
                    }
                    control={control}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Paper>

          <Button
            className={classes.margin}
            fontBig
            id="submitButton"
            type="submit"
          >
            Add Asset
          </Button>
        </form>
      </InputContainer>
    </div>
  );
}
