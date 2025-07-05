import type { CSSProperties } from "react";

export const sidebarStyles: { container: CSSProperties; link: CSSProperties } =
  {
    container: {
      width: "250px",
      height: "100vh",
      position: "fixed", // Certifique-se de usar um valor válido
      top: 0,
      left: 0,
      zIndex: 1000, // Garante que o sidebar ficará acima de outros elementos
      padding: "20px",
    },
    link: {
      color: "white",
      textDecoration: "none", // Remove o sublinhado dos links
    },
  };
