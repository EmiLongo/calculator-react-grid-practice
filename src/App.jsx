import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/img/FreeCodeCamp_logo.png'
import { Button } from './assets/components/button'
import { Screen } from './assets/components/screen'


function App() {
  
  const [numHistory1, setNumHistory1] = useState('');
  const [opHistory, setOpHistory] = useState('');
  const [numHistory2, setNumHistory2] = useState('');
  const [input, setInput] = useState('calculo!');

  // no actualiza rápido los states por lo tanto uso variables ref para los calculos
  // y los estados se actualicen con esos valores intermedios 
  const numHistory1Ref = useRef();
  const opHistoryRef = useRef();
  const numHistory2Ref = useRef();
  const inputRef = useRef();
  const lastButton = useRef();
  const dotRef = useRef(false);
  //num, op, eq, dot


  // cuando se toca un botón de numero
  const handleButtonNum = (value) => {
        if(value === '.'){
          if(lastButton.current === 'dot' || dotRef.current){return}
          
          dotRef.current = true
          // no se como hacerlo rapido, pendiente, agregar un 0 a la izquierda si es el primer digito
          // if(input === 'calculo!' || lastButton.current === 'eq' || input === '' ){
          //   handleButtonNum(0)
          //       console('está pasando ')
          // }      
        }
    // se fija si es el primer botón tocado o si el botón anterior tocado es el botón igual
    // if(input === 'calculo!' || lastClickEqRef.current){
    if(input === 'calculo!' || lastButton.current === 'eq' ){
          inputRef.current = value
          numHistory1Ref.current = value
          setInput(inputRef.current)
          setNumHistory1(numHistory1Ref.current)
          lastButton.current = 'num'
    } else {

          // agrega un digito al screen
          inputRef.current += value
          setInput(inputRef.current)

          // agrega un digito al history según corresponda
          if( lastButton.current === 'op' || lastButton.current === 'num2' ){

                      numHistory2Ref.current = inputRef.current
                      setNumHistory2(inputRef.current)
                      lastButton.current = 'num2'
            
          }     else {
                      numHistory1Ref.current = inputRef.current
                      setNumHistory1(inputRef.current)
                      lastButton.current = 'num1'
              
                  }
      }
  }

  // cuando se toca un botón de clear
  const handleButtonClear = () => {
    inputRef.current = 'calculo!'
    numHistory1Ref.current = ''

    setInput(inputRef.current)
    setNumHistory1(numHistory1Ref.current)
    setOpHistory(numHistory1Ref.current)
    setNumHistory2(numHistory1Ref.current)
  }

    // cuando se toca el botón de <<
    const handleButtonDelete = () => {
          // se fija si es el primer botón tocado
          if (inputRef.current === 'calculo!' || lastButton.current === 'eq' ) {
            return
          }

          // se fija si el botón anterior fue un operador
          if (inputRef.current === '') {
            inputRef.current = numHistory1
            setInput(numHistory1)
            setOpHistory('')
            return
          }

          // borra un caracter del screen
          inputRef.current = inputRef.current.substring(0, inputRef.current.length - 1)
          setInput( inputRef.current)

          // se fija cual history se está editando y borra un caracter
          if(lastButton.current === 'num2' ){
            setNumHistory2( numHistory2.substring(0, numHistory2.length - 1))
                          }  else {
                            setNumHistory1( numHistory1.substring(0, numHistory1.length - 1))
                          }
    }

  // cuando se toca un botón de operador
  const handleButtonOp = (value) => {
            // se fija si es el primer botón tocado
            if (inputRef.current === 'calculo!') {
              return
            }

            // se fija si el botón tocado anterior fue otro operador o quedó en una instancia similar
            if (inputRef.current === ""){
              opHistoryRef.current = value
              setOpHistory(opHistoryRef.current)
              return
            }

            // se fija si el botón tocado anterior fue un num para hacer la cuenta nuevamente
      if(lastButton.current === 'num2'){
            handleButtonEqual()
            numHistory1Ref.current = inputRef.current
            numHistory2Ref.current = ''
            setNumHistory1(numHistory1Ref.current)
      } else {

            // se fija si el botón tocado anterior fue el igual
        numHistory1Ref.current = inputRef.current
        setNumHistory1(numHistory1Ref.current)
        numHistory2Ref.current = ''
        setNumHistory2(numHistory2Ref.current)
        
      }
      
      lastButton.current = 'op'           //este pasa por los que no tienen return
      opHistoryRef.current = value        //
      inputRef.current = ''
      setOpHistory(opHistoryRef.current)  //
      setInput(inputRef.current)
      dotRef.current = false

  }

  // cuando se toca el botón de igual
  const handleButtonEqual = () => {
        // se fija si es el primer botón tocado y si tiene lo necesario para calcular
        if (lastButton.current === 'num2') {
              const result = (a, b, op) => 
                  {switch (op)
                        {
                        case '/':    
                            return String(+a / +b);
                        case '*':    
                            return  String(+a * +b);
                        case '-':    
                            return  String(+a - +b);
                        case '+':    
                            return String(+a + +b);
                        }
                  }
              // hace el cálculo
              const calculateResult = result(numHistory1Ref.current, inputRef.current, opHistory)

              // se limpia todo, primero los useRef para pasar a los estados
              numHistory1Ref.current = ''
              setNumHistory1(numHistory1Ref.current)
              opHistoryRef.current = ''
              setOpHistory(opHistoryRef.current)
              inputRef.current = calculateResult
              setInput(inputRef.current)
              numHistory2Ref.current = ''
              setNumHistory2(numHistory2Ref.current)
              lastButton.current = 'eq'
              dotRef.current = false
            }

  }

  //manejo de teclas presionandas
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      
      switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
                    handleButtonNum(key);
                    break;
        case '+':
        case '-':
        case '*':
        case '/':
                    handleButtonOp(key);
                    break;
        case '=':
        case 'Enter':
                    handleButtonEqual();
                    break;
        case 'Backspace':
                    handleButtonDelete();
                    break;
        case 'Escape':
                    handleButtonClear();
                    break;
        default:
                    break;
                }
              };

      document.addEventListener('keydown', handleKeyDown);
      }
    )
  return (
    <>
    <img src={logo} alt='logo del curso' />
    <h1>Calculator with React</h1>
    <div className='calculatorContainer'>
      <Screen input={input} numHistory1={numHistory1} opHistory={opHistory} numHistory2={numHistory2}></Screen>
      <Button handleButton={handleButtonNum}>1</Button>
      <Button handleButton={handleButtonNum}>2</Button>
      <Button handleButton={handleButtonNum}>3</Button>
      <Button handleButton={handleButtonNum}>4</Button>
      <Button handleButton={handleButtonNum}>5</Button>
      <Button handleButton={handleButtonNum}>6</Button>
      <Button handleButton={handleButtonNum}>7</Button>
      <Button handleButton={handleButtonNum}>8</Button>
      <Button handleButton={handleButtonNum}>9</Button>
      <Button handleButton={handleButtonNum}>0</Button>
      <Button handleButton={handleButtonOp}>-</Button>
      <Button handleButton={handleButtonOp}>+</Button>
      <Button handleButton={handleButtonOp}>*</Button>
      <Button handleButton={handleButtonOp}>/</Button>
      <Button handleButton={handleButtonNum}>.</Button>
      <Button handleButton={handleButtonEqual}>=</Button>
      <Button handleButton={handleButtonClear}>Clear</Button>
      <Button handleButton={handleButtonDelete}>{'◀◀'}</Button>
    </div>
    </>
  )
}

export default App