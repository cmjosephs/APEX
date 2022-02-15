import React, {useState} from 'react';


var Answer = ({answer}) => {

  let [showMore, setShowMore] = useState(false);

  return (
    <div className="answers">
      <div>{"A: "}{answer.body.substring(0, 60)}</div>
      <div>{"by user"}{answer.answerer_name},{' '}
        {new Intl.DateTimeFormat('en-US',
        {
          month: 'long',
          year: 'numeric',
          day: '2-digit'
        }).format(parseInt(answer.date))}
        {" | Helpful? Yes ("} {answer.helpfulness}{")"}
        {" | Report"}
      </div>
    </div>
  );
};

export default Answer;