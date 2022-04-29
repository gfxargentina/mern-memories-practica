import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import memories from "./images/memories.png";

function App() {
  return (
    <div>
      <div>
        <div>Memories</div>
        <img className="" src={memories} alt="memories" height="60" />
      </div>
      <div in>
        <divainer>
          <div>
            <div>
              <Posts />
            </div>

            <div>
              <Form />
            </div>
          </div>
        </divainer>
      </div>
    </div>
  );
}

export default App;
