export default function Button({ children, onClick }) {
  return (
    <div className="w-full flex justify-center">
      <button
        className="w-full bg-sky-800 hover:bg-sky-700 text-white p-2 rounded-sm mt-4"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
