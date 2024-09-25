import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { AuthWrapper } from "@/features/auth/components/auth-wrapper";

const SignUpPage = () => {
  return (
    <AuthWrapper 
      title="Create an account"
      description="Use your username to continue"
    >
      <SignUpForm />
    </AuthWrapper>
  );
}

export default SignUpPage;