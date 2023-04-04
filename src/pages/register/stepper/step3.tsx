import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { GridContainer, GridItem } from "@/components/elements/grid";
import { TextBody } from "@/components/elements/typography";
import { FormControlApp } from "@/components/form/input";
import { InputApp } from "@/themes/form/input";
import { labels } from '@/constants/labels';
import { ButtonApp } from '@/components/elements/button';

interface IFormInputs {
    email: string
    emailConfirm: string
    password: string
    passwordConfirm: string
}

const schema = yup.object({
    email: yup.string().trim().required(labels.form.requiredField),
    emailConfirm: yup.string().trim().required(labels.form.requiredField),
    password: yup.string().trim().required(labels.form.requiredField),
    passwordConfirm: yup.string().trim().required(labels.form.requiredField),
})

export default function Step3({handleNext} : any) {

    const [dataItem, setDataItem] = useState<any>({})

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<IFormInputs>({
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(schema)
    });

    const handleNextForm = () => {
        handleNext()
    }

    return (
        <>
            <br />
            <TextBody textCenter bold>
                Por favor completa los siguientes campos para finalizar tu registro.
            </TextBody>
            
            <GridContainer marginY>
                <GridItem md={12} lg={12}>
                    <FormControlApp
                        label="Correo Electrónico"
                        msg={errors.email?.message}
                        required
                    >
                        <InputApp
                            defaultValue={dataItem.email}
                            placeholder="Coloca tu correo electrónico"
                            {...register("email")}
                        />
                    </FormControlApp>
                </GridItem>
                
                <GridItem md={12} lg={12}>
                    <FormControlApp
                        label="Confirmación Correo Electrónico"
                        msg={errors.emailConfirm?.message}
                        required
                    >
                        <InputApp
                            defaultValue={dataItem.emailConfirm}
                            placeholder="Coloca tu correo electrónico"
                            {...register("emailConfirm")}
                        />
                    </FormControlApp>
                </GridItem>

                <GridItem md={12} lg={12}>
                    <FormControlApp
                        label="Contraseña"
                        msg={errors.password?.message}
                        required
                    >
                        <InputApp
                            defaultValue={dataItem.password}
                            placeholder="*********"
                            type="password"
                            {...register("password")}
                        />
                    </FormControlApp>
                </GridItem>
                
                <GridItem md={12} lg={12}>
                    <FormControlApp
                        label="Confirmar Contraseña"
                        msg={errors.passwordConfirm?.message}
                        required
                    >
                        <InputApp
                            defaultValue={dataItem.passwordConfirm}
                            placeholder="*********"
                            type="password"
                            {...register("passwordConfirm")}
                        />
                    </FormControlApp>
                </GridItem>

                <GridItem md={12} lg={12}>
                    <ButtonApp
                        onClick={handleNextForm}
                    >
                        ACEPTAR Y CONFIRMAR
                    </ButtonApp>
                </GridItem>
            </GridContainer>
        </>
    )
}