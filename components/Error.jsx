import { useRouteError } from "react-router-dom";
export default function() {
    const error = useRouteError();
  return (
    <div>something went wrong. {error.status}</div>
  )
}
