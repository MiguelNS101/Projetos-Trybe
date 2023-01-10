import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

import { fetchTriviaQuestions, getTokenApi, addScore, addAssertos } from '../actions';

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      sortedAnswers: [],
      clicked: false,
      totalTime: 30,
      timerRunning: true,
    };
    this.timerFunc = this.timerFunc.bind(this);
  }

  async componentDidMount() {
    const { token, fetchQuestions } = this.props;
    await fetchQuestions(token);
    this.verifyRequest();
    this.sortAnswers();
    this.timerFunc();
  }

  componentDidUpdate(_prevProps, prevState) {
    // Após clicar o botão 'next', é necessário chamar a função sortAnswers novamente.
    // Não sei se essa solução funciona!!!
    const { questionIndex } = this.state;
    if (prevState.questionIndex !== questionIndex) {
      this.sortAnswers(questionIndex);
      // this.timerFunc();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerFunc);
  }

  shuffleArray = (array) => {
    // The Fisher-Yates algorithm
    // Ref: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    // Ref: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    // Ref: http://www.robweir.com/blog/2010/02/microsoft-random-browser-ballot.html

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  sortAnswers = () => {
    const { questionIndex } = this.state;
    const { questions, responseCode } = this.props;
    const successfulRequest = 0;

    if (responseCode === successfulRequest) {
      const wrongAnswers = questions[questionIndex].incorrect_answers
        .map((answer, index) => ({
          answer,
          testId: `wrong-answer-${index}`,
          isCorrect: false,
        }));

      const answers = [
        {
          answer: questions[questionIndex].correct_answer,
          testId: 'correct-answer',
          isCorrect: true,
        },
        ...wrongAnswers,
      ];

      const sortedAnswers = this.shuffleArray(answers);
      this.setState({ sortedAnswers });
    }
  }

  verifyRequest = async () => {
    // const token = JSON.parse(localStorage.getItem('token'));
    const successfulRequest = 0;
    const { responseCode, fetchQuestions, fetchToken } = this.props;
    if (responseCode !== successfulRequest) {
      await fetchToken();
      const { token } = this.props;
      await fetchQuestions(token);
    }
  }

  handleNextBtn = () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const MAX_INDEX = 4;

    if (questionIndex === MAX_INDEX) { history.push('/Feedback'); }

    this.setState((prevState) => ({
      clicked: false,
      questionIndex: prevState.questionIndex + 1,
      totalTime: 30,
      timerRunning: true,
    }));
  };

  handleAnswerBtn(isCorrect) {
    this.setState({ clicked: true, totalTime: 0, timerRunning: false });
    console.log(isCorrect);
    // this.setState({ totalTime: 30 });
  }

  countAnswerCorrect(isCorrect) {
    const { questions, setScore, setAssertions } = this.props;
    const { totalTime, questionIndex } = this.state;

    const { difficulty } = questions[questionIndex];
    const questionValue = ['easy', 'medium', 'hard'].indexOf(difficulty) + 1;

    const magicNumber = 10; // fix lint
    const score = magicNumber + (totalTime * questionValue);
    if (isCorrect) {
      setScore(score);
      setAssertions(1);
    }
    this.handleAnswerBtn(isCorrect);
  }

  renderQuestion = (questionIndex) => {
    const { questions } = this.props;
    const { clicked, sortedAnswers } = this.state;

    const answersBtn = sortedAnswers.map((answerBtn) => {
      const { answer, testId, isCorrect } = answerBtn;
      return (
        <button
          key={ answer }
          type="button"
          value={ isCorrect }
          data-testid={ testId }
          disabled={ clicked }
          onClick={ () => this.countAnswerCorrect(isCorrect) }
          style={ clicked ? {
            border: isCorrect
              ? '3px solid rgb(6, 240, 15)'
              : '3px solid rgb(255, 0, 0)',
          } : { border: '' } }
        >
          { answer }
        </button>
      );
    });

    const triviaQuestion = (
      <article className="questions">
        <h3 data-testid="question-category">{ questions[questionIndex].category }</h3>
        <h2 data-testid="question-text">{ questions[questionIndex].question }</h2>
        <section
          data-testid="answer-options"
        >
          { answersBtn }
        </section>
      </article>
    );

    return triviaQuestion;
  };

  renderNextBtn = () => (
    <button
      type="button"
      data-testid="btn-next"
      onClick={ this.handleNextBtn }
    >
      Next
    </button>
  )

  timerFunc() {
    const second = 1000;
    setInterval(() => {
      const { timerRunning, totalTime } = this.state;
      if (timerRunning) {
        this.setState((prevState) => ({
          totalTime: prevState.totalTime - 1,
        }));
        if (totalTime === 0) {
          this.handleAnswerBtn(false);
        }
      }
    }, second);
  }

  render() {
    const { questionIndex, totalTime, clicked } = this.state;
    const { questions } = this.props;
    return (
      <div className="test">
        <Header />
        <h1 className="playTitle">Let&apos;s play!</h1>
        {questions.length > 0 && this.renderQuestion(questionIndex)}
        <article className="timeNext">
          <span>{ totalTime }</span>
          { clicked && this.renderNextBtn() }
        </article>
      </div>
    );
  }
}

GamePage.propTypes = {
  setScore: PropTypes.func.isRequired,
  setAssertions: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(),
  responseCode: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

GamePage.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  userScore: state.player.score,
  responseCode: state.trivia.response_code,
  questions: state.trivia.results,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchTriviaQuestions(token)),
  fetchToken: () => dispatch(getTokenApi()),
  setScore: (score) => dispatch(addScore(score)),
  setAssertions: (assertions) => dispatch(addAssertos(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
