import React from "react";
import CheckAuth from "@/reusable/checkAuth";
import Setting from "@/components/setting";
//import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SettingPage() {
  return (
    <CheckAuth>
      <Setting />
    </CheckAuth>
  );
}
// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["profile", "common"])),
//     },
//   };
// }
