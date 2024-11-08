import * as React from "react";
import Home from "../src/components/home";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  return <Home />;
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["home", "common"])),
//     },
//   };
// }
