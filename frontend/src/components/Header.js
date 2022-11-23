export default function Header({ name }) {
  const headerStyle = {
    textAlign: "center",
    backgroundColor: "#F3F3F3",
    padding: "10px 0",
    marginBottom: "10px",
    margin: "0 0 10px 0",
  };

  return <h1 style={headerStyle}>{name}</h1>;
}
