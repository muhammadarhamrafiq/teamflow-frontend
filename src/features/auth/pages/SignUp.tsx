import { useState } from "react";
import { useSearchParams } from "react-router";

import AvatarStep from "../components/AvatarStep";
import EmailStep from "../components/EmailStep";
import RegisterStep from "../components/RegisterStep";

type Step = "Email" | "Register" | "Avatar";

const SignUp = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [step, setStep] = useState<Step>(token ? "Register" : "Email");

  return (
    <>
      {step === "Email" && <EmailStep />}
      {step === "Register" && token && (
        <RegisterStep afterRegister={() => setStep("Avatar")} token={token} />
      )}
      {step === "Avatar" && <AvatarStep />}
    </>
  );
};

export default SignUp;
