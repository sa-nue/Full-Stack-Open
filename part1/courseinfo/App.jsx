const Header = (course) => {
    console.log(course)
    return (
        <h1>{course.course.name}</h1>
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
            Number of exercises {total.total[0].exercises + total.total[1].exercises + total.total[2].exercises}
        </p>
    )
}

export default App

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content content={course.parts} />
            <Total total={course.parts} />
        </div>
    )
}

export default App
