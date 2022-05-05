import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../lib/formInput";
import { NewsApiContext } from "../newsApiContext";

export function AddNewArticle() {
  const { createArticle } = useContext(NewsApiContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    createArticle({ title, author, topic, text });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new article</h1>

      <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
      <FormInput label={"Author:"} value={author} onChangeValue={setAuthor} />
      <FormInput label={"Topic:"} value={topic} onChangeValue={setTopic} />
      <FormInput label={"Text:"} value={text} onChangeValue={setText} />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
