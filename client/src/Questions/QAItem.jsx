import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';

var QAItem = ({question}) => {
  const [answerObj, setAnswerObj] = useState(question.answers)
  const [answers, setAnswer] = useState([]);
  const [product, setProduct] = useState('42369');

  useEffect(() => {
    transformAnswerObj();
  }, [answerObj]);

  const transformAnswerObj = () => {
    const answers = Object.values(answerObj).map(answer => answer);
    setAnswer(answers);
  }

  const getMoreAnswers = () => {
    axios.get(`/api/products/${product}/qa/questions/${question.question_id}/answers`)
      .then((res) => {
        //console.log(res.data.results)
        setAnswer(res.data.results)
      })
      .catch((err) => console.log('Error'))
  }
  return (
    <div className="questions">
      <div>{"Q: "}{question.question_body}</div>
      {question.question_helpfulness}
      <div>
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.id} />
        })}
      </div>
    </div>
  );
};

export default QAItem;