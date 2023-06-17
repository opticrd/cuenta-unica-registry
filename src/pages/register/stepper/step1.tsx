import { yupResolver } from '@hookform/resolvers/yup';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import * as yup from 'yup';

import { GridContainer, GridItem } from '@/components/elements/grid';
import { CitizensBasicInformationResponse } from '@/pages/api/types';
import LoadingBackdrop from '@/components/elements/loadingBackdrop';
import { TextBody } from '@/components/elements/typography';
import { AlertWarning } from '@/components/elements/alert';
import { ButtonApp } from '@/components/elements/button';
import { FormControlApp } from '@/components/form/input';
import { InputApp } from '@/themes/form/input';
import { labels } from '@/constants/labels';

interface IFormInputs {
  cedula: string;
}

const schema = yup.object({
  cedula: yup
    .string()
    .trim()
    .required(labels.form.requiredField)
    .min(11, 'Debe contener 11 dígitos'),
});

export default function Step1({ setInfoCedula, handleNext }: any) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const cedulaValue = e.target.value
      .replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,7})(\d{0,1})/);
    e.target.value = !cedulaValue[2]
      ? cedulaValue[1]
      : `${cedulaValue[1]}-${cedulaValue[2]}${`${
          cedulaValue[3] ? `-${cedulaValue[3]}` : ''
        }`}${`${cedulaValue[4] ? `-${cedulaValue[4]}` : ''}`}`;
    const numbers = e.target.value.replace(/(\D)/g, '');
    setValue('cedula', numbers);
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInputs>({
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (data: IFormInputs) => {
      if (!executeRecaptcha) {
        AlertWarning(
          'Problemas con el reCaptcha, intente nuevamente más tarde'
        );
        return;
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken: any) => {
        // console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken, data);
      });
    },
    [executeRecaptcha]
  );

  const submitEnquiryForm = (gReCaptchaToken: any, data: IFormInputs) => {
    setLoading(true);

    const fetcher = async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error(data.message);
      }
      return data;
    };

    fetcher(`/api/citizens/${data.cedula}`)
      .then((citizen: CitizensBasicInformationResponse) => {
        setInfoCedula(citizen);
        handleNext();
      })
      .catch(() => {
        AlertWarning('Parece que ha introducido una cédula inválida.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <LoadingBackdrop />}
      <br />
      <TextBody textCenter>
        Este es el primer paso para poder verificar tu identidad y crear tu
        cuenta ciudadana.
      </TextBody>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer marginY>
          <GridItem md={12} lg={12}>
            <FormControlApp
              label="Número de Cédula"
              msg={errors.cedula?.message}
              tooltip="Identidad de Usuario"
              tooltipText="Para iniciar el proceso de validar tu identidad es necesario tu número de cédula."
              required
            >
              <InputApp
                placeholder="*** - **00000 - 0"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                autoComplete="off"
                onChange={(e) => handleChange(e)}
              />
            </FormControlApp>
          </GridItem>

          <GridItem md={12} lg={12}>
            <ButtonApp submit>CONFIRMAR</ButtonApp>
          </GridItem>
        </GridContainer>
      </form>
    </>
  );
}
