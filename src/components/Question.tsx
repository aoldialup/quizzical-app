import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Answer } from './Answer';

export interface QuestionData {
    question: string,
    answers: string[],
    correctAnswerIndex: number,
    id: number,
    selectedIndex: number
}

export function Question(props: { data: QuestionData, handleClick: any }) {
    return (
        <div className='question-container'>
            <h1 className='question'>{props.data.question}</h1>
            <div className='answer-container'>
                {props.data.answers.map((answer: string, index: number) =>
                    <Answer key={nanoid()} id={index} handleClick={ () => props.handleClick(props.data.id, index)} 
                    isSelected={props.data.selectedIndex === index} content={answer} />
                )}
            </div>
            <hr />
        </div>
    );
}