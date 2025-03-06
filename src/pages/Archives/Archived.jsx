import React, { useEffect, useState } from "react";
import {
  fetchArchivedSeminars,
  restoreSeminar,
  deleteArchivedSeminar,
  fetchArchivedCertificateTemplates,
  restoreCertificateTemplate,
  deleteArchivedCertificateTemplate,
} from "../../api/archiveApi";
import BeatSpinner from "../../components/loading/loading";

const Archived = () => {
  const [archivedSeminars, setArchivedSeminars] = useState([]);
  const [archivedTemplates, setArchivedTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("seminars");

  useEffect(() => {
    loadArchivedData();
  }, []);

  const loadArchivedData = async () => {
    try {
      setLoading(true);
      const seminars = await fetchArchivedSeminars();
      const templates = await fetchArchivedCertificateTemplates();
      setArchivedSeminars(seminars);
      setArchivedTemplates(templates);
    } catch (error) {
      console.error("Error loading archived data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id, type) => {
    const confirmMsg =
      type === "seminar"
        ? "Are you sure you want to restore this seminar?"
        : "Are you sure you want to restore this certificate template?";
    if (window.confirm(confirmMsg)) {
      try {
        type === "seminar" ? await restoreSeminar(id) : await restoreCertificateTemplate(id);
        loadArchivedData();
      } catch (error) {
        console.error(`Error restoring ${type}:`, error);
      }
    }
  };

  const handleDelete = async (id, type) => {
    const confirmMsg =
      type === "seminar"
        ? "Are you sure you want to permanently delete this seminar?"
        : "Are you sure you want to permanently delete this certificate template?";
    if (window.confirm(confirmMsg)) {
      try {
        type === "seminar" ? await deleteArchivedSeminar(id) : await deleteArchivedCertificateTemplate(id);
        loadArchivedData();
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
      }
    }
  };

  const filteredSeminars = archivedSeminars.filter((seminar) =>
    seminar.name_of_seminar.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = archivedTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return loading ? (
    <BeatSpinner />
  ) : (
    <div className="relative shadow-md sm:rounded-lg m-4">
      <div className="flex justify-between items-center m-4">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "seminars" ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("seminars")}
          >
            Archived Seminars
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "templates" ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("templates")}
          >
            Archived Certificate Templates
          </button>
        </div>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto p-2">
        {activeTab === "seminars" ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name of Seminar</th>
                <th className="px-6 py-3">Topics</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Speaker</th>
                <th className="px-6 py-3">Organization</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSeminars.length > 0 ? (
                filteredSeminars.map((seminar) => (
                  <tr key={seminar.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{seminar.name_of_seminar}</td>
                    <td className="px-6 py-4">{seminar.topics || "N/A"}</td>
                    <td className="px-6 py-4">{seminar.date || "N/A"}</td>
                    <td className="px-6 py-4">{seminar.location || "N/A"}</td>
                    <td className="px-6 py-4">{seminar.speaker_name || "N/A"}</td>
                    <td className="px-6 py-4">{seminar.organization_name || "N/A"}</td>
                    <td className="py-4 flex flex-col">
                      <button
                        onClick={() => handleRestore(seminar.id, "seminar")}
                        className="text-green-600 hover:underline"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handleDelete(seminar.id, "seminar")}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No archived seminars found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Template Name</th>
                <th className="px-6 py-3">Certificate</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredTemplates.length > 0 ? (
    filteredTemplates.map((template) => (
      <tr key={template.id} className="bg-white border-b hover:bg-gray-50">
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
        <td className="py-4 flex flex-col">
          <button
            onClick={() => handleRestore(template.id, "template")}
            className="text-green-600 hover:underline"
          >
            Restore
          </button>
          <button
            onClick={() => handleDelete(template.id, "template")}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-4">
        No archived certificate templates found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default Archived;
