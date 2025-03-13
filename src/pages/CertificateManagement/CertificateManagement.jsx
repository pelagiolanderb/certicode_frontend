import { useEffect, useRef, useState } from "react";
import BeatLoader from "../../components/loading/loading";
import useApiService from "../../api/useApiService.js";

const CertificateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [isUpload, setIsUpload] = useState(false);
  const [isArchive, setIsArchive] = useState(false);
  const [loadingState, setLoadingState] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [fetchingLoading, setFetchingLoading] = useState(false);

  const { loading, error, get, post, put } = useApiService();

  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    // setFetchingLoading(true);
    try {
      const data = await get("/templates");
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
    // finally {
    //   setFetchingLoading(false);
    // }
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) return alert("Please provide a name and select a PDF file.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf_file", file);

    try {
      setIsUpload(true);
      if (editingId) {
        await put(`/templates/${editingId}`, formData);
        setEditingId(null);
      } else {
        await post("/templates", formData);
      }
      resetForm();
      fetchTemplates();
    } catch (error) {
      alert("Error processing the template.");
      console.error("Error:", error);
    } finally {
      setIsUpload(false);
    }
  };

  const handleArchive = async (id) => {
    try {
      setIsArchive(true);
      setLoadingState((prev) => ({...prev, [id]: true}));
      await post(`/template_archive/${id}`);
      fetchTemplates();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingState((prev) => ({...prev, [id]: false}));
      setIsArchive(false);
    }
  }

  const resetForm = () => {
    setName("");
    setFile(null);
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (error) return <p>{error}</p>;

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
            ref={fileInputRef}
            accept="application/pdf"
            className="block w-full border border-gray-300 rounded-lg p-1 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-lg font-medium transition-all duration-300"
            style={{ backgroundColor: isUpload ? "#a0aec0" : "#2563eb" }}
            disabled={isUpload}
          >
            {isUpload
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
            {loading && !isUpload && !isArchive ? (
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
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-gray-700"
                      onClick={() => handleArchive(template.id)}
                    >
                      {
                        loadingState[template.id] ? 'Archiving...' : 'Archive'
                      }
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
