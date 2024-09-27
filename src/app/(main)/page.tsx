import { Toolbar } from "../../features/post/components/toolbar";

import { PostContent } from "@/features/post/components/post-content";

const HomePage = () => {
  return (
    <div className="max-w-[798px] flex flex-col h-full py-8 gap-6 mx-8 px-5">
      <Toolbar />
      <PostContent />
    </div>
  );
}

export default HomePage;