import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QAItem from './QAItem.jsx';
import axios from 'axios';

var QAList = () => {
  const [product, setProduct] = useState('42369');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    getMoreQuestions();
  }, [product]);

  const getMoreQuestions = () => {
    axios.get(`/api/products/${product}/qa/questions`, {params: {product}})
      .then((res) => {
        //console.log(res.data.results);
        setQuestions(res.data.results)

      })
      .catch((err) => console.log(err))

  }

  const getMoreAnswers = () => {
    // axios.get()
  }

  const searchQuestions = () => {
    console.log('Clicked');
  }



  return (
    <div className="questionsandanswers">
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