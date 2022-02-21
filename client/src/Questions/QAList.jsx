import React, {useState, useEffect, useContext} from 'react';
import Search from './Search.jsx';
import QAItem from './QAItem.jsx';
import {AppContext} from '../App.jsx';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuestionForm from './QuestionForm.jsx';


var QAList = () => {
  const {productId, productDetails} = useContext(AppContext);
  let [questions, setQuestions] = useState([]);
  let [count, setCount] = useState(2);
  let [totalQuestions, setTotalQuestions] = useState(0);
  let [questionAdded, setQuestionAdded] = useState(false);

  useEffect(() => {
    getQuestions();
  }, [productId, count, questionAdded]);

  const getQuestions = () => {
    axios.get(`/api/products/${productId}/qa/questions`, {params: {product_id: productId, count: 20}})
      .then((res) => {
        let sortedQuestions = res.data.results.sort((a, b) => {
          return b.helpfulness - a.helpfulness
        })
        setTotalQuestions(sortedQuestions.length)
        setQuestions(sortedQuestions.splice(0, count))
        setQuestionAdded(false);
      })
      .catch((err) => console.log(err))

  }

  const getMoreQuestions = () => {
    setCount(count +=2)
  }

  const searchQuestions = (term) => {
    if (term.length >= 3) {
      let filter = questions.filter(question => {
        if (question.question_body.toLowerCase().includes(term.toLowerCase())) {
          return question;
        }
      })

      setQuestions(filter)
      setTotalQuestions(filter.length)

    } else {
      getQuestions()
      console.log('Need more than 3 characters')
    }
  }

  const moreQuestionButton = () => {
    if (totalQuestions <= 2) {
      return (<div></div>)
    }
    if (count < totalQuestions) {
      return (<button className="question-button" onClick={getMoreQuestions}>More Questions</button>)
    } else {
      return (<div></div>)
    }
  }

  const addedQuestion = () => {
    setQuestionAdded(true);
  }

  const renderQuestions = () => {
    if (questions.length === 0) {
      return (<QuestionForm productId={productId} productName={productDetails.name} addedQuestion={addedQuestion}/>)
    } else {
       return (
       <div className="question-answer-list">
         <div className="questions-list">
          {questions.map(question => {
            return <QAItem
              question={question}
              key={question.question_id}
              getQuestions={getQuestions}
              productId={productId}
              productName={productDetails.name}
            />
          })}
          </div>
          <div className="question-button-section">
            {moreQuestionButton()}
            <QuestionForm productId={productId} productName={productDetails.name} addedQuestion={addedQuestion}/>
          </div>

        </div>
       )
    }
  }

  return (
    <div className="question-container">
      <h2 className="question-header">Questions and Answers</h2>
      <div>
        <Search onSearch={searchQuestions}/>
      </div>
      <div>
        {renderQuestions()}
      </div>
    </div>
  )
}

export default QAList;