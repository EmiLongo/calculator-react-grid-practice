export const ButtonClear = (props) => {
  return (
    <>
    <button id='bClear' className="btn btn-secondary">{props.children}</button>
    <button id='bClearOne' className="btn btn-secondary">{'◀◀'}</button>
    </>
  )
}
