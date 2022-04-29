import React from "react";

const Form = () => {
  return (
    <div className="p-10 card w-96 bg-base-100 shadow-xl">
      <div>
        <label htmlFor="">Titulo</label>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered input-primary w-full max-w-xs"
        />
      </div>

      <div className="mt-5 flex flex-col">
        <label htmlFor="">Mensaje</label>
        <textarea
          className="textarea textarea-primary"
          placeholder="Bio"
        ></textarea>
      </div>
    </div>
  );
};

export default Form;
