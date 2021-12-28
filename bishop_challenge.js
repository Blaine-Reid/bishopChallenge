// Bishop Challenge
// Your chess teahcer wants to know if a bishop can reach a certain spot on the board in the given amount
// of moves

// Given a starting square start, ending square end and the maximum number of moves allowed name. Return true 
// if the ending square can be reached from the starting sqaure within the given amount of moves. Keep in mind 
// the chessboard goes from a1 to h8 (8x8)


//I figured out that if you convert the letters of the move to a number. we can see a pattern that determines if a move
//is possible. If you convert the start move into a two digit number (ie a1 = [0,0] or b4 = [1,3]) then add them together
//(0+0) and (1+3). Then divide that number by 2. IF both are divisible or both are not divisible then they are on squares
//that can reach each other. If one is and the other isn't, then not matter how many moves one has, they will never reach
//each other. From there I found that if you are on the same squares you can get to any square in 2 moves. But given 1
//move was more difficult, then I saw the pattern. If given a1([0,0]) and h8([7,7]) for example, if you subtract index[0] of end
//from start index[0] you get -7 and then do the same process for index[1] you get -7. This worked from any square on the same
//angle as long as we converted it to positive numbers. It works =) and was the hardest to crack to date (1/4/20) took most the
//weekend and plagued my sleep, but solved it

function bishop(start, end, move) {
    let conStartArr, conEndArr, startVal, endVal, startEndFirst, startEndSecond

    function convert(str) {                          //function to convert the start/end move into numbers
        let returnArr = str.split('')
        switch (returnArr[0]) {                      //switch to convert the letter of the move to a digit
            case "a":
                returnArr[0] = 0
                break;
            case "b":
                returnArr[0] = 1
                break;
            case "c":
                returnArr[0] = 2
                break;
            case "d":
                returnArr[0] = 3
                break;
            case "e":
                returnArr[0] = 4
                break;
            case "f":
                returnArr[0] = 5
                break;
            case "g":
                returnArr[0] = 6
                break;
            case "h":
                returnArr[0] = 7
                break;

        }
        returnArr[1] = Number(returnArr[1]) - 1      //converts the string 'digit' of move to a number subtracting 1 for needed math
        return returnArr
    }

    function combine(start, end) {                  //function to combine the values and make sure they are positive for needed math
        let total = start - end
        if (total < 0) {
            return total = - total
        } else {
            return total
        }
    }

    conStartArr = convert(start)                            //calls convert with start move
    startVal = conStartArr[0] + conStartArr[1]              //adds conStartArr values
    conEndArr = convert(end)                                //calls convert with end move
    endVal = conEndArr[0] + conEndArr[1]                    //adds conEndArr values
    startEndFirst = combine(conStartArr[0], conEndArr[0])   //sends [0]index of arrays to combine function
    startEndSecond = combine(conStartArr[1], conEndArr[1])  //sends [1]index of arrays to combine function


    if (move == 0) {                                        //if given 0 moves return true because its always true
        return true
    }

    //if start values are divisible by 2 or both are not divisible by 2 they are on the needed squares to reach each other
    if (startVal % 2 == 0 && endVal % 2 == 0 || startVal % 2 != 0 && endVal % 2 != 0) {
        //if we have more than 2 moves we can always get to any square. Return true
        if (move > 1) {
            return true
        }
        //if we only have 1 move then the startEndFirst value has to match the startEndSecond value to be reachable in one move
        if (move == 1) {
            if (startEndFirst == startEndSecond) {
                return true
            } else {
                return false
            }
        }
    }
        //if one value is divisible by 2 and the other isn't then they can't be on needed squares so can never reach each other
    if (startVal % 2 == 0 && endVal % 2 != 0 || startVal % 2 != 0 && endVal % 2 == 0) {
        return false
    }
}

console.log(bishop('a1', 'b4', 2)) // should return true
console.log(bishop('a1', 'h8', 1)) // should return true
console.log(bishop('a1','b5',5)) // should return false
console.log(bishop('f1','f1',0)) // should return true
console.log(bishop('f5', 'f7', 2)) // should return true
