import { useState } from "react";

export default function useToggle() {
  const [toggleFlag, setToggleFlag] = useState(false),
    toggler = () => setToggleFlag((prev) => !prev);

  return { toggleFlag, toggler };
}
