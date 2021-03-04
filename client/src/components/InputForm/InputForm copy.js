import { useForm, Controller } from 'react-hook-form'
import { Paper, FormControl, TextField } from '@material-ui/core'
import { Button } from '../../globalStyles'
import {
    InputContainer,
    useStyles
} from './InputForm.style'

export default function InputForm(props) {

    const { control, handleSubmit } = useForm()
    const classes = useStyles();
    console.log(`in form seller ${props.seller}`)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <InputContainer>
                    <form onSubmit={ handleSubmit(props.addAuction) } >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <Controller
                                name="owner"
                                as={
                                    <TextField
                                        id="owner"
                                        label="Owner"
                                        disabled
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue={props.owner}
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <Controller
                                name="addressStreet"
                                as={
                                    <TextField
                                        id="addressStreet"
                                        label="Street"
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                        <FormControl className={classes.margin} variant="outlined">
                            <Controller
                                name="city"
                                as={
                                    <TextField
                                        id="city"
                                        label="City"
                                        variant="outlined" />
                                }
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
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                        <FormControl className={classes.margin} variant="outlined">
                            <Controller
                                name="country"
                                as={
                                    <TextField
                                        id="country"
                                        label="Country"
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                        <FormControl className={classes.margin} variant="outlined">
                            <Controller
                                name="zipcode"
                                as={
                                    <TextField
                                        id="zipcode"
                                        label="Zipcode"
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue=""
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <Controller
                                name="image"
                                as={
                                    <TextField
                                        id="image"
                                        label="Image File"
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue="images/"
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <Controller
                                name="description"
                                as={
                                    <TextField
                                        id="description"
                                        multiline
                                        rows={4}
                                        label="Description"
                                        helperText=""
                                        variant="outlined" />
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
                                        helperText="in (Eth)"
                                        variant="outlined" />
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
                                        variant="outlined" />
                                }
                                control={control}
                                defaultValue="60"
                            />
                        </FormControl>
                        <Button fontBig
                            id="submitButton"
                            type="submit">
                            Add Asset
                        </Button>
                    </form>
                </InputContainer>
            </Paper>
        </div>
    )
}
