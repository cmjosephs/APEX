import React from 'react';
import QAItem from './QAItem.jsx';

const AllQuestions = ({questions, getQuestions, product}) => {
  return (
    <div>
    {questions.map(question => {
      return <QAItem question={question} key={question.question_id} getQuestions={getQuestions} product={product}/>
    })}
  </div>
  )
}

export default AllQuestions;