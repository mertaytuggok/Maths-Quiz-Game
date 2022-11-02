import React, { useContext } from "react";
import styles from "./Home.module.css";
import LineComp from "../assets/Line.js";
import EllipseComp from "../assets/Ellipse";
import { Link } from "react-router-dom";
import { Context } from "../hooks/provider";

const Home = () => {
  // Context
  const { totalResult, tour, setTour } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Mathematics Game</h1>
          <LineComp />
        </div>
        <div className={styles.details}>
          <h2>Total Score: {totalResult.totalScore}</h2>
          <h2>Total Questions: {totalResult.totalQuestions}</h2>
          <h2>Correct Answers: {totalResult.correctAnswers}</h2>
        </div>
        <div className={styles.footer}>
          <Link to="/game" onClick={() => setTour(tour + 1)}>
            <EllipseComp />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
