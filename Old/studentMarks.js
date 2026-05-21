let students = [
    { name: "Aryan",  marks: [80, 90, 85], attendance: 80 },
    { name: "Sneha",  marks: [40, 35, 30], attendance: 90 },
    { name: "Rohan",  marks: [70, 75, 80], attendance: 60 },
    { name: "Priya",  marks: [95, 92, 98], attendance: 95 },
    { name: "Karan",  marks: [50, 55, 45], attendance: 78 }
];
let passedStudents=0

for(let i of students){
    console.log(i.name+"'s", "report")
    let avgMarks=0
    for(let k of i.marks){
        avgMarks+=k;
    }
    avgMarks=avgMarks/i.marks.length
    for(let j in i){
        console.log(j,":",i[j]);
    }
    let assignedGrade = null
    if (i.attendance<75){
        assignedGrade = "Detained"
    } else{
        if(avgMarks>=90){
        assignedGrade="A"
    } else if ( avgMarks>=75){
        assignedGrade="B"
    } else if (avgMarks>=60){
        assignedGrade="C"
    } else if (avgMarks>=40){
        assignedGrade="D"
    } else if (avgMarks<40){
        assignedGrade="Fail"
    }
    };
    if(assignedGrade!="Fail" && assignedGrade!="Detained"){
        passedStudents+=1;
    };
    console.log("Average Marks :", avgMarks, "| Grade :",assignedGrade)
    
};
console.log("Passed students :",passedStudents)
let z=0;
let stars=""
while (z<passedStudents){
    stars+="*"
    z++;
}
console.log(stars)
