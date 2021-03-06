import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts";

//TODO: usar react hook form

const Form = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div>
        <h2> Please Sign In to create memories and like others memories</h2>
      </div>
    );
  }

  return (
    <div className="p-10 card w-96 bg-base-100 shadow-xl">
      <h1>{currentId ? "Editar Memoria" : "Crear una Memoria"}</h1>
      <form action="">
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            value={postData.title}
            //con el spreat operator toda la data persiste y solo cambia el campo creator
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            placeholder="your title"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="mt-5 flex flex-col">
          <label htmlFor="">Message</label>
          <textarea
            name="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            className="textarea textarea-primary"
            placeholder="message"
          ></textarea>
        </div>

        <div className="mt-5">
          <label htmlFor="">Tags</label>
          <input
            type="text"
            name="tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            placeholder="tags"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="mt-5">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <button
          type="submit"
          className="mt-5 btn btn-outline btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
