import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNewPost } from "./postsSlice";

const PostAddForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content })).unwrap();

        setTitle("");
        setContent("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section className='m-8 mx-12'>
      <h2 className='text-3xl '>Add a New Post</h2>
      <form className='flex flex-col items-start'>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          className='border border-red-400 rounded-md mb-4'
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postContent'>Content:</label>
        <textarea
          className='border border-red-400 rounded-md'
          id='postContent'
          name='postContent'
          value={content}
          onChange={onContentChanged}
        />
        <button
          className='bg-red-200 p-3 rounded-lg mt-4'
          type='button'
          onClick={onSavePostClicked}
          disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default PostAddForm;
