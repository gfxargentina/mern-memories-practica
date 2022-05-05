import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import memories from "./images/memories.png";
import { getPosts } from "./actions/posts";
import Post from "./components/Posts/Post/Post";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="flex p-10 justify-center">
      <div className="flex">
        <div className="p-4  grid grid-cols-2 gap-4">
          <div>
            <Posts />
          </div>

          <div>
            <Post />
          </div>

          <div>
            <Post />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
