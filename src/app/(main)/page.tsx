import { Toolbar } from "../../features/post/components/toolbar";

import { PostContent } from "@/features/post/components/post-content";

const HomePage = () => {
  return (
    <div className="max-w-[798px] my-8 mx-8 sm:ml-[280px] overflow-hidden flex flex-col gap-6">
      <Toolbar />
      <PostContent />
    </div>
  );
}

export default HomePage;