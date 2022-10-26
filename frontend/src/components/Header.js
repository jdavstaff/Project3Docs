export default function Header({ name }) {
  const headerStyle = {
    border: "1px solid black",
    textAlign: "center",
  };

  return <h1 style={headerStyle}>{name}</h1>;
}
