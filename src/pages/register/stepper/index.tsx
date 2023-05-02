import Typography from "@mui/material/Typography";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import * as React from "react";

import { routes } from "@/constants/routes";
import { useRouter } from "next/router";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const steps = ["PASO 1", "PASO 2", "PASO 3"];

export default function StepperRegister() {
  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [infoCedula, setInfoCedula] = React.useState({});

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep === steps.length - 1) {
      return router.push(routes.register.registered);
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        sx={{ paddingBottom: "20px", borderBottom: "2px solid #E2E2E2" }}
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (index === 0) {
            labelProps.optional = (
              <Typography variant="caption">Identidad de usuario</Typography>
            );
          }
          if (index === 1) {
            labelProps.optional = (
              <Typography variant="caption">Verificación Identidad</Typography>
            );
          }
          if (index === 2) {
            labelProps.optional = (
              <Typography variant="caption">Completar Registro</Typography>
            );
          }

          return (
            <Step
              key={label}
              sx={{
                borderLeft: `${index === 0 ? "0px" : "1px"} solid #B7D9F8`,
              }}
            >
              <StepLabel {...labelProps}>
                <span style={{ fontWeight: "700" }}>{label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <div style={{ margin: "0px 25px" }}>
          {activeStep === 0 && (
            <Step1 setInfoCedula={setInfoCedula} handleNext={handleNext} />
          )}
          {activeStep === 1 && (
            <Step2 infoCedula={infoCedula} handleNext={handleNext} />
          )}
          {activeStep === 2 && (
            <Step3 infoCedula={infoCedula} handleNext={handleNext} />
          )}
        </div>
      )}
    </Box>
  );
}
