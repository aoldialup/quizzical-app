import { nanoid } from 'nanoid';

export function Answer(props: { id: number, handleClick: any, isSelected: boolean, content: string }) {
    return (
        <div style={{backgroundColor: props.isSelected ? '#D6DBF5' : ''}} onClick={props.handleClick} className='answer' key={nanoid()}>
            <h1 className='answer-text'>{props.content}</h1>
        </div>
    );
}