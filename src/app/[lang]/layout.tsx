import { GoogleTagManagerBody, GoogleTagManagerHead } from '@thgh/next-gtm';
import { ReCaptchaProvider } from 'next-recaptcha-v3';
import type { Metadata } from 'next';

import BoxContentCenter from '@/components/elements/boxContentCenter';
import ThemeRegistry from '@/components/themes/ThemeRegistry';
import { CardAuth } from '@/components/elements/cardAuth';
import SnackAlert from '@/components/elements/alert';
import { getDictionary } from '@/dictionaries';
import { LanguageProvider } from './provider';
import Layout from '@/components/layout';
import { Locale } from '@/i18n-config';

import LandingChica2 from '@public/assets/landingChica.svg';

import '@public/fonts/poppins_wght.css';
import '@aws-amplify/ui-react/styles.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Cuenta Única - Registro',
  description: 'Plataforma de Registro para creación de tu Cuenta Única',
  keywords:
    'Cuenta Única, Registro, Plataforma de Autenticación, Gobierno Dominicano, República Dominicana',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
};

type Props = { children: React.ReactNode; params: { lang: Locale } };

export default async function RootLayout({
  children,
  params: { lang },
}: Props) {
  const intl = await getDictionary(lang);

  return (
    <>
      <html lang="es">
        <head>{GoogleTagManagerHead}</head>
        <body suppressHydrationWarning={true}>
          <ThemeRegistry>
            <LanguageProvider intl={intl}>
              <Layout>
                <ReCaptchaProvider useEnterprise>
                  <SnackAlert>
                    <BoxContentCenter>
                      <CardAuth
                        title="Cuenta Única Ciudadana"
                        landing={LandingChica2}
                        landingWidth={450}
                        landingHeight={400}
                      >
                        {children}
                      </CardAuth>
                    </BoxContentCenter>
                  </SnackAlert>
                  {GoogleTagManagerBody}
                </ReCaptchaProvider>
              </Layout>
            </LanguageProvider>
          </ThemeRegistry>
        </body>
      </html>
    </>
  );
}
