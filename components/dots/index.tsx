export const Dot: React.FC<{ dotColor?: string }> = ({
    dotColor = '#908E8F',
  }) => {
    return (
      <span
        style={{
          fontSize: '18px',
          fontWeight: '900',
          marginRight: '6px',
          verticalAlign: 'middle',
          color: dotColor,
        }}
      >
        &#x2022;
      </span>
    );
  };