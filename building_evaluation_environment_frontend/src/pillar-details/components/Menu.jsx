import "../../App.css";

export default function Menu({ sections, onSelectSection }) {
  console.log(sections);
  return (
    <div>
      <ul>
        {sections.map((section) => (
          <li key={section}>
            <button onClick={() => onSelectSection(section)} style={{ color: 'black', backgroundColor: 'white' }}>
              <h3>{section}</h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
