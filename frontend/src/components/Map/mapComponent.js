import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  return <h1>{status}</h1>;
};

<Wrapper apiKey={key} render={render}>
  <YourComponent/>
</Wrapper>

const Map = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {};

const ref = React.useRef(null);
const [map, setMap] = React.useState();

React.useEffect(() => {
  if (ref.current && !map) {
    setMap(new window.google.maps.Map(ref.current, {}));
  }
}, [ref, map]);