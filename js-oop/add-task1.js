//Імплементуйте клас Student з такими публічними властивостями як name, lastName та averageScore.
// Імплементуйте статичний метод getStudentsAverageScore для обчислення середнього балу всіх студентів.
// Цей метод має приймати масив студентів
// Розрахунок середнього балу всіх студентів - сума балів всіх студентів поділена на кількість студентів.
// Середній бал має бути округленим до 2 знаків після коми
// Якщо передано пустий масив студентів то має бути повернений 0

class Student {
  constructor(name, lastName, averageScore) {
    this.name = name;
    this.lastName = lastName;
    this.averageScore = averageScore;
  }

  static getStudentsAverageScore(studentsList) {
    if (studentsList.length === 0) {
      return 0;
    }
    return (
      Math.round(
        (studentsList.reduce(
          (accumulator, current) => accumulator + current.averageScore,
          0
        ) /
          studentsList.length) *
          100
      ) / 100
    );
  }
}

const student1 = new Student('John', 'Johnson', 85.5);
const student2 = new Student('Alice', 'Smith', 92.3);
const student3 = new Student('Bob', 'Brown', 78.9);

const students = [student1, student2, student3];

console.log(Student.getStudentsAverageScore(students)); // 85.57
console.log(Student.getStudentsAverageScore([])); // 0
