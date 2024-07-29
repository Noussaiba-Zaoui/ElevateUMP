
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { getToken } from "../../services/tokenService";
import Swal from "sweetalert2";
import "./Pending.css"


function Pending() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    fetchPendingAccounts();
  }, []);

  const fetchPendingAccounts = async () => {
   
    try {
      const token = getToken();
      const response = await api.get("/api/v1/admin/pending-accounts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setList(response.data);
    } catch (error) {
      console.error("Error fetching pending accounts:", error);
    }
  };

  const handleApprove = async (email) => {
    setLoading(true); // Set loading to true
    try {
      await api.get(`/api/v1/admin/accept?email=${email}`);
      fetchPendingAccounts(); // Refresh the list after approving

      Swal.fire({
        icon: "success",
        title: "Utilisateur accepté",
        text: "L'utilisateur a été accepté avec succès."
      });
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleReject = async (email) => {
    setLoading(true); // Set loading to true
    try {
      await api.get(`/api/v1/admin/reject?email=${email}`);

      // Remove the rejected user from the list
      setList((prevList) => prevList.filter((user) => user.email !== email));

      Swal.fire({
        icon: "info",
        title: "Utilisateur rejeté",
        text: "L'utilisateur sera supprimé."
      });
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <>
      {/* <div className="overflow-x-auto mx-auto pt-24">
        <h1 className="text-3xl font-bold text-darkBlue-500 text-center mb-4">
          Gestion des Utilisateurs en Attente
        </h1>
        <table className="justify-center min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom complet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Académique
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.map((current) => (
              <tr key={current.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {current.firstname} {current.lastname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{current.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{current.emailAcad}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${current.status === "Accepted" ? "text-green-500" : "text-yellow-500"}`}>
                  {current.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap ml-90">
                  <button
                    onClick={() => handleApprove(current.email)}
                    disabled={current.status === "Accepted"}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded ${
                      current.status === "Accepted" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => handleReject(current.email)}
                    disabled={current.status === "Accepted"}
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                      current.status === "Accepted" ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Rejeter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
<>


<div className="overflow-x-auto mx-auto pt-15 table-container">
      <h1 className="text-3xl font-bold text-[#5E00C9] text-center mt-0 mb-4">
        Gestion des Utilisateurs en Attente
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="table-header">
          <tr>
            <th className="table-cell text-left text-xs font-medium uppercase tracking-wider">
              Nom complet
            </th>
            <th className="table-cell text-left text-xs font-medium uppercase tracking-wider">
              Email
            </th>
            <th className="table-cell text-left text-xs font-medium uppercase tracking-wider">
              Email Académique
            </th>
            <th className="table-cell text-left text-xs font-medium uppercase tracking-wider">
              Statut
            </th>
            <th className="table-cell text-left text-xs font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {list.map((current) => (
            <tr key={current.id} className="table-row">
              <td className="table-cell whitespace-nowrap">
                {current.firstname} {current.lastname}
              </td>
              <td className="table-cell whitespace-nowrap">{current.email}</td>
              <td className="table-cell whitespace-nowrap">{current.emailAcad}</td>
              <td
                className={`table-cell whitespace-nowrap ${
                  current.status === "Accepted" ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {current.status === "Accepted" ? "Accepté" : "En attente"}
              </td>
              <td className="table-cell whitespace-nowrap ml-90">
                <button
                  onClick={() => handleApprove(current.email)}
                  disabled={current.status === "Accepted"}
                  className={`button button-validate ${
                    current.status === "Accepted" ? "button-disabled cursor-not-allowed" : ""
                  }`}
                >
                  Valider
                </button>
                <button
                  onClick={() => handleReject(current.email)}
                  disabled={current.status === "Accepted"}
                  className={`button button-reject ${
                    current.status === "Accepted" ? "button-disabled cursor-not-allowed" : ""
                  }`}
                >
                  Rejeter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</>

  
    </>
  );
}

export default Pending;
