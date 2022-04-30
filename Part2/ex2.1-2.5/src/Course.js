

const Course = (props) => {
	const courses = props.course
	return (
		<>
			<h1>FSO : </h1>
			{
			courses.map((course) => 
				<CourseOrganizer key={course.id} course={course}/>
			)
			}
		</>
	)
}

const CourseOrganizer = (props) => {
	const course = props.course
	//The ugliness lies here
	return(
		<>
			<h2 className='course-header'> {course.id}- {course.name}</h2>
			<ul className='course-content'>
				{course.parts.map((part) => {
					return(
					<li key={part.id}> {part.id} - {part.name} | Number of Exercises : {part.exercises}</li>
					)
				})}
				<li style={{listStyleType: "none"}}>Total Number of exercises : {course.parts.reduce((sum, part) => {
				return (part.exercises + sum)
				}, 0)}
				</li>
			</ul>
		</>
	)
}


export default Course