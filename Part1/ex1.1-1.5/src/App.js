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
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

      </>

  )
}

const Header = (data)=>{
  return(
    <>
      <h1>{data.course}</h1>
    </>
  )
}

const Content = (data) =>{
  return(
    <>
        <Part part={data.parts[0].name} exercise={data.parts[0].exercises}/>
        <Part part={data.parts[1].name} exercise={data.parts[1].exercises}/>
        <Part part={data.parts[2].name} exercise={data.parts[2].exercises}/>

    </>
  )
}


const Total = (data)=>{
  return(
    <>
      <p>Number of exercises {data.parts[0].exercises + data.parts[1].exercises + data.parts[2].exercises}</p>

    </>
  )
}

const Part = (data)=>{
  return(
    <>
      <p>
        {data.part} {data.exercise}
      </p>
    </>
  )
}


export default App