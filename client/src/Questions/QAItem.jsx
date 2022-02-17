import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import axios from 'axios';

var QAItem = ({question, getQuestions, product, productName}) => {
  let [answers, setAnswer] = useState([]);
  let [count, setCount] = useState(2);
  let [showButton, setShowButton] = useState(true);
  let [markHelpful, setMarkHelpful] = useState(true);
  let [markQHelpful, setMarkQHelpful] = useState(true);

  useEffect(() => {
      getAnswers()
    }, [markHelpful, count])

  const getAnswers = () => {
    axios.get(`/api/products/${product}/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        let sortedAnswers = res.data.results.sort((a, b) => {
          return b.helpfulness - a.helpfulness
        })
        if (count >= sortedAnswers.length) {
          setShowButton(!showButton)
        }
        setAnswer(sortedAnswers.splice(0, count))
      })
      .catch((err) => console.log(err))
  }

  const getMoreAnswers = () => {
    setCount(count += 2)
  }

  const questionHelpful = () => {
    if(markQHelpful) {
      axios.put(`/api/products/${product}/qa/questions/${question.question_id}/helpful`, {})
        .then(() => getQuestions())
        .then(setMarkQHelpful(false))
    }
  }

  const answerHelpful = (answer) => {
    if(markHelpful){
      axios.put(`/api/products/${product}/qa/answers/${answer.answer_id}/helpful`, {})
        .then(getAnswers())
        .then(setMarkHelpful(false))
    }
  }

  return (
    <div className="questions">
      <div className="question-heading">
        <p><b>Q:</b></p>
        <p><b>{question.question_body}</b></p>
        <span className="helpful">
          Helpful?
          <a onClick={questionHelpful}>Yes</a>
          <span>({question.question_helpfulness})</span>
          <span>|</span>

          <AnswerForm product={product} productName={productName} question={question} getAnswers={getAnswers}/>
        </span>
      </div>
      <div>
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.answer_id} product={product} answerHelpful={answerHelpful}/>
        })}
      </div>
      <div>
      {showButton && <button className="answerbutton" onClick={getMoreAnswers}>More Answers</button>}
      </div>
    </div>
  );
};

export default QAItem;

