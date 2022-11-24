export default function Header({ name }) {
  const headerStyle = {
    textAlign: "center",
    backgroundColor: "#F3F3F3",
    padding: "20px 0",
    marginBottom: "10px",
    margin: "0 0 25px 0",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  };

  return <h1 style={headerStyle}>{name}</h1>;
}
