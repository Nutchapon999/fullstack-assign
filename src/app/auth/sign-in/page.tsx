import { SignInForm } from "@/features/auth/components/sign-in-form";
import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

const SignInPage = () => {
  return (
    <AuthWrapper 
      title="Login to continue"
      description="Use your username to continue"
    >
      <SignInForm />
    </AuthWrapper>
  );
}

export default SignInPage;