const DeleteButton = ({ handleClick }) => (
  <button
    className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={handleClick}
  >
    Delete
  </button>
)

export default DeleteButton
