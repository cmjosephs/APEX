import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QAItem from './QAItem.jsx';
import axios from 'axios';

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
        //console.log(res.data.results);
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
          <button className="qabutton" onClick={getMoreQuestions}>More Questions</button>
        </div>
    </div>
  )
}

export default QAList;