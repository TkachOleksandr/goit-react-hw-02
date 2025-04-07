import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { Section } from './components/Description/Description';
import { FeedbackOptions } from './components/Options/Options';
import  Statistics  from './components/FeedBack/Feedback';
import { Notification } from './components/Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem('feedback');
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const onLeaveFeedback = type => {
    setFeedback(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleReset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const options = Object.keys(feedback);
      return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onLeaveFeedback}
          onReset={handleReset}
          total={total}
        />
      </Section>

      <Section title="Statistics">
        {total ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
};

export default App;
