const averageGrade = 67;

switch (true) {
  case averageGrade >= 0 && averageGrade < 60:
    console.log('Незадовільно');
    break;
  case averageGrade >= 60 && averageGrade <= 70:
    console.log('Задовільно');
    break;
  case averageGrade > 70 && averageGrade <= 80:
    console.log('Добре');
    break;
  case averageGrade > 80 && averageGrade <= 90:
    console.log('Дуже добре');
    break;
  case averageGrade > 90 && averageGrade <= 100:
    console.log('Відмінно');
    break;
  default:
    console.log('Некоректна оцінка');
}
