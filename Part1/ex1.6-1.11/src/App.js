import { useState } from 'react'


const App = () => {

	//? No need for these 3, they can help with readability but this app is extremly simple so no one cares...
	// const [good, setGood] = useState(0)
	// const [neutral, setNeutral] = useState(0)
	// const [bad, setBad] = useState(0)
	const [counter, setCounter] = useState({
	"Good" : 0, 
	"Neutral" : 0, 
	"Bad" : 0})

	const updateCounter = (btn)=>{
		if(btn==="good"){
			setCounter({...counter, Good : counter.Good + 1 })
		}
		else if (btn==="neutral"){
			setCounter({...counter, Neutral : counter.Neutral + 1 })
		}
		else{
			setCounter({...counter, Bad : counter.Bad + 1 })
		}
	}

	return (
		<>
			<h1>Give Feedback</h1>
			<CustomButton performAction={()=>{updateCounter("good")}} action={"Good"}/>
			<CustomButton performAction={()=>{updateCounter("neutral")}} action={"Neutral"}/>
			<CustomButton performAction={()=>{updateCounter("bad")}} action={"Bad"}/>
			<br />
			<h1>Statistics : </h1>
			<StitistacsHandler counter={counter}/>
		</>
	)
}


const CustomButton = (props) => {
	return (
		<>
			<button onClick={props.performAction}>{props.action}</button>
		</>
	)
}

	//Man's not hot
const StitistacsHandler = (props) => {

	const getTotalNumber = (counterObject) =>{
		return counterObject.Good + counterObject.Neutral + counterObject.Bad
	}

	const getAverage = (counterObject) =>{
		return  (getTotalNumber(counterObject.counter)===0)? 0 : (counterObject.counter.Good + (counterObject.counter.Bad * -1)) / getTotalNumber(counterObject.counter)
	}

	const getPositivePercentage = (counterObject) =>{
		return (getTotalNumber(counterObject.counter)===0)? 0 : (counterObject.counter.Good * 100 ) / getTotalNumber(counterObject.counter)
	}

	if (getTotalNumber(props.counter)===0){
		return(
			<>
			No feedback yet
			</>
		)
	}

	return(
		<table>
			<tbody> 
				<StitistacsLine text={"Good"} value={props.counter.Good}/>
				<StitistacsLine text={"Neutral"} value={props.counter.Neutral}/>
				<StitistacsLine text={"Bad"} value={props.counter.Bad}/>
				<StitistacsLine text={"Total"} value={getTotalNumber(props.counter)}/>
				<StitistacsLine text={"Average"} value={parseFloat(getAverage(props).toFixed(2))}/>
				<StitistacsLine text={"Positive"} value={parseFloat(getPositivePercentage(props).toFixed(2)) + "%"}/>
			</tbody>
		</table>
	)
}

const StitistacsLine = (props)=>{
	return(
		<tr>
			<th style={{textAlign: 'left'}}>
				{props.text}
			</th>

			<td>
				{props.value}
			</td>
		</tr>
	)
}


export default App