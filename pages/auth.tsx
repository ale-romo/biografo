import { NextPage } from "next";
import { useRouter } from "next/router";
import { SectionWrapper } from 'components/TextFormats/TextFormats';
import SignIn from "components/SignIn/SignIn";

const Auth: NextPage = () => {
  const router = useRouter();
  return <SectionWrapper style={{ width: "100vw", maxWidth: "1200px", position: "relative", left: "50%", transform: "translateX(-50%)", paddingTop: "100px" }}>
    <SignIn cb={() => router.push('/')} />
  </SectionWrapper>
};

export default Auth;
