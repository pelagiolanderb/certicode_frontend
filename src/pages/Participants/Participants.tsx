import { useEffect, useState } from "react";
import { fetchParticipants, sendCertificate } from "../../api/participantAPI";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSeminar, setSelectedSeminar] = useState("");

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const data = await fetchParticipants();
        setParticipants(data);
      } catch (err) {
        setError("Failed to load participants.");
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, []);

  const sortedParticipants = [...participants].sort((a, b) => {
    const titleA = a.seminar?.name_of_seminar.toLowerCase() || "";
    const titleB = b.seminar?.name_of_seminar.toLowerCase() || "";
    return sortOrder === "asc"
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSendCertificate = async (participantId) => {
    try {
      console.log("Requesting certificate for participantId:", participantId);
      await sendCertificate(participantId);
      alert("Certificate sent successfully!");
    } catch (error) {
      alert("Failed to send certificate.");
    }
  };

  const handleSendAll = async () => {
    const seminarParticipants = participants.filter(
      (p) => p.seminar?.name_of_seminar === selectedSeminar
    );

    if (seminarParticipants.length === 0) {
      alert("No participants found for this seminar.");
      return;
    }

    try {
      for (const participant of seminarParticipants) {
        await sendCertificate(participant.id);
      }
      alert(`Certificates sent to all participants of "${selectedSeminar}"`);
    } catch (error) {
      alert("Failed to send certificates.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">Loading participants...</p>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="relative shadow-md sm:rounded-lg m-4 p-4">
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <div className="flex items-center justify-between w-full m-4">
          <select
            className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
            value={selectedSeminar}
            onChange={(e) => setSelectedSeminar(e.target.value)}
          >
            <option value="">-- Select Seminar --</option>
            {[
              ...new Set(participants.map((p) => p.seminar?.name_of_seminar)),
            ].map((seminar) => (
              <option key={seminar} value={seminar}>
                {seminar}
              </option>
            ))}
          </select>

          <button
            onClick={handleSendAll}
            className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
          >
            Send Certificates to All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 uppercase">
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase cursor-pointer hover:bg-gray-200 transition"
                onClick={toggleSortOrder}
              >
                Seminar Title {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                Speaker
              </th>
              <th scope="col" className="px-6 py-3 uppercase text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedParticipants.map((participant, index) => (
              <tr
                key={participant.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  {participant.user?.name || participant.guest?.guest_name}
                </td>
                <td className="px-6 py-4">
                  {participant.seminar?.name_of_seminar}
                </td>
                <td className="px-6 py-4">
                  {participant.seminar?.speaker_name}
                </td>
                <td className="py-4 flex justify-center">
                  <button
                    onClick={() => handleSendCertificate(participant.id)}
                    className="text-white bg-blue-900 border border-blue-700 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-3 py-1.5"
                  >
                    📩 Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Participants;
