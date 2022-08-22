export default function AppInput(props) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        for={props.label}
      >
        {props.label}
      </label>
      <input
        value={props.value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-indigo-400"
        id={props.label}
        {...props}
      />
    </div>
  );
}
