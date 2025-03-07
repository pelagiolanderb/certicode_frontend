import React, { use, useEffect, useState } from "react";
import { fetchCertificateTemplates } from "../../api/certificate_templateAPI";
import BeatLoader from "../../components/loading/loading";
import Button from "../../components/ui/button/Button";
import ChooseTemplate from "./ChooseTemplate";
import { Link } from "react-router";

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
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [chooseTemplate, setChooseTemplate] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setTemplateLoading(true);
    try {
      const response = await fetchCertificateTemplates();
      console.log(response);
      setTemplates(response);
    } catch (error) {
      console.log(error.message);
    } finally {
      setTemplateLoading(false);
    }
  };

  console.log(templateId);

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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl relative">
        <div className="flex items-center justify-between pb-1 border-b rounded-t dark:border-gray-600 border-gray-200">
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

        <form
          onSubmit={onSubmit}
          className="space-y-4 mt-4 max-h-[70vh] overflow-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Name of Seminar"
                value={seminar.name_of_seminar}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Topic"
                value={seminar.topics}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                value={seminar.date}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Location"
                value={seminar.location}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Price"
                value={seminar.price}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Speaker Name"
                value={seminar.speaker_name}
                onChange={handleChange}
              />
            </div>
            <div>
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                placeholder="Organization Name"
                value={seminar.organization_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
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
              className="appearance-none block w-full min-h-18 bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              value={seminar.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="about_the_speaker"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              About the Speaker
            </label>
            <textarea
              name="about_the_speaker"
              id="about_the_speaker"
              className="appearance-none block w-full min-h-18 bg-gray-200 text-gray-700 border border-teal-500 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              placeholder="About the speaker..."
              value={seminar.about_the_speaker}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex flex-wrap w-full">
            <div>
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
                  href={`${BACKEND_URL}/storage/${editingSeminar.speaker_image}`}
                  target="_blank"
                  className="font-medium text-xs text-green-600 hover:underline"
                >
                  Previous Speaker Image
                </a>
              )}
            </div>
            <div>
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
                  href={`${BACKEND_URL}/storage/${editingSeminar.seminar_image}`}
                  target="_blank"
                  className="font-medium text-xs text-green-600 hover:underline"
                >
                  Previous Seminar Image
                </a>
              )}
            </div>
            <div>
              <Link to="#" onClick={() => setChooseTemplate(true)}>
                Choose Template
              </Link>
            </div>
            {chooseTemplate && (
              <ChooseTemplate
                setChooseTemplate={setChooseTemplate}
                templates={templates}
                templateLoading={templateLoading}
                setTemplateId={setTemplateId}
              />
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Processing..." : editingSeminar ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeminarModal;
