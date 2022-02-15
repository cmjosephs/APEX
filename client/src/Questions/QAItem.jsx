import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';

var QAItem = ({question}) => {
  let [answerObj, setAnswerObj] = useState(question.answers)
  let [answers, setAnswer] = useState([]);
  let [product, setProduct] = useState('42369');
  let [count, setCount] = useState(2);



  useEffect(() => {
    transformAnswerObj();
  }, [answerObj, count]);

  const transformAnswerObj = () => {
    const answers = Object.values(answerObj).map(answer => answer);
    setAnswer(answers.splice(0, count));
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
  }



  return (
    <div className="questions">
      <div>
        {"Q: "}{question.question_body}
        {"  Helpful? Yes("}{question.question_helpfulness}{") | "}

      </div>
      <div>
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.id} />
        })}
      </div>
      <div>
      <button className="answerbutton" onClick={getMoreAnswers}>More Answers</button>
      </div>
    </div>
  );
};

export default QAItem;