export const Dot: React.FC<{ dotColor?: string }> = ({ dotColor }) => {
  return (
    <span
      style={{
        fontSize: "18px",
        fontWeight: "900",
        marginRight: "6px",
        verticalAlign: "middle",
        color: dotColor ?? "inherit",
      }}
    >
      &#x2022;
    </span>
  );
};
