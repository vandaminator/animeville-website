import { useEffect, useRef, useState } from "react";
import "./drawer.css"

type Props = {
  children: React.ReactNode;
};

function Drawer({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLButtonElement>(null);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <button onClick={toggleDrawer} ref={drawerRef}>Toggle Drawer</button>
      {children}
    </div>
  );
}

export default Drawer;
