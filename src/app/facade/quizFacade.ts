// import { Injectable } from '@angular/core';
//
// @Injectable()

export class IQuestionType {
  Text: number;
  Image: number;
  Code:number;
}

export class IAnswerType {
  SingleAnswer: number;
  MultipleAnswers: number;
}

export default new class QuizFacade {
  public QuestionType : IQuestionType =
  {
    Text: 1,
    Image: 2,
    Code: 3
  };
  public AnswerType : IAnswerType =
  {
    SingleAnswer: 1,
    MultipleAnswers: 2
  };
}

