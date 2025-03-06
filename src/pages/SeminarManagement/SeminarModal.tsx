import React, { useState } from "react";

const SeminarModal = ({
  setIsModalOpen,
  handleSubmit,
  handleFetchSeminars,
  editingSeminar,
}) => {
  const [seminar, setSeminar] = useState(
    editingSeminar
      ? editingSeminar
      : {
          name_of_seminar: "",
          topics: "",
          description: "",
          date: "",
          location: "",
          speaker_name: "",
          organization_name: "",
          speaker_image: null,
          seminar_image: null,
          about_the_speaker: "",
          certificate_template_id: 1,
          price: 0,
        }
  );
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSeminar((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name_of_seminar", seminar.name_of_seminar);
      formData.append("topics", seminar.topics);
      formData.append("description", seminar.description);
      formData.append("date", seminar.date);
      formData.append("location", seminar.location);
      formData.append("speaker_name", seminar.speaker_name);
      formData.append("organization_name", seminar.organization_name);
      formData.append("about_the_speaker", seminar.about_the_speaker);
      formData.append(
        "certificate_template_id",
        seminar.certificate_template_id
      );
      if (seminar.speaker_image)
        formData.append("speaker_image", seminar.speaker_image);
      if (seminar.seminar_image)
        formData.append("seminar_image", seminar.seminar_image);
      formData.append("price", seminar.price);

      await handleSubmit(formData);

      handleFetchSeminars();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editingSeminar ? "Update Seminar" : "Create New Seminar"}
          </h3>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-3">
          <div className="flex">
            <div className="flex flex-wrap w-full flex-col">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="name_of_seminar"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  name of seminar
                </label>
                <input
                  type="text"
                  name="name_of_seminar"
                  id="name_of_seminar"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Name of Seminar"
                  value={seminar.name_of_seminar}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="topics"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Topic
                </label>
                <input
                  type="text"
                  name="topics"
                  id="topics"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Topic"
                  value={seminar.topics}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="date"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={seminar.date}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="location"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Location"
                  value={seminar.location}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="price"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Price"
                  value={seminar.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-full flex-col">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="speaker_name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Speaker Name
                </label>
                <input
                  type="text"
                  name="speaker_name"
                  id="speaker_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Speaker Name"
                  value={seminar.speaker_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="organization_name"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  organization name
                </label>
                <input
                  type="text"
                  name="organization_name"
                  id="organization_name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Organization Name"
                  value={seminar.organization_name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="description"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description..."
                  className="appearance-none block w-full min-h-18 bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  value={seminar.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  htmlFor="about_the_speaker"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  About the Speaker
                </label>
                <textarea
                  name="about_the_speaker"
                  id="about_the_speaker"
                  className="appearance-none block w-full min-h-18 bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="About the speaker..."
                  value={seminar.about_the_speaker}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap w-full flex-col">
              <div className="w-full px-3 mb-3">
                <label
                  htmlFor="speaker_image"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Speaker Image
                </label>
                <input
                  type="file"
                  name="speaker_image"
                  id="speaker_image"
                  className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  onChange={handleChange}
                />
                {editingSeminar && (
                  <a
                    href={`${BASE_URL}${editingSeminar.speaker_image}`}
                    target="_blank"
                    className="font-medium text-xs text-green-600 hover:underline"
                  >
                    Previous Speaker Image
                  </a>
                )}
              </div>
              <div className="w-full px-3 mb-3">
                <label
                  htmlFor="seminar_image"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  seminar image
                </label>
                <input
                  type="file"
                  name="seminar_image"
                  id="seminar_image"
                  className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  onChange={handleChange}
                />
                {editingSeminar && (
                  <a
                    href={`${BASE_URL}${editingSeminar.seminar_image}`}
                    target="_blank"
                    className="font-medium text-xs text-green-600 hover:underline"
                  >
                    Previous Seminar Image
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-3 md:mb-0 text-center">
            <button
              type="submit"
              className="btn bg-blue-900 text-white rounded px-6 py-1 cursor-pointer uppercase font-bold"
              disabled={loading}
            >
              {editingSeminar
                ? loading
                  ? "Updating..."
                  : "Update"
                : loading
                ? "Adding..."
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeminarModal;
