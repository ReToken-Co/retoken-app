import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  TextField,
  Typography,
  Grid,
} from "@material-ui/core";
import { Button } from "../../globalStyles";
import { InputContainer, useStyles } from "./InputForm.style";

export default function InputForm(props) {

  const defaultValues = {
    owner: "",
    image: "images/",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    askingPrice: 0,
    noOfToken: 0,
    pricePerToken: 0,
    ownerSubscription: 0,
    description: "",
    propertyType: "",
    builtSize: 0,
    landSize: 0,
    yearBuilt: "",
    occupancy: 0,
    annualGrossRent: 0,
    annualExpense: 0,
    noi: 0, 
    expectedYield: 0,
    invProspectHash: "",
    valuationHash: "",
  }
  const { control, handleSubmit, setValue } = useForm({ defaultValues });
  const classes = useStyles();

//  console.log(`input ${props.admin} ${props.owner}`);

  useEffect(() => {
    if (props) {
      setValue("owner", props.owner);
      setValue("image", props.image ? props.image : "images/");
      setValue("street", props.street);
      setValue("city", props.city);
      setValue("state", props.state);
      setValue("country", props.country);
      setValue("zipCode", props.zipCode);
      setValue("askingPrice", props.askingPrice);
      setValue("noOfToken", props.noOfToken);
      setValue("pricePerToken", props.pricePerToken);
      setValue("ownerSubscription", props.ownerSubscription);
      setValue("description", props.description);
      setValue("propertyType", props.propertyType);
      setValue("builtSize", props.builtSize);
      setValue("landSize", props.landSize);
      setValue("yearBuilt", props.yearBuilt);
      setValue("occupancy", props.occupancy);
      setValue("annualGrossRent", props.annualGrossRent);
      setValue("annualExpense", props.annualExpense);
      setValue("noi", props.noi);
      setValue("expectedYield", props.expectedYield);
      setValue("invProspectHash", props.invProspectHash);
      setValue("valuationHash", props.valuationHash);
    } 
  }, [props]);
  /*
  const updateNOIYield = (e) => {
    if (e.target.id === "annualExpense")
      setAnnualGrossRentTemp(e.target.value)
    else
      setAnnualExpenseTemp(e.target.value)

    setNoiCalc(annualGrossRentTemp - annualExpenseTemp)
    setYieldCalc(noiCalc / props.askingPrice)
  };
*/

  return (
    <div className={classes.root}>
      <InputContainer>
        <form onSubmit={
            props.admin
              ? handleSubmit(props.editAsset)
              : handleSubmit(props.addAsset)
          }
        >
          <Paper className={classes.paper}>
            <Controller name="owner" control={control} as={
              <TextField id="owner" label="Owner" variant="outlined" InputLabelProps={{ shrink: true }} disabled fullWidth className={classes.margin} />
            } />
            <Controller name="street" control={control} as={
              <TextField id="street" label="Street" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth className={classes.margin} />
            } />
            <Controller name="city" control={control} as={
              <TextField id="city" label="City" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
            } />
            <Controller name="state" control={control} as={
              <TextField id="state" label="State/Province" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
            } />
            <Controller name="country" control={control} as={
              <TextField id="country" label="Country" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
            } />
            <Controller name="zipCode" control={control} as={
              <TextField id="zipCode" label="Zip Code" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
            } />
            <Controller name="image" control={control} as={
              <TextField id="image" label="Image File" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth className={classes.margin} />
            } />
            {props.admin && (
              <Controller name="invProspectHash" control={control} as={
                <TextField id="invProspectHash" label="Investment Prospectus Hash" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth className={classes.margin} />
              } />
            )}
            {props.admin && (
              <Controller name="valuationHash" control={control} as={
                <TextField id="valuationHash" label="Valuation Report Hash" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth className={classes.margin} />
              } />
            )}
            <Controller name="description" control={control} as={
              <TextField id="description" label="Description" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth multiline rows={8} className={classes.margin} />
            } />
            <Controller name="askingPrice" control={control} as={
              <TextField id="askingPrice" label="Asking Price" variant="outlined" InputLabelProps={{ shrink: true }} helperText="in (USD)" className={classes.margin} />
            } />
            {props.admin && (
              <Controller name="noOfToken" control={control} as={
                <TextField id="noOfToken" label="# of Tokens to be Issued" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
              } />
            )}
            {props.admin && (
              <Controller name="pricePerToken" control={control} as={
                <TextField id="pricePerToken" label="Price/Token" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
              } />
            )}
            {props.admin && (
              <Controller name="ownerSubscription" control={control} as={
                <TextField id="ownerSubscription" label="Tokens Subscribe by Owner" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
              } />
            )}
          </Paper>

          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.margin} variant="h6">Property Highlights</Typography>
              </Grid>
              <Grid item xs>
                <Controller name="propertyType" control={control} as={
                  <TextField id="propertyType" label="Property Type" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="builtSize" control={control} as={
                  <TextField id="builtSize" label="Building Size" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="landSize" control={control} as={
                  <TextField id="landSize" label="Land Size" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="yearBuilt" control={control} as={
                  <TextField id="yearBuilt" label="Year Built" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="occupancy" control={control} as={
                  <TextField id="occupancy" label="Occupancy (%)" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.margin} variant="h6">Financials (USD)</Typography>
              </Grid>
              <Grid item xs>
                <Controller name="annualGrossRent" control={control} as={
                  <TextField id="annualGrossRent" label="Gross Rent/year" variant="outlined" InputLabelProps={{ shrink: true }} helperText="rolling 12 months" className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="annualExpense" control={control} as={
                  <TextField id="annualExpense" label="Annual Expenses" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="noi" control={control} as={
                  <TextField id="noi" label="NOI" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
              </Grid>
              <Grid item xs>
                <Controller name="expectedYield" control={control} as={
                  <TextField id="expectedYield" label="Expected Yield (%)" variant="outlined" InputLabelProps={{ shrink: true }} className={classes.margin} />
                } />
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
            {props.admin ? "Update Asset" : "Add Asset"}
          </Button>
        </form>
      </InputContainer>
    </div>
  );
}
