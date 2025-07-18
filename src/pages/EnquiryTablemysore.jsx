import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./EnquiryTable.css"; // Kept for potential future use, but using inline CSS now

Modal.setAppElement("#root");

export default function EnquiryTablemysore() {
  const [data, setData] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-IN", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.nakshatranamahacreations.in/api/enquiries");
        if (response.status === 200) {
          const mysoreData = response.data.filter((item) => item.city === "Mysore");
          setData(mysoreData);
        } else {
          console.error("Failed to fetch enquiries:", response.status);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };
    fetchData();
  }, []);

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalIsOpen(false);
  };

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.phoneNo && row.phoneNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (row.service && row.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="enquiry-container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        className="enquiry-heading"
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Enquiries (Mysore)
      </h2>
      <div
        className="search-wrapper"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by Name, Phone, or Service"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            flexGrow: "1",
            minWidth: "200px",
            fontSize: "14px",
          }}
        />
        <button
          className="search-button"
          onClick={() => setSearchTerm(searchTerm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Search
        </button>
      </div>

      <div
        className="table-wrapper"
        style={{
          overflowX: "auto",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Sl No.
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Phone
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Service
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                Message Time
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "center",
                  borderBottom: "2px solid #0056b3",
                }}
              >
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr
                key={row._id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {row.name || "N/A"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {row.phoneNo || "N/A"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {row.email || "N/A"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {row.service || "N/A"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    color: "#333",
                  }}
                >
                  {formatDate(row.createdAt)}
                </td>
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <span
                    className="eye-icon"
                    onClick={() => openModal(row.message)}
                    style={{
                      cursor: "pointer",
                      color: "#007bff",
                      fontSize: "18px",
                    }}
                  >
                    👁️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-button ${currentPage === number ? "active" : ""}`}
            style={{
              padding: "8px 12px",
              backgroundColor: currentPage === number ? "#0056b3" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Message Details"
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            height: "300px",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "24px",
            cursor: "pointer",
            color: "#555",
          }}
          onClick={closeModal}
        >
          ✕
        </span>
        <h2
          style={{
            color: "#333",
            fontSize: "20px",
            marginBottom: "15px",
          }}
        >
          Message
        </h2>
        <p
          style={{
            color: "#666",
            fontSize: "16px",
            maxHeight: "200px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #eee",
            borderRadius: "4px",
          }}
        >
          {selectedMessage || "No message available"}
        </p>
      </Modal>
    </div>
  );
}