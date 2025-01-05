const Header = (course) => {
    console.log(course)
    return (
        <h1>{course.course}</h1>
    )
}

const Content = (content) => {
    console.log(content)
    return (
        <>
            <Part part={content.content[0]} /> 
            <Part part={content.content[1]} />
            <Part part={content.content[2]} />
        </>
    )
}

const Part = (part) => {
    console.log(part)
        return (
            <p>
                {part.part.name} {part.part.exercises}
            </p>
        )
}

const Total = (total) => {
    console.log(total)
    return (
        <p>
            Number of exercises {total.exercises1 + total.exercises2 + total.exercises3}
        </p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    const parts = [{ name: part1, exercises: exercises1 }, { name: part2, exercises: exercises2 }, { name: part3, exercises: exercises2 }]

    return (
        <div>
            <Header course={course} />
            <Content content={parts} />
            <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
        </div>
    )
}

export default App
