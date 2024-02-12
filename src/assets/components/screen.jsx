import propTypes from 'prop-types'
import '../styles/screen.css'
export const Screen = ({input, numHistory1, opHistory, numHistory2}) => {
  return (
    <div id="screen">
        <div id="numHistory">
        <p id="numHistory1">{numHistory1}</p>
        <p id="opHistory">{opHistory}</p>
        <p id="numHistory2">{numHistory2}</p>
        </div>
        <p id="numDisplay">{input}</p>
    </div>
  )
}
Screen.propTypes = {
    input : propTypes.string,
    numHistory1 : propTypes.string,
    opHistory : propTypes.string,
    numHistory2 : propTypes.string
}

