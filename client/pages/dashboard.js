import * as React from "react";
import Dashboard from "../src/components/dashboard";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Index() {
  return <Dashboard />;
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["dashboard", "common"])),
//     },
//   };
// }
