import { Outlet } from 'react-router-dom';
import './movie.css';

const Movie = () => {
  return (
    <>
      <h1 style={{
        color: "#fff",
        fontSize: "2rem",
        fontWeight: "600",
        borderBottom: "4px solid #fff",
        paddingBottom: "12px",
        marginBottom: "15px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
      }}>
        Movie Lists
      </h1>

      <Outlet />
    </>
  );
};

export default Movie;
