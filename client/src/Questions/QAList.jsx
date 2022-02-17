import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QAItem from './QAItem.jsx';
import AllQuestions from './AllQuestions.jsx';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuestionForm from './QuestionForm.jsx';


var QAList = () => {
  let [product, setProduct] = useState('42369');
  let [productName, setProductName] = useState('Slacker\'s Slacks')
  let [questions, setQuestions] = useState([]);
  let [count, setCount] = useState(2);

  useEffect(() => {
    getQuestions();
  }, [product, count]);

  const getQuestions = () => {
    axios.get(`/api/products/${product}/qa/questions`, {params: {product, count: 20}})
      .then((res) => {
        let sortedQuestions = res.data.results.sort((a, b) => {
          return b.helpfulness - a.helpfulness
        })
        setQuestions(sortedQuestions.splice(0, count))

      })
      .catch((err) => console.log(err))

  }

  const getMoreQuestions = () => {
    setCount(count +=2)
  }

  const searchQuestions = () => {
    console.log('Clicked');
  }

  const renderQuestions = () => {
    if (questions.length === 0) {
      return (<QuestionForm product={product} productName={productName}/>)
    } else {
       return (
       <div className="question-answer-list">
        <AllQuestions questions={questions} getQuestions={getQuestions} product={product} productName={productName}/>

          <ButtonGroup variant="contained"  aria-label="outlined medium primary button group">
            <Button onClick={getMoreQuestions}>More Questions</Button>
            <QuestionForm product={product} productName={productName}/>
          </ButtonGroup>

        </div>
       )
    }
  }

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Questions and Answers</h3>
        <Search onSearch={searchQuestions}/>
      </div>
        {renderQuestions()}
    </div>
  )
}

export default QAList;