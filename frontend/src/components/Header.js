export default function Header({ name }) {
  const headerStyle = {
    textAlign: "center",
    backgroundColor: "white",
    padding: "10px 0",
    marginBottom: "10px",
  };

  return <h1 style={headerStyle}>{name}</h1>;
}
