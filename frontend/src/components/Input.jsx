export default function Input({ children, value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="matricula">{children}</label>
      <input
        value={value}
        onChange={onChange}
        className="w-full rounded-md p-2 border-black border-2"
        id="matricula"
        placeholder="Digite sua matricula"
      />
    </div>
  );
}
