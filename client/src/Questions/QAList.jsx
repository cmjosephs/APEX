import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QAItem from './QAItem.jsx';
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import QuestionsForm from './QuestionsForm.jsx';


var QAList = () => {
  let [product, setProduct] = useState('42369');
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [count, setCount] = useState(2);

  useEffect(() => {
    getQuestions();
  }, [product, count]);

  const getQuestions = () => {
    axios.get(`/api/products/${product}/qa/questions`, {params: {product, count: 20}})
      .then((res) => {

        setQuestions(res.data.results.splice(0, count))

      })
      .catch((err) => console.log(err))

  }

  const getMoreQuestions = () => {
    setCount(count +=2)
  }

  const searchQuestions = () => {
    console.log('Clicked');
  }


  return (
    <div className="question-list">
      <h3>Questions and Answers</h3>
        <Search onSearch={searchQuestions}/>
        <div>
          {questions.map(question => {return <QAItem question={question} key={question.question_id}/>})}
        </div>
        <div>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={getMoreQuestions}>More Questions</Button>
            <QuestionsForm/>
          </ButtonGroup>


        </div>
    </div>
  )
}

export default QAList;