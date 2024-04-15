export default function Table({ data }) {
  return (
    <table className="details-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Partitipation</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.participation}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
