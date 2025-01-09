import { useState } from 'react'

const Header = ({props}) => {
    console.log(props)
    return <h1>{props}</h1>
}

const Button = ({onClick, name}) => {
    console.log("Button created with:", onClick, name)
    return <button onClick={onClick}>{name}</button>
}

const Statistics = ({ name, state }) => {
    if (name == "Positive") {
        return <tr><td>{name}</td><td>{state}%</td></tr>
    }
    else {
        return <tr><td>{name}</td><td>{state}</td></tr>
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad
    const average = total / 3
    const positive = good / total * 100

    const showStats = () => {
        if (total === 0 ) {
            return <p>No Feedback given</p>
        } else {
            return (
                <table>
                    <tbody>
                        <Statistics name="Good" state={good} />
                        <Statistics name="Neutral" state={neutral} />
                        <Statistics name="Bad" state={bad} />
                        <Statistics name="All" state={total} />
                        <Statistics name="Average" state={average} />
                        <Statistics name="Positive" state={positive} />
                    </tbody>
                </table>
            )
        }
    }

    return (
        <div>
            <Header props="Give Feedback!" />
            <Button onClick={() => setGood(good + 1)} name="good" />
            <Button onClick={() => setNeutral(neutral + 1)} name="neutral" />
            <Button onClick={() => setBad(bad + 1)} name="bad" />
            <Header props="Statistics" />
            {showStats()}
        </div>
    )
}

export default App
