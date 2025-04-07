import React, { Component } from 'react';
import { Container } from './App.styled';
import { Section } from './components/Section/Section';
import { FeedbackOptions } from './components/Options/Options';
import { Statistics, Notification } from './components/FeedBack/Feedback';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

   componentDidMount() {
    const savedFeedback = localStorage.getItem('feedback');
    if (savedFeedback) {
      this.setState(JSON.parse(savedFeedback));
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('feedback', JSON.stringify(this.state));
    }
  }
  
 handleReset = () => {
    this.setState({ good: 0, neutral: 0, bad: 0 });
 };
  
  onLeaveFeedback = type => {
    this.setState(prev => ({ [type]: prev[type] + 1 }));
  };


  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return Math.round((good / total) * 100) || 0;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const totalFeedback = this.countTotalFeedback();
    const totalPercentage = this.countPositiveFeedbackPercentage();
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={this.onLeaveFeedback}
            options={options}
            onReset={this.handleReset}
            total={totalFeedback}
          />
        </Section>
        <Section title="Statistics">
          {totalFeedback !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={totalPercentage}
            />
          ) : (
            <Notification message="no feedback yet" />
          )}
        </Section>
      </Container>
    );
  }
}