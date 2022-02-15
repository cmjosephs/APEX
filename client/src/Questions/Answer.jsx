import React from 'react';


var Answer = ({answer}) => {

  return (
    <div className="answers">
      <div>{"A: "}{answer.body}</div>
      <div>{"username: "}{answer.answerer_name}</div>


      <div>{answer.date}</div>
      <div>{answer.helpfulness}</div>
    </div>
  );
};

export default Answer;