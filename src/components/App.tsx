import { useState, useEffect } from 'react';
import '../App.css';
import { nanoid } from 'nanoid';
import { Title } from './Title';
import { Question, QuestionData } from './Question';

const QUIZ_TITLE: number = 0;
const QUIZ_PLAYING: number = 1;
const QUIZ_OVER: number = 2;

function decodeHTML(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

function constructQuestion(rawData: any, index: number): QuestionData {
  let correctAnswerIndex: number = random(0, 3);
  rawData.incorrect_answers.splice(correctAnswerIndex, 0, rawData.correct_answer);

  return {
    question: decodeHTML(rawData.question),
    answers: rawData.incorrect_answers.map((x: string) => decodeHTML(x)),
    correctAnswerIndex: correctAnswerIndex,
    id: index,
    selectedIndex: -1
  }
}

function App() {
  const [quizState, setQuizState] = useState(QUIZ_TITLE);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setQuestions(data.results.map((rawData: any, index: number) => constructQuestion(rawData, index))))
  }, []);

  function selectAnswer(questionId: number, newSelection: number) {
    setQuestions((prevQuestions: QuestionData[]) => prevQuestions.map(question => {
      if (question.id === questionId) {
        if (newSelection === question.selectedIndex) {
          return { ...question, selectedIndex: -1 }
        }
        
        return { ...question, selectedIndex: newSelection }
      }

      return question;
    }))

    console.clear();
    console.log(`id: ${questionId}\nnew selection: ${newSelection}`)
    console.log(questions);
  }

  return (
    <div className="App">
      {quizState === 0 && <Title onClick={() => setQuizState(QUIZ_PLAYING)} />}
      {quizState === 1 &&
        <div>
          {questions.map((x: QuestionData) => <Question key={nanoid()} data={x} handleClick={selectAnswer} />)}
          <button className='bottom-button'>Check answers</button>
        </div>
      }
    </div>
  );
}

export default App;