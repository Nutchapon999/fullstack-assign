import { Toolbar } from "./toolbar";

import { PostContent } from "@/features/post/components/post-content";

const HomePage = () => {
  return (
    <div className="max-w-[calc(798px+280px)] mt-8 mx-8 pl-0 sm:pl-[280px] overflow-hidden flex flex-col gap-6">
      <Toolbar />
      <PostContent />
    </div>
  );
}

export default HomePage;