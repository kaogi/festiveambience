export default function Home() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Festive Ambience</h1>
      <p>Site statique préservé pour référence</p>
      <p>Version du: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
