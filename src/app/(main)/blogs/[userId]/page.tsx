import { Toolbar } from "../../../../features/post/components/toolbar";

import { PostOurContent } from "@/features/post/components/post-our-content";

const BlogByUserIdPage = () => {

  return (
    <div className="max-w-[798px] overflow-y-hidden flex flex-col h-full py-8 gap-6 mx-8 px-5">
      <Toolbar />
      <PostOurContent />
    </div>
  );
}

export default BlogByUserIdPage;