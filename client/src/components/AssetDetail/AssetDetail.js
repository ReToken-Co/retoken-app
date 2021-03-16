import {  Button } from "../../globalStyles";
import { Paper, TextField, Grid } from "@material-ui/core";
//import { BidTable } from '..'
import {
  useStyles,
  TopLine,
  Heading1,
  Heading2,
  Heading3,
  Subtitle,
  EthLink,
  //  BidInputRow,
//  BidInputColumn,
  ImgWrapper,
  Img,
} from "./AssetDetail.style";

export default function AssetDetail(props) {

  const classes = useStyles();

  const RenderButton = () => {
    console.log(
      `btn ${props.id} ${props.status} ${props.account}`
    );

    if (props.status === 1) {
      /* Active listing */
      return (
        <Button big fontBig disabled={false} onClick={props.purchaseToken}>
          Purchase Token
        </Button>
      );
    } else if (props.status === -1) {
      /* Asset Sold Out */
      return (
        <Button big fontBig closed disabled={true}>
          SOLD OUT
        </Button>
      );
    } else {
      return (
        <Button big fontBig disabled={true}>
          Subscription Not Started
        </Button>
      );
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading1>
                {props.street}, {props.city} {props.zipCode}
              </Heading1>
              <Heading3>
                Owner {props.owner}
              </Heading3>
            </Grid>
            <Grid item xs={12}>
              <ImgWrapper start={"start"}>
                <Img src={props.image} alt={props.image} />
              </ImgWrapper>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading1>
                TOTAL INVESTMENT: US${props.askingPrice ? props.askingPrice.toLocaleString("en") : 0}
              </Heading1>
            </Grid>
            <Grid item xs={6}>
              <Heading2>
                Token for subscription: {props.noOfToken ? props.noOfToken.toLocaleString("en") : 0}
              </Heading2>
              <Heading2>Investment/Token: US${props.pricePerToken ? props.pricePerToken.toLocaleString("en") : 0}</Heading2>
              <Heading2 bigMargin={true}>
                Subscription: {props.subscription}%
              </Heading2>
              <Heading3>
                Annual Gross Rent: US${props.annualGrossRent ? props.annualGrossRent.toLocaleString("en") : 0}
              </Heading3>
              <Heading3>Annual Expense: US${props.annualExpense ? props.annualExpense.toLocaleString("en") : 0}</Heading3>
              <Heading3>NOI: US${props.noi ? props.noi.toLocaleString("en") : 0}</Heading3>
              <Heading3>Expected Yield: {props.expectedYield}%</Heading3>
              <Heading3>Occupancy Rate: {props.occupancy}%</Heading3>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.innerpaper} elevation={3}>
                <Heading2>Investment Calculator</Heading2>
                <Subtitle>Your Account:</Subtitle>
                <Subtitle smallFont bigMargin>{props.account}</Subtitle>
                <Subtitle bigMargin={true}>Balance: {props.balance}</Subtitle>
                <Heading3>Investment: US${props.investmentInput ? props.investmentInput.toLocaleString("en") : 0}</Heading3>
                <Heading3 bigMargin={true}>Expected Annual Income: US${props.incomeInput ? props.incomeInput.toLocaleString("en") : 0}</Heading3>
                  <TextField
                    id="investmentInput"
                    label="Investment Input"
                    defaultValue="0"
                    helperText="Enter No. of Token to Investment"
                    variant="outlined"
                    onChange={(e) => {
                      props.updateTokenInput(e.target.value);
                    }}
                  />
                  {RenderButton()}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Heading1>Property Highlight</Heading1>
            </Grid>
            <Grid item xs={6}>
              <Heading3>Property Type: {props.propertyType}</Heading3>
              <Heading3>
                Address: {props.street}, {props.city} {props.zipCode}
              </Heading3>
              <Heading3>
                Country/State: {props.country} {props.state}
              </Heading3>
            </Grid>
            <Grid item xs={6}>
              <Heading3>Building Size: {props.builtSize ? props.builtSize.toLocaleString("en") : 0} sqft</Heading3>
              <Heading3>Land Size: {props.landSize ? props.landSize.toLocaleString("en") : 0} sqft</Heading3>
              <Heading3>Year Built: {props.yearBuilt}</Heading3>
            </Grid>
            <Grid item xs={12}>
              <Heading3>{props.description}</Heading3>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Heading1>Contract Information</Heading1>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={3}>
              <Subtitle>Transaction Hash:</Subtitle>
            </Grid>
            <Grid item xs={6}>
              <EthLink target='_blank' href={`https://etherscan.io/tx/${props.transactionHash}`} >{props.transactionHash}</EthLink>
            </Grid>
          </Grid>
        </Paper>
      </div>

    </div>
  );
}
