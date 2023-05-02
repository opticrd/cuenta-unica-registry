import { useState } from "react";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import LadingChica from "../../../../public/assets/ladingChica.png";

import { CardAuth, CardAuthFooter } from "@/components/elements/cardAuth";
import { GridContainer, GridItem } from "@/components/elements/grid";
import {
  TextBodyTiny,
  TextSubTitle,
  TextSubTitleBody,
  TextTitle,
} from "@/components/elements/typography";

import { FormControlApp } from "@/components/form/input";
import { InputApp } from "@/themes/form/input";
import { ButtonApp } from "@/components/elements/button";
import { routes } from "@/constants/routes";
import BoxContentCenter from "@/components/elements/boxContentCenter";
import { labels } from "@/constants/labels";

interface IFormInputs {
  password: string;
}

const schema = yup.object({
  password: yup.string().trim().required(labels.form.requiredField),
});

export default function Index() {
  const router = useRouter();

  const [dataItem, setDataItem] = useState<any>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<IFormInputs>({
    reValidateMode: "onSubmit",
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInputs) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BoxContentCenter>
        <CardAuth
          title="Acceso Cuenta Única"
          subTitle="Para acceder a su cuenta única ciudadana, por favor ingrese su contraseña o su código de autenticación de doble factor. Recuerde que su contraseña es sensible a mayúsculas y minúsculas."
          subTitle2="correo@usuario.com"
          lading={LadingChica}
        >
          <GridContainer>
            <GridItem md={12} lg={12}>
              <FormControlApp label="Contraseña" msg={errors.password?.message}>
                <InputApp
                  defaultValue={dataItem.cedula}
                  type="password"
                  placeholder="**********"
                  {...register("password")}
                />
              </FormControlApp>
            </GridItem>

            <GridItem md={12} lg={12}>
              <TextBodyTiny colorPrimary>
                <span
                  style={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </TextBodyTiny>
            </GridItem>

            <GridItem md={12} lg={12}>
              <ButtonApp submit>INICIAR SESIÓN</ButtonApp>
            </GridItem>

            {/* <GridItem md={12} lg={12}>
                            <ButtonApp
                                color="info"
                                variant='outlined'
                                onClick={() => router.push(routes.auth.method)}
                            >
                                Cambiar Método de Inicio de Sesión
                            </ButtonApp>
                        </GridItem> */}
          </GridContainer>

          <GridContainer marginY>
            <GridItem md={12} lg={12}>
              <TextBodyTiny textCenter>
                <span className="text-secondary">¿No tienes cuenta?</span>{" "}
                Registrate aquí.
              </TextBodyTiny>
            </GridItem>
          </GridContainer>
        </CardAuth>
      </BoxContentCenter>
    </form>
  );
}
