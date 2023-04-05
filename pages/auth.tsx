import { NextPage } from "next";
import { useRouter } from "next/router";
import { SectionWrapper } from 'components/TextFormats/TextFormats';
import SignIn from "components/SignIn/SignIn";

const Auth: NextPage = () => {
  const router = useRouter();
  return <SectionWrapper>
    <SignIn cb={() => router.push('/')} />
  </SectionWrapper>
};

export default Auth;
