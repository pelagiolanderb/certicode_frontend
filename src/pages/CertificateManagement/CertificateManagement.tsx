import { useEffect, useState } from "react";
import {
  fetchCertificateTemplates,
  uploadCertificateTemplate,
  updateCertificateTemplate,
  deleteCertificateTemplate,
} from "../../api/certificate_templateAPI";
import { archiveCertificateTemplate } from "../../api/archiveApi.js";
import BeatLoader from "../../components/loading/loading";

const CertificateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingLoading, setFetchingLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setFetchingLoading(true);
    try {
      const data = await fetchCertificateTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setFetchingLoading(false);
    }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file)
      return alert("Please provide a name and select a PDF file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf_file", file);

    try {
      if (editingId) {
        await updateCertificateTemplate(editingId, formData);
        setEditingId(null);
      } else {
        await uploadCertificateTemplate(formData);
      }
      resetForm();
      fetchTemplates();
    } catch (error) {
      alert("Error processing the template.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setFile(null);
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Certificate Management
      </h2>

      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-50 p-6 rounded-lg shadow"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter template name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF Template
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="block w-full border border-gray-300 rounded-lg p-1 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-lg font-medium transition-all duration-300"
            style={{ backgroundColor: loading ? "#a0aec0" : "#2563eb" }}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : editingId
              ? "Update Template"
              : "Upload Template"}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-sm text-gray-600 border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Template Name</th>
              <th className="px-6 py-3 text-left">PDF</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchingLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  <BeatLoader />
                </td>
              </tr>
            ) : templates.length > 0 ? (
              templates.map((template) => (
                <tr
                  key={template.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{template.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`${BACKEND_URL}/certificates/${template.pdf_filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      onClick={() => setEditingId(template.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => deleteCertificateTemplate(template.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                      onClick={() => archiveCertificateTemplate(template.id)}
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No templates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateManagement;
