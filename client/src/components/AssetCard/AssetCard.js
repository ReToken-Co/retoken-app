import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Button } from "../../globalStyles";

//import 'fontsource-roboto'
import {
  useStyles,
  Heading,
  Subheading,
  Subtitle,
  BodyText,
  TextWrapper,
} from "./AssetCard.style";

export default function AssetCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const getAsset = (id) => {
    history.push({
      pathname: "/asset",
      search: `?id=${id}`,
      state: {
        id: props.id,
        scId: props.scId,
        image: props.image,
        transactionHash: props.transactionHash,
        subscription: props.subscription,
        status: props.status,
        owner: props.owner,
        askingPrice: props.askingPrice,
        noOfToken: props.noOfToken,
        pricePerToken: props.pricePerToken,
        street: props.street,
        city: props.city,
        state: props.state,
        country: props.country,
        zipCode: props.zipCode,
        description: props.description,
        propertyType: props.propertyType,
        builtSize: props.builtSize,
        landSize: props.landSize,
        yearBuilt: props.yearBuilt,
        occupancy: props.occupancy,
        annualGrossRent: props.annualGrossRent,
        annualExpense: props.annualExpense,
        noi: props.noi,
        expectedYield: props.expectedYield,
        account: props.account,
      },
    });
//    console.log(`push history ${JSON.stringify(history)}`);
  };

  const RenderAssetDetailButton = () => {
    //    console.log(`btn ${props.id} ${props.status}`)
    if (props.status === 1) {
      return (
        <Button
          Big
          fontBig
          live
          id={props.id}
          disabled={false}
          onClick={(e) => {
            getAsset(e.target.id);
          }}
        >
          View Detail
        </Button>
      );
    } else if (props.status === -1 || props.status === 2) {
      return (
        <Button
          Big
          fontBig
          closed
          id={props.id}
          disabled={false}
          onClick={(e) => {
            getAsset(e.target.id);
          }}
        >
          SOLD OUT
        </Button>
      );
    } else {
      return (
        <Button
          Big
          fontBig
          id={props.id}
          disabled={false}
          onClick={(e) => {
            getAsset(e.target.id);
          }}
        >
          View Detail
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={7}>
            <Heading>
              {props.street}, {props.city} {props.zipCode}
            </Heading>
            <Subtitle>Owner {props.owner} </Subtitle>
            <ButtonBase
              id={props._id}
              className={classes.image}
              onClick={(e) => {
                window.location.href = `asset/${e.target.id}`;
              }}
            >
              <img className={classes.img} alt={props.image} src={props.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={5} >
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Heading>
                  Price US${props.askingPrice.toLocaleString("en")}
                </Heading>
                <Heading>
                  Token Price US${props.pricePerToken.toLocaleString("en")}
                </Heading>
                <Subheading>
                  No. of Token: {props.noOfToken.toLocaleString("en")}
                </Subheading>
              </Grid>
              <Grid item xs>
                <TextWrapper>
                  <Subheading>Property Type: {props.propertyType}</Subheading>
                  <br />
                  <br />
                  <BodyText>
                    Building Size: {props.builtSize.toLocaleString("en")}
                  </BodyText>
                  <BodyText>Occupancy: {props.occupancy}%</BodyText>
                  <BodyText>NOI: US${props.noi.toLocaleString("en")}</BodyText>
                  <BodyText>Expected Yield: {props.expectedYield}%</BodyText>
                  <br />
                  <BodyText>Subscription: {props.subscription}%</BodyText>
                </TextWrapper>
              </Grid>
              <Grid item>{RenderAssetDetailButton()}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
