import React from 'react';
import { 
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  H3,
  Text,
} from 'native-base';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as Progress from 'react-native-progress';

import { 
  ProgressLabel, 
  ProgressContainer, 
  QuestionContainer,
  AnswersContainer,
  CheckContainer,
  Question,
  CheckButtonText,
  CheckStatusText
} from './styled';
import Countdown from '../../components/Countdown';
import Answer from '../../components/Answer';

export default class QuestionScreen extends React.Component {

  state = {
    isCheckMode: false,
    countdownValue: 12,
    isCountdownPause: false,
    currentQuestion: 0,
    selectedAnswer: undefined,
    questions: [
      {
        text: 'This is Quiz App, What you think about it? Can you tell me something?',
        answers: [
          'Nice',
          'Good',
          'Perfect',
          'The best'
        ],
        correctAnswer: 3
      },
      {
        text: 'This is the second question',
        answers: [
          '1',
          '2dfhjdshfjsdhfjsdhfj fjsdh fdjsf jds fjsd hfjs fjsd hfjsd 28 3218 32183 71283 721 3',
          '3',
          '4',
          '5',
          '6'
        ],
        correctAnswer: 2
      },
      {
        text: 'Bla bla',
        answers: [
          'Yes',
          'No',
        ],
        correctAnswer: 1
      }
    ]
  }

  handleAnswerPress = (index) => {
    this.setState({
      selectedAnswer: index
    });
  }

  handleCheckPress = () => {
    this.setState({
      isCheckMode: true,
      isCountdownPause: true,
      isCountdownRefreshed: false,
    });
  }

  handleNextPress = () => {
    if (this.state.currentQuestion + 2 <= this.state.questions.length) {
      this.setState({
        isCheckMode: false,
        isCountdownRefreshed: true,
        isCountdownPause: false,
        currentQuestion: ++this.state.currentQuestion,
        selectedAnswer: undefined,
      });
    }
  }

  handleFinishPress = () => {
    console.log('finish!')
  }

  handleCountdownEnd = () => {

    const {
      currentQuestion,
      questions
    } = this.state;

    currentQuestion + 1 === questions.length
      ? this.handleFinishPress()
      : this.handleNextPress()
  }

  render() {

    const { 
      currentQuestion,
      questions,
      selectedAnswer,
      isCheckMode,
      countdownValue,
      isCountdownPause,
      isCountdownRefreshed,
    } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button 
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Question</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ alignItems: 'center', height: '100%' }}>
          <H3 style={{ marginTop: 20 }}>Topic of the quiz</H3>
          <ProgressContainer>
            <Progress.Bar 
              progress={currentQuestion / questions.length}
              width={null} 
              color='#35DBA7'
              unfilledColor='#DDDCE1'
              borderWidth={0}
            />
          </ProgressContainer>
          <QuestionContainer>
            <ProgressLabel>
              Question {currentQuestion+1} of {questions.length} ({Math.floor((currentQuestion / questions.length) * 100)}%)
            </ProgressLabel>
            <Question>
              {`${currentQuestion+1}. ${questions[currentQuestion].text}`}
            </Question>
            <Countdown
              time={countdownValue}
              isPause={isCountdownPause}
              onEnd={this.handleCountdownEnd}
              isRefreshed={isCountdownRefreshed}
            />
          </QuestionContainer>
          <AnswersContainer>
            {questions[currentQuestion].answers.map((answer, index) =>
              <Answer
                index={index}
                key={index}
                text={answer}
                disabled={isCheckMode}
                isCorrect={index === questions[currentQuestion].correctAnswer}
                isSelected={index === selectedAnswer}
                onPress={this.handleAnswerPress}
              />
            )}
          </AnswersContainer>
          {selectedAnswer >= 0 &&
            <CheckContainer>
              {isCheckMode 
                ? selectedAnswer === questions[currentQuestion].correctAnswer
                  ? <CheckStatusText correct>Your answer is correct!</CheckStatusText>
                  : <CheckStatusText>Your answer is incorrect!</CheckStatusText>
                : null
              }
              <Button 
                rounded
                onPress={isCheckMode 
                  ? currentQuestion + 1 === questions.length
                    ? this.handleFinishPress 
                    : this.handleNextPress 
                  : this.handleCheckPress
                }
                style={{
                  backgroundColor: '#33BFD8'
                }}
              >
                <CheckButtonText>
                  {isCheckMode 
                    ? currentQuestion + 1 === questions.length
                      ? 'Finish'
                      : 'Next' 
                    : 'Check'}
                </CheckButtonText>
              </Button>
            </CheckContainer>
          }
        </Content>
      </Container>
    );
  }
}
