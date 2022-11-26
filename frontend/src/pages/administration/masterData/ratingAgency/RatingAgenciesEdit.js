import { FormControl, InputLabel, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Details from './Details';

import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Ratingschemes from './Ratingschemes';

const steps = ['Details','Rating agencies'];
const RatingAgenciesEdit = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState('Details')
    const [details, setDetails] = useState({})

    const [activeStep, setActiveStep] = React.useState(0);

    const isStepOptional = (step) => {
        return step === 1;
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <>
            <div className='add-edit-product'>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {console.log('activeStep', activeStep)}
                            {activeStep + 1 === 1 && <Details hendelNext={handleNext} getData = {setDetails} />}
                            {activeStep + 1 === 2 && <Ratingschemes hendelNext={handleNext} hendelCancel={handleBack} detailData = {details} />}
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    )
}

export default RatingAgenciesEdit