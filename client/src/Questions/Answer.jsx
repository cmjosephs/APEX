import React, {useState} from 'react';
import axios from 'axios';


var Answer = ({answer, product, getAnswer}) => {

  const answerHelpful = () => {
    axios.put(`/api/products/${product}/qa/answers/${answer.id}/helpful`, {})
      .then(() => getAnswer())
  }

  return (
    <div className="answers">
      <div>
        <span>A:</span>
        <span>{answer.body}</span>
      </div>
      <div>
        <span>by user  </span>
        <span>{answer.answerer_name},  </span>
        {new Intl.DateTimeFormat('en-US',
        {
          month: 'long',
          year: 'numeric',
          day: '2-digit'
        }).format(parseInt(answer.date))}
        <span>
          | Helpful?
          <a onClick={answerHelpful}>Yes</a>
        </span>
        <span>({answer.helpfulness}) </span>
        <span> | Report </span>
      </div>
    </div>
  );
};

export default Answer;