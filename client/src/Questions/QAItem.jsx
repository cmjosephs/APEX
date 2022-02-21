import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import axios from 'axios';

var QAItem = ({question, getQuestions, productId, productName}) => {
  let [answers, setAnswer] = useState([]);
  let [totalAnswer, setTotalAnswer] = useState(0)
  let [count, setCount] = useState(2);
  let [showButton, setShowButton] = useState(true);
  let [markHelpful, setMarkHelpful] = useState(true);
  let [markQHelpful, setMarkQHelpful] = useState(true);

  useEffect(() => {
      getAnswers()
    }, [markHelpful, count])

  const getAnswers = () => {
    axios.get(`/api/products/${productId}/qa/questions/${question.question_id}/answers`, {params: {count: 20}})
      .then((res) => {

        let sortedAnswers = res.data.results.sort((a, b) => {
          return b.helpfulness - a.helpfulness
        })

        for (let i = 0; i < sortedAnswers.length; i++) {
          let currentAnswer = sortedAnswers[i];
          if (currentAnswer.answerer_name === "Seller") {
            sortedAnswers.splice(i, 1);
            sortedAnswers.unshift(currentAnswer)
          }
        }

        if (count >= sortedAnswers.length) {
          setShowButton(!showButton)
        }
        setTotalAnswer(sortedAnswers.length)
        setAnswer(sortedAnswers.splice(0, count))

      })
      .catch((err) => console.log(err))
  }

  const getMoreAnswers = () => {
    setCount(count += 2)
  }

  const seeLessAnswers = () => {
    setCount(2)
  }

  const questionHelpful = () => {
    if(markQHelpful) {
      axios.put(`/api/products/${productId}/qa/questions/${question.question_id}/helpful`, {})
        .then(() => getQuestions())
        .then(setMarkQHelpful(false))
    }
  }

  const answerHelpful = (answer) => {
    if(markHelpful){
      axios.put(`/api/products/${productId}/qa/answers/${answer.answer_id}/helpful`, {})
        .then(getAnswers())
        .then(setMarkHelpful(false))
    }
  }

  const answerButton = () => {
    if (totalAnswer <= 2) {
      return (<div></div>)
    }
    if (count < totalAnswer) {
      return (<button className="answer-button" onClick={getMoreAnswers}>See More Answers</button>)
    } else {
      return (<button onClick={seeLessAnswers}>Collapse Answers</button>)
    }

  }

  return (
    <div className="questionBlock">
      <div className="question-heading">
        <p><b>Q:</b></p>
        <p><b>{question.question_body}</b></p>
        <span className="question-helpful">
          Helpful?
          <a className="question-yes" onClick={questionHelpful}>Yes</a>
          <span>({question.question_helpfulness})</span>
          <span className="seperator">|</span>

          <AnswerForm productId={productId} productName={productName} question={question} getAnswers={getAnswers}/>
        </span>
      </div>
      <div>
      {totalAnswer ? <span className="answer-title">A:</span> : <span>No Answers Yet</span>}
        {answers.map((answer) => {
          return <Answer answer={answer} key={answer.answer_id} productId={productId} answerHelpful={answerHelpful}/>
        })}
      </div>
      <div>
        {answerButton()}
      </div>
      </div>
  );
};

export default QAItem;
