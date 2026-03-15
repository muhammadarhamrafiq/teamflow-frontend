import { useState } from "react";
import { useSearchParams } from "react-router";
import AvatarStep from "./components/AvatarStep";
import EmailStep from "./components/EmailStep";
import Layout from "./components/Layout";
import RegisterStep from "./components/RegisterStep";

type Step = "Email" | "Register" | "Avatar";

const SignUp = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [step, setStep] = useState<Step>(token ? "Register" : "Email");

  return (
    <Layout className="py-10 md:py-12 lg:py-14 flex flex-col items-center">
      {step === "Email" && <EmailStep />}
      {step === "Register" && (
        <RegisterStep afterRegister={() => setStep("Avatar")} />
      )}
      {step === "Avatar" && <AvatarStep />}
    </Layout>
  );
};

export default SignUp;
