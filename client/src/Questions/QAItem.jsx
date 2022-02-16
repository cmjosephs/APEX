import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';

var QAItem = ({question, getQuestions, product}) => {
  let [answerObj, setAnswerObj] = useState(question.answers)
  let [answers, setAnswer] = useState([]);
  let [count, setCount] = useState(2);
  let [showButton, setShowButton] = useState(true);


  useEffect(() => {
   transformAnswerObj();
  }, [answerObj, count]);

  const transformAnswerObj = () => {
    const answers = Object.values(answerObj).map(answer => answer);
    if (answers.length <= 2) {
      setAnswer(answers)
    } else {
      setAnswer(answers.splice(0, count));
    }
  }

  const getAnswer = () => {
    axios.get(`/api/products/${product}/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        setAnswer(res.data.results.splice(0, count))
      })
      .catch((err) => console.log(err))
  }

  const getMoreAnswers = () => {
    setCount(count += 2)
    if (count >= answers.length) {
      setShowButton(!showButton)
    }
  }

  const questionHelpful = () => {
    axios.put(`/api/products/${product}/qa/questions/${question.question_id}/helpful`, {})
      .then(() => getQuestions())
  }



  return (
    <div className="questions">
      <div>
        <span>Q:  </span>
        <span>{question.question_body}   </span>
        <span>
          Helpful?
          <a onClick={questionHelpful}>Yes</a>
          <span>({question.question_helpfulness}) </span>
        </span>
      </div>
      <div>
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.id} product={product} getAnswer={getAnswer}/>
        })}
      </div>
      <div>
      {showButton && <button className="answerbutton" onClick={getMoreAnswers}>More Answers</button>}
      </div>
    </div>
  );
};

export default QAItem;