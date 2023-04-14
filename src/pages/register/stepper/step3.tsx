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
import { authApi } from '@/services/app/auth';
import LoadingBackdrop from '@/components/elements/loadingBackdrop';
import { AlertError, AlertWarning } from '@/components/elements/alert';

interface IFormInputs {
    email: string
    emailConfirm: string
    password: string
    passwordConfirm: string
}

const schema = yup.object({
    email: yup.string().trim().email(labels.form.invalidEmail).required(labels.form.requiredField),
    emailConfirm: yup.string().trim().required(labels.form.requiredField).oneOf([yup.ref('email')], 'Los correos no coinciden'),
    password: yup.string().min(8, "Debe contener al menos 8 caracteres").required(labels.form.requiredField).trim().matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "La contraseña debe contener una mayúscula, un número y un carácter especial"
    ),
    passwordConfirm: yup.string().required(labels.form.requiredField).oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
})

export default function Step3({ handleNext, infoCedula }: any) {

    const [dataItem, setDataItem] = useState<any>({})

    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<IFormInputs>({
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IFormInputs) => {
        setLoading(true)

        const obj = {
            email: data.email,
            username: data.email,
            firstName: infoCedula?.payload?.names,
            lastName: `${infoCedula?.payload?.firstSurname} ${infoCedula?.payload?.secondSurname}`,
            password: data.password,
        }

        authApi.post(obj)
            .then(() => {
                handleNext()
            })
            .catch((err) => {
                console.log(err)
                if(err?.response?.status === 409){
                    AlertWarning("El correo electrónico que proporcionaste ya está registrado.")
                }else {
                    AlertError()
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            {loading && <LoadingBackdrop />}
            <br />
            <TextBody textCenter bold>
                Por favor completa los siguientes campos para finalizar tu registro.
            </TextBody>

            <form onSubmit={handleSubmit(onSubmit)}>
                <GridContainer marginY>
                    <GridItem md={12} lg={12}>
                        <FormControlApp
                            label="Correo Electrónico"
                            msg={errors.email?.message}
                            tooltip="Completar Registro"
                            tooltipText="Para completar tu cuenta única ciudadana es necesario proporcionar tu correo electrónico, asegúrate de estar correctamente escrito y de tu uso cotidiano."
                            required
                        >
                            <InputApp
                                defaultValue={dataItem.email}
                                placeholder="Coloca tu correo electrónico"
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                autoComplete="off"
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
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                autoComplete="off"
                                {...register("emailConfirm")}
                            />
                        </FormControlApp>
                    </GridItem>

                    <GridItem md={12} lg={12}>
                        <FormControlApp
                            label="Contraseña"
                            msg={errors.password?.message}
                            tooltip="Su contraseña debe contener:"
                            tooltipText={<>
                                <b>
                                    Al menos 8 caracteres de largo<br />Al menos 3 de los siguientes:
                                </b>
                                <li>Letras minúsculas (a-z)</li>
                                <li>Letras mayúsculas (A-Z)</li>
                                <li>Números (0-9)</li>
                                <li>Caracteres especiales (por ejemplo, !@#$%^&*)</li>
                            </>}
                            required
                        >
                            <InputApp
                                defaultValue={dataItem.password}
                                placeholder="*********"
                                type="password"
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                autoComplete="off"
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
                                onPaste={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                onCopy={(e) => {
                                    e.preventDefault()
                                    return false;
                                }}
                                autoComplete="off"
                                {...register("passwordConfirm")}
                            />
                        </FormControlApp>
                    </GridItem>

                    <GridItem md={12} lg={12}>
                        <ButtonApp
                            submit
                        >
                            ACEPTAR Y CONFIRMAR
                        </ButtonApp>
                    </GridItem>
                </GridContainer>
            </form>
        </>
    )
}