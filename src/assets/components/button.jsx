import propTypes from 'prop-types'

export const Button = (props) => {
  const buttonProps = () => {
      switch (props.children) {
        case '1':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '2':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '3':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '4':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '5':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '6':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '7':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '8':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '9':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '0':
          return {id: `b${props.children}`, classNB: 'btn btn-primary', value: props.children};
        case '/':
          return {id: `bDiv`, classNB: 'btn btn-accent', value: '/'};
        case '*':
          return {id: `bMult`, classNB: 'btn btn-accent', value: '*'};
        case '-':
          return {id: `bMinus`, classNB: 'btn btn-accent', value: '-'};
        case '+':
          return {id: `bPlus`, classNB: 'btn btn-accent', value: '+'};
        case '=':
          return {id: `bEq`, classNB: 'btn btn-accent'};
        case '.':
          return {id: `bPoint`, classNB: 'btn btn-neutral'};
        case 'Clear':
          return {id: `bClear`, classNB: 'btn btn-secondary'};
        case '◀◀':
          return {id: `bClearOne`, classNB: 'btn btn-secondary'};
        default:
          return {id: `bdefalut`, classNB: 'btn btn-secondary'};

      }

  }
  const bottonValue = (!buttonProps.value ? props.children : "")

  return (
    <button id={buttonProps().id} 
            className={buttonProps().classNB}
            onClick={()=> props.handleButton(bottonValue)}
            >{props.children}</button>
  )
}
Button.propTypes = {
  children : propTypes.string,
  handleButton : propTypes.func,
  value : propTypes.string
}
