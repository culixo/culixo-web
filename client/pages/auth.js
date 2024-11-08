import * as React from "react";
import AuthForm from "@/components/auth/";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function AuthPage() {
  return (
    <>
      <AuthForm />
    </>
  );
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["auth", "common"])),
//     },
//   };
// }
