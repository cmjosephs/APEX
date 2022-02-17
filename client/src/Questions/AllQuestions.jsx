import React from 'react';
import QAItem from './QAItem.jsx';

const AllQuestions = ({questions, getQuestions, product, productName}) => {
  return (
    <div>
    {questions.map(question => {
      return <QAItem
        question={question}
        key={question.question_id}
        getQuestions={getQuestions}
        product={product}
        productName={productName}
      />
    })}
  </div>
  )
}

export default AllQuestions;