import React, { useState } from "react";
import BeatLoader from "../../components/loading/loading";
import { Link } from "react-router";

const ChooseTemplate = ({
  templates,
  setChooseTemplate,
  templateLoading,
  setSelectedTemplate,
}) => {
  const [chosenTemplate, setChosenTemplate] = useState({});
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  const handleSelect = () => {
    setSelectedTemplate(chosenTemplate);
    setChooseTemplate(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-300 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-gray-900">
            Choose Certificate Template
          </h3>
          <button
            onClick={() => setChooseTemplate(false)}
            className="text-gray-500 hover:text-gray-700 rounded-full p-2 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Templates List */}
        {templateLoading ? (
          <BeatLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[60vh] pr-2 overflow-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
                  chosenTemplate.id === template.id ? "border-blue-600" : ""
                }`}
              >
                <div className="flex justify-between">
                  <label
                    htmlFor={`template${template.id}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id={`template${template.id}`}
                      name="templateSelection"
                      checked={chosenTemplate.id === template.id}
                      onChange={() => setChosenTemplate({id: template.id, name: template.name})}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring focus:ring-blue-300"
                    />
                    <span className="text-gray-700 font-medium">
                      {template.name}
                    </span>
                  </label>
                  <Link
                    to={`${BACKEND_URL}/storage/${template.pdf_filename}`}
                    target="_blank"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white hover:text-blue-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="mt-3 overflow-hidden rounded-lg border">
                  <object
                    className="w-full h-40"
                    data={`${BACKEND_URL}/storage/${template.pdf_filename}`}
                    type="application/pdf"
                  >
                    <p className="text-center text-sm text-gray-500">
                      Preview not available
                    </p>
                  </object>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end sticky bottom-0 bg-white pt-4">
          <Link
            to="#"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
            onClick={() => handleSelect()}
          >
            Save Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
