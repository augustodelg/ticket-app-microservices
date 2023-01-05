export default function ListError(props) {
  function errorList() {
    return props.errors.map((err) => <li key={err.message}>{err.message}</li>);
  }
  return <ul className="list-disc ml-10">{errorList()}</ul>;
}
