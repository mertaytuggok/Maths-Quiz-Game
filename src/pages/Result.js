import React, { useContext } from "react";
import styles from "./Result.module.css";
import LineComp from "../assets/Line.js";
import EllipseComp from "../assets/Ellipse";
import { Link, useNavigate } from "react-router-dom";
import TrueIcon from "../assets/TrueIcon";
import FalseIcon from "../assets/FalseIcon";
import { Context } from "../hooks/provider";

const Result = () => {
  const {
    resultQuestions,
    trueAnswerCount,
    questionsArr,
    score,
    setAllQuestion,
  } = useContext(Context);

  // Oyunu başlattığımız da soruları tanımlar
  const handleClick = () => {
    setAllQuestion();
  };

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <div className={styles.left}>
          <div className={styles.header}>
            <h1>Final</h1>
            <LineComp width="228" />
          </div>
          <div className={styles.details}>
            <h2>Point: {score}</h2>
            <h2>Questions: {questionsArr.length}</h2>
            <h2>Correct Answers: {trueAnswerCount}</h2>
          </div>
          <div className={styles.footer}>
            <Link onClick={handleClick} to="/">
              <EllipseComp x="150" name="Restart" />
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <h1>All Question</h1>
            <LineComp width="430" />
          </div>
          <ul className={styles.list}>
            {resultQuestions &&
              resultQuestions.map((question, index) => (
                <li key={index} className={styles.listItem}>
                  <h4>{question.resultQuestionText}</h4>
                  {question.isAnswerTrue ? <TrueIcon /> : <FalseIcon />}
                </li>
              ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Result;
