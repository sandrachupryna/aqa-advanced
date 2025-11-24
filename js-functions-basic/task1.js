function areaOfRectangleDeclaration(width, hight) {
    return width * hight;
}

console.log("Area of a rectangle with sides 5 and 10 is " + areaOfRectangleDeclaration(5, 10)); 

const areaOfRectangleExpression = function(width, hight) {
    return width * hight;
};

console.log("Area of a rectangle with sides 3 and 7 is " + areaOfRectangleExpression(7, 3)); 

const areaOfRectangleArrow = (width, hight) => {
    return width * hight
};

console.log("Area of a rectangle with sides 4 and 6 is " + areaOfRectangleArrow(4, 6)); 

const areaOfRectangleArrowConcise = (width, hight) => width * hight;

console.log("Area of a rectangle with sides 8 and 2 is " + areaOfRectangleArrowConcise(8, 2));  
