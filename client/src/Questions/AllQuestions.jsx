import React from 'react';
import QAItem from './QAItem.jsx';

const AllQuestions = ({questions, getQuestions, productId, productName}) => {
  return (
    <div className="questions-list">
    {questions.map(question => {
      return <QAItem
        question={question}
        key={question.question_id}
        getQuestions={getQuestions}
        productId={productId}
        productName={productName}
      />
    })}
  </div>
  )
}

export default AllQuestions;