import React, {useState, useEffect} from 'react';
import axios from 'axios';


var Answer = ({answer, product, answerHelpful}) => {

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
      <div>

        <span className="answer-body">{answer.body}</span>
      </div>
      <div className="answer-info">
        <span>by User</span>
        {answererName(answer)}
        {new Intl.DateTimeFormat('en-US',
        {
          month: 'long',
          year: 'numeric',
          day: '2-digit'
        }).format(parseInt(answer.date))}
        <span className="seperator">|</span>
        <span className="answer-helpful">
          Helpful?
          <a className="answer-yes" onClick={() => answerHelpful(answer)}>Yes</a>
        </span>
        <span className="answer-helpful">({answer.helpfulness}) </span>
        <span className="seperator">|</span>
        <span className="answer-report">Report</span>
      </div>
    </div>
  );
};

export default Answer;