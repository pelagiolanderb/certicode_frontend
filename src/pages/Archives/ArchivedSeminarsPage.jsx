import React, { useEffect, useState } from "react";
import { fetchArchivedSeminars } from "../../api/seminarAPI";
import BeatSpinner from "../../components/loading/loading";

const ArchivedSeminarsPage = () => {
  const [archivedSeminars, setArchivedSeminars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchArchivedSeminars();
  }, []);

  const handleFetchArchivedSeminars = async () => {
    setLoading(true);
    try {
      const data = await fetchArchivedSeminars();
      setArchivedSeminars(data);
    } catch (error) {
      alert("Failed to fetch archived seminars.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <BeatSpinner />
  ) : (
    <div className="m-4">
      <h2 className="text-xl font-semibold mb-4">Archived Seminars</h2>
      <table className="w-full text-sm text-left text-gray-500">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3">Seminar Name</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {archivedSeminars.map((seminar) => (
            <tr key={seminar.id} className="border-b">
              <td className="px-6 py-4">{seminar.name_of_seminar}</td>
              <td className="px-6 py-4">{seminar.date}</td>
              <td className="px-6 py-4">{seminar.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedSeminarsPage;
