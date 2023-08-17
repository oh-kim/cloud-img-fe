import { ReactNode, forwardRef } from "react";

interface Props {
  children?: ReactNode;
}
type Ref = HTMLDivElement;

const MapContainer = forwardRef<Ref, Props>(function ForwardRefMap(props, ref) {
  return <div ref={ref} className='w-full h-full bg-blue-300 p-2'></div>;
});

export default MapContainer;
