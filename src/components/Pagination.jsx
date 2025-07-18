// src/components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`mx-1 px-3 py-1 border ${
            currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
