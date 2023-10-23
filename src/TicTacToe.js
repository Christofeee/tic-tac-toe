import React, { useState } from 'react';

function TicTacToe()
{
    const [isGameWon, setIsGameWon] = useState(false);
    
    let cells = new Array(3);   //1D array
    let isOturn = true

    for (let i=0; i<cells.length; i++)      //2D array
    {
        cells[i] = [];
        for (let a=0; a<cells.length; a++)
        {
            cells[i][a] = null
        }
    }
    console.log(cells) 

    function generateId(rowIndex,cellIndex) //to generate specific indexes for each cell
    {
        return (rowIndex.toString()+cellIndex.toString())
    }

    function hideShow(elementId)    //to hide or show elements
    {
        var x = document.getElementById(elementId)
        if (x.style.display === "none")
        {
            x.style.display = "block"
        }
        else
        {
            x.style.display = "none"
        }
    }

    function restart()  //to restart game by reloading page
    {
        window.location.reload()
    }
    
    function changeEmoji(elementId, emoji) //to change emoji in cells
    {
        document.getElementById(elementId).innerHTML = emoji
        // disableButton()
    }

    function checkRow1(cell)
    {
        if((cells[0][0] === cell) && (cells[0][1] === cell) && (cells[0][2] === cell))
        {
            console.log("checkRow1ok")
            return true
        } else {return false}
    }
    function checkRow2(cell)
    {
        if((cells[1][0] === cell) && (cells[1][1] === cell) && (cells[1][2] === cell))
        {
            console.log("checkRow2ok")
            return true
        } else {return false}
    }
    function checkRow3(cell)
    {
        if((cells[2][0] === cell) && (cells[2][1] === cell) && (cells[2][2] === cell))
        {
            console.log("checkRow3ok")
            return true
        } else {return false}
    }
    function checkCol1(cell)
    {
        if((cells[0][0] === cell) && (cells[1][0] === cell) && (cells[2][0] === cell))
        {
            console.log("checkCol1ok")
            return true
        } else {return false}
    }
    function checkCol2(cell)
    {
        if((cells[0][1] === cell) && (cells[1][1] === cell) && (cells[2][1] === cell))
        {
            console.log("checkCol2ok")
            return true
        } else {return false}
    }
    function checkCol3(cell)
    {
        if((cells[0][2] === cell) && (cells[1][2] === cell) && (cells[2][2] === cell))
        {
            console.log("checkCol3ok")
            return true
        } else {return false}
    }
    function checkCross1(cell)
    {
        if((cells[0][0] === cell) && (cells[1][1] === cell) && (cells[2][2] === cell))
        {
            console.log("checkCross1ok")
            return true
        } else {return false}
    }
    function checkCross2(cell)
    {
        if((cells[2][0] === cell) && (cells[1][1] === cell) && (cells[0][2] === cell))
        {
            console.log("checkCross2ok")
            return true
        } else {return false}
    }
    
    let winner
    function checkWin(x, y, cell)
    {
        // 00 01 02
        // 10 11 12
        // 20 21 22
        console.log("checking")
        
        if((x === 0) && (y === 0))
        {
            if(checkRow1(cell) || checkCol1(cell) || checkCross1(cell))
            {
                // console.log(checkRow1(cell), checkCol1(cell), checkCross1(cell))
                return winner = cell
            }
        }
        if((x === 0) && (y === 1))
        {
            if(checkRow1(cell) || checkCol2(cell))
            {
              // console.log (checkRow1(cell), checkCol2(cell))
              return winner = cell
            }
        }
        if((x === 0) && (y === 2))
        {
            if(checkRow1(cell) || checkCol3(cell) || checkCross2(cell))
            {
              // console.log (checkRow1(cell), checkCol3(cell), checkCross2(cell))
              return winner = cell
            }
        }
        if((x === 1) && (y === 0))
        {
            if(checkRow2(cell) || checkCol1(cell))
            {
              // console.log (checkRow2(cell), checkCol1(cell))
              return winner = cell
            }
        }
        if((x === 1) && (y === 1))
        {
            if(checkRow2(cell) || checkCol2(cell) || checkCross1(cell) || checkCross2(cell))
            {
              // console.log (checkRow2(cell), checkCol2(cell), checkCross1(cell), checkCross2(cell))
              return winner = cell
            }
        }
        if((x === 1) && (y === 2))
        {
            if(checkRow2(cell) || checkCol3(cell))
            {
              // console.log (checkRow2(cell), checkCol3(cell))
              return winner = cell
            }
        }
        if((x === 2) && (y === 0))
        {
            if(checkRow3(cell) || checkCol1(cell) || checkCross2(cell))
            {
              // console.log (checkRow3(cell), checkCol1(cell), checkCross2(cell))
              return winner = cell
            }
        }
        if((x === 2) && (y === 1))
        {
            if(checkRow3(cell) || checkCol2(cell))
            {
              // console.log (checkRow3(cell), checkCol2(cell))
              return winner = cell
            }
        }
        if((x === 2) && (y === 2))
        {
            if(checkRow3(cell) || checkCol3(cell) || checkCross1(cell))
            {
              // console.log (checkRow3(cell), checkCol3(cell), checkCross1(cell))
              return winner = cell
            }
        }
        
    }

    function clickEvent (cellIndex, rowIndex, cell)
    {
        console.log(cell)
        const elementId = generateId(rowIndex,cellIndex)

        if (isOturn === true)
        {
            cells[rowIndex][cellIndex] = "O"
            isOturn = false
            document.getElementById("turn").innerHTML = ("'X' turn")
        }
        else
        {
            cells[rowIndex][cellIndex] = "X"
            isOturn = true
            document.getElementById("turn").innerHTML = ("'O' turn")
        }
        changeEmoji(elementId, cells[rowIndex][cellIndex])
        document.getElementById(elementId).disabled = true
        console.log("input",cells[rowIndex][cellIndex])
        console.log(rowIndex,cellIndex)
        console.log(cells)
        checkWin(rowIndex, cellIndex, cells[rowIndex][cellIndex])
        console.log("The winner is", winner)
        if (winner)
        {
            // document.getElementsByTagName("button").disabled = true
            setIsGameWon(true)
            document.getElementById("winner").innerHTML = ("The winner is '" + winner + "'")
            setTimeout(hideShow, 300,"gamecomplete")
            setTimeout(hideShow, 300,"fullscreen-bg")
        }
    }

    const board = cells.map((row, rowIndex) =>
        <tr>
            {row.map((cell, cellIndex) =>
                <td>
                    <button
                        onClick={ () => clickEvent(cellIndex, rowIndex, cell)}
                        className="cell" 
                        id={generateId(rowIndex,cellIndex)}
                        disabled={isGameWon}>
                    </button>
                </td>
            )}
        </tr>
    )

    return (
        
        <div className="App">
            
            <table id="board">  
                <tr><th colSpan={5}><h1 class="header">Tic-Tac-Toe</h1></th></tr>
                <tr><th colSpan={5}><h1 id="turn" style={{fontSize:"40px"}}>'O' turn</h1></th></tr>
                {board}
            </table>
            <div id="fullscreen-bg" style={{display:"none"}}></div> {/*darken background*/}
            <div id="gameover" style={{display:"none"}}>    {/*game over box*/}
                <h1 >Game Over</h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
            <div id="gamecomplete" style={{display:"none"}}>    {/*you win box*/}
                <h1 id="winner"></h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
        </div>
    )
}

export default TicTacToe;