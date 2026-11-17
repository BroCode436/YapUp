import { useState } from "react";

function Create() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    alert("Uploads are unavailable in this preview. The backend has not been deployed yet.");
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <br /><br />

      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Create;
