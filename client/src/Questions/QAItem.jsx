import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';

var QAItem = ({question}) => {
  let [answerObj, setAnswerObj] = useState(question.answers)
  let [answers, setAnswer] = useState([]);
  let [product, setProduct] = useState('42369');
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

  const getAnswers = () => {
    axios.get(`/api/products/${product}/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        //console.log(res.data.results)
        setAnswer(res.data.results)
      })
      .catch((err) => console.log('Error'))
  }

  const getMoreAnswers = () => {
    setCount(count += 2)
    if (count >= answers.length) {
      setShowButton(!showButton)
    }
  }

  const questionHelpful = () => {
    axios.put(`/api/products/${product}/qa/questions/${question.question_id}/helpful`, {})
      .then(() => console.log('clicked'))
  }

  return (
    <div className="questions">
      <div>
        <span>Q:</span>
        <span>{question.question_body}</span>
        <span>
          Helpful?
          <a onClick={questionHelpful}>Yes</a>
          {question.question_helpfulness}
        </span>
      </div>
      <div>
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.id} />
        })}
      </div>
      <div>
      {showButton && <button className="answerbutton" onClick={getMoreAnswers}>More Answers</button>}
      </div>
    </div>
  );
};

export default QAItem;