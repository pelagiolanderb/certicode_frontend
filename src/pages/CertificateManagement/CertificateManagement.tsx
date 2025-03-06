import { useEffect, useState } from "react";
import {
  fetchCertificateTemplates,
  uploadCertificateTemplate,
  updateCertificateTemplate,
  deleteCertificateTemplate,
} from "../../api/certificate_templateAPI";
import {
  archiveCertificateTemplate,
} from "../../api/archiveApi.js";

import BeatLoader from "../../components/loading/loading";

const CertificateManagement = () => {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingLoading, setFetchingLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleArchive = async (id) => {
    if (!window.confirm("Are you sure you want to archive this template?")) return;
  
    setLoading(true);
    try {
      await archiveCertificateTemplate(id);
      alert("Template archived successfully!");
      fetchTemplates();
    } catch (error) {
      alert("Failed to archive template.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  
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
        alert("Template updated successfully!");
        setEditingId(null);
      } else {
        await uploadCertificateTemplate(formData);
        alert("Template uploaded successfully!");
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?"))
      return;

    setLoading(true);
    try {
      await deleteCertificateTemplate(id);
      alert("Template deleted successfully!");
      fetchTemplates();
    } catch (error) {
      alert("Failed to delete template.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template) => {
    setEditingId(template.id);
    setName(template.name);
  };

  const resetForm = () => {
    setName("");
    setFile(null);
    setEditingId(null);
  };

  return (
    <div className="relative shadow-md sm:rounded-lg m-4 p-4 bg-white">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <button
          onClick={() => setEditingId(null)}
          className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
        >
          + Upload Template
        </button>
      </div>

      {/* Upload / Edit Form */}
      <div className="p-4 bg-gray-50 rounded-lg mt-4">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">
              Template Name:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Upload PDF:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white transition ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              }`}
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
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Templates */}
      <div className="overflow-x-auto p-2 mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Template Name</th>
              <th className="px-6 py-3">PDF</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchingLoading ? (
              <tr>
                <td colSpan="3" className="pt-2">
                  <BeatLoader />
                </td>
              </tr>
            ) : templates.length > 0 ? (
              templates.map((template) => (
                <tr
                  key={template.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{template.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`http://localhost:8000/certificates/${template.pdf_filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    > 
                      View PDF
                    </a>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(template)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(template.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleArchive(template.id)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Archive
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
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
