import { useParams } from "next/navigation";

export const usePostId = () => {
  const params = useParams<{ id: string }>();
  
  return params.id;
}