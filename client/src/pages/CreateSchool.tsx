import React, { useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const CreateListingForm: React.FC = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true); // Start the loading state
      const response = await AxiosInstance.post("/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Listing created successfully:", response.data);
      setLoading(false); // End the loading state
      navigate("/");
    } catch (error) {
      console.error("Error creating listing:", error);
      setLoading(false); // End the loading state
    }
  };

  return (
    <div className="h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="p-5 mt-5 w-2/3 m-auto shadow-md "
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create a listing
        </h2>

        <div className="flex flex-col gap-3">
          <label>Name</label>
          <input
            type="text"
            placeholder="School Name"
            value={name}
            onChange={handleNameChange}
            className="input input-bordered w-full  bg-white"
          />
        </div>

        <div className="flex flex-col gap-3 my-4">
          <label className="w-1/4 text-left">About</label>
          <input
            type="text"
            className="textarea textarea-bordered bg-white"
            value={about}
            onChange={handleAboutChange}
            placeholder="School description."
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="w-1/4 text-left">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered file-input-success  w-full bg-white text-white"
          />
        </div>

        <button
          type="submit"
          className="btn btn-active btn-primary text-white mt-5"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateListingForm;
