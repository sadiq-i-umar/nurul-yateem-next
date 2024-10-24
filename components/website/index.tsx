import "./style.css";

export const HeroSection = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "50px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        maxWidth: "1200px",
        margin: "50px auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ flex: 1, paddingRight: "20px" }}>
        <p
          style={{
            fontSize: "14px",
            color: "#28a745",
            fontWeight: "bold",
          }}
        >
          EMPOWERING OPRHANS FOR BRIGHT FUTURE.
        </p>
        <h1
          style={{
            fontSize: "40px",
            color: "#333",
            margin: "0",
            lineHeight: "1.2",
            fontFamily: "Poppins Extra Bold !Important",
          }}
        >
          Turning <br /> compassion into <br /> opportunities for
          <br /> orphaned children
        </h1>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "15px 30px",
            border: "none",
            borderRadius: "5px",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          {" "}
          Sponsor A Child Today
        </button>
      </div>
      <div>
        <img src="/opg.png" alt="Orphaned Children" />
      </div>
    </div>
  );
};
