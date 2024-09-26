import { Toolbar } from "../../../../features/post/components/toolbar";

import { PostOurContent } from "@/features/post/components/post-our-content";

const BlogByUserIdPage = () => {

  return (
    <div className="max-w-[798px] my-8 mx-8 sm:ml-[280px] overflow-hidden flex flex-col gap-6">
      <Toolbar />
      <PostOurContent />
    </div>
  );
}

export default BlogByUserIdPage;