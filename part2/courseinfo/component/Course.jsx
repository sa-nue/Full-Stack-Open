const Header = ({ course }) => {
    return <h2>{course}</h2>
}

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    console.log("Content gets this:", parts)
    return parts.map(part => <Part key={part.id} part={part} />)  // For each part in parts <Part ... /> is called; key is needed as a unique identifier for React (for correct rendering)
}

const Course = ({ courses }) => {
    console.log("This is parsed to Course:", courses)
    return (
        courses.map(course =>
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />  {/* .reduce iterates through .parts; for each part it adds the value of exercises to the sum; initial value of sum is defined as 0 */}
            </div>
        )
    )
}

export default Course
