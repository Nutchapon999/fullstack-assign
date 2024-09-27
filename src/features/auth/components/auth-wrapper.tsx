import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthWrapper = ({
  children,
  title,
  description
}: AuthWrapperProps) => {
  return (
    <Card className="w-auto md:w-[420px] bg-transparent border-none shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-extrabold tracking-normal text-white">{ title }</CardTitle>
        <CardDescription className="text-sm text-white">
          { description }
        </CardDescription>
      </CardHeader>
      <CardContent>
        { children }
      </CardContent>
    </Card>
  );
}