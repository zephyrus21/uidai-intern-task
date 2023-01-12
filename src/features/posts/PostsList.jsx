import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <div key={post.id} className='m-4 p-2 bg-slate-200 rounded-lg'>
        <h3 className='text-2xl'>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section className='m-8'>
      <h2 className='text-3xl m-4'>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
