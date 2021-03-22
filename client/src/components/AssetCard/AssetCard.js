import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Paper, ButtonBase } from "@material-ui/core";
import { Button } from "../../globalStyles";

//import 'fontsource-roboto'
import {
  useStyles,
  Heading,
  Subheading,
  BodyText,
  TextWrapper,
} from "./AssetCard.style";

export default function AssetCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const getAsset = (e) => {
    e.preventDefault()
//    console.log(`assetcard ${JSON.stringify(props)}`)
    history.push({
      pathname: props.admin && props.status === 0 ? "/editasset" : "/asset",
      search: `?id=${e.target.id}`,
      state: {
        admin: props.admin,
        id: props.id,
        tokenId: props.tokenId,
        image: props.image,
        transactionHash: props.transactionHash,
        invProspectHash: props.invProspectHash,
        valuationHash: props.valuationHash,
        subscription: props.subscription,
        status: props.status,
        owner: props.owner,
        askingPrice: props.askingPrice,
        noOfToken: props.noOfToken,
        pricePerToken: props.pricePerToken,
        ownerSubscription: props.ownerSubscription,
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
      },
    });
  };

  const RenderPublishButton = () => {

    //only render in admin page
    if (props.admin) {
      if (props.status !== 0) {
        return (
          <Button
            Big
            fontBig
            live
            id={props.id}
            disabled={true}
          > Listed
          </Button>
        );
      } else {
        return (
          <Button
            Big
            fontBig
            live
            id={props.id}
            disabled={false}
            onClick={(e) => {
              props.publishAsset(e);
            }}
          > List
          </Button>
        );
      }
    }
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
            getAsset(e);
          }}
        >
          { props.admin ? `View Detail` : `Ready for Investment` }
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
            getAsset(e);
          }}
        >
          FULLY SUBSCRIBE
        </Button>
      );
    } else if (props.status === 0 && props.admin) {
      return (
        <Button
          Big
          fontBig
          id={props.id}
          disabled={false}
          onClick={(e) => {
            getAsset(e);
          }}
        >
          Edit
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
            getAsset(e);
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
            <BodyText>Owner {props.owner} </BodyText>
            <ButtonBase
              id={props.id}
              className={classes.image}
              onClick={(e) => {
                getAsset(e);
              }}
            >
              <img
                className={classes.img}
                alt={props.image}
                src={props.image}
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={5}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Heading>
                  Price US${props.askingPrice.toLocaleString("en")}
                </Heading>
                <Heading>
                  Token Price US${props.pricePerToken.toLocaleString("en")}
                </Heading>
                <Heading>
                  No. of Token: {props.noOfToken.toLocaleString("en")}
                </Heading>
              </Grid>
              <Grid item xs>
                <TextWrapper>
                  <Subheading>Property Type: {props.propertyType}</Subheading>
                  <BodyText>
                    Building Size: {props.builtSize.toLocaleString("en")}
                  </BodyText>
                  <BodyText>Occupancy: {props.occupancy}%</BodyText>
                  <BodyText>NOI: US${props.noi.toLocaleString("en")}</BodyText>
                  <BodyText>Expected Yield: {props.expectedYield}%</BodyText>
                  <BodyText>Subscription: {props.subscription}%</BodyText>
                </TextWrapper>
              </Grid>
              <Grid item xs>
                {RenderAssetDetailButton()}
                {RenderPublishButton()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
