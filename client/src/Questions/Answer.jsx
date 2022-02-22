import React, {useState, useEffect} from 'react';
import axios from 'axios';


var Answer = ({answer, productId, answerHelpful}) => {
  let [clickedReport, setClickReport] = useState(true)

  const reportAnswer = () => {
    if (clickedReport) {
      console.log('clicked');
      setClickReport(false);
    }
  }

  const answererName = (answer) => {
    if ((answer.answerer_name) === 'Seller') {
      return (<span><b>{answer.answerer_name}</b>,  </span>)
    } else {
      return (
        <span>{answer.answerer_name},  </span>
      )
    }
  }


  return (
    <div className="answer-container">
      <div className="answer-body">
        <span >{answer.body}</span>
      </div>
      <div className="answer-info">
        <span>by User{'  '}</span>
        {answererName(answer)}
        {new Date(answer.date).toLocaleDateString('en-us',
        {
          month: 'long',
          year: 'numeric',
          day: 'numeric'
        })}
        <span className="seperator">|</span>
        <span className="answer-helpful">
          Helpful?
          <a className="answer-yes" onClick={() => answerHelpful(answer)}>Yes</a>
        </span>
        <span className="answer-helpful">({answer.helpfulness}) </span>
        <span className="seperator">|</span>
        {clickedReport ? <span className="answer-report" onClick={reportAnswer}>Report</span> : <span>Reported</span>}
      </div>
    </div>
  );
};

export default Answer;