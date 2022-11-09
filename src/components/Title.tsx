export function Title(props: { onClick: any }) {
    return (
      <>
        <h1 className='title'>Quizzical</h1>
        <h4 className='description'>Youre favorite quiz website</h4>
        <button onClick={props.onClick} className='start-button'>Start quiz</button>
      </>
    );
}