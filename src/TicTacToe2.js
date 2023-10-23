import React, { useState } from "react";

function BombGame()
{
    let cells = new Array(3);   //1D array
    let isAlly = true
    let isAllyWin = false
    let isOpponentWin = false

    for (let i=0; i<cells.length; i++)      //2D array
    {
        cells[i] = [];
        for (let a=0; a<cells.length; a++)
        {
            cells[i][a] = null
        }
    }
    console.log(cells)  //to see empty array

    // for (let i=0; i<3; i++) //placing bombs in random places
    // {
    //     let isOverlap = true
    //     while (isOverlap) //to control overlap index
    //     {
    //         let x = Math.floor(Math.random()*2) //getting random indexes
    //         let y = Math.floor(Math.random()*2)
            
    //         if (cells[x][y] !== "💣")   //checking if the bomb already exist or not
    //         {
    //             cells[x][y] = "💣"  //placing bomb if its not
    //             isOverlap = false //stop looping
    //         }
    //     }
    // }

    // console.log(cells) //to see bombs and to test

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

    const [disabled, setDisabled] = useState(false) //to disable user click when hitting the bomb
    const disableButton = () =>
    {
        setDisabled(true);
        console.log("input disable")
    }

    function checkUpper(x, y, cell)
    {
        console.log("checking upper")
        if (Math.sign(x-1) !== -1)
        {
            if (cell===cells[x-1][y])
            {
                console.log("upper cell matched")
                return true
            }
            else
            {
                console.log("upper cell not matched")
                return false
            }
        } 
        else
        {
            console.log("cant check upper cell")
            return false
        }
    }

    function checkLower(x, y, cell)
    {
        console.log("checking lower")
        if (x+1 <= 2)
        {
            if (cell===cells[x+1][y])
            {
                console.log("lower cell matched")
                return true
            }
            else
            {
                console.log("lower cell not matched")
                return false
            }
        } 
        else
        {
            console.log("cant check lower cell")
            return false
        }
    }

    let isMatched = false
    function checkWin(x, y, cell)
    {
        if(checkUpper(x, y, cell))
        {
            if(checkUpper(x-1, y, cell))
            {
                isMatched = true
            }
            else
            {
                isMatched = checkLower(x, y, cell)
            }
        }
        else if(checkLower(x, y, cell))
        {
            if(checkLower(x+1, y, cell))
            {
                isMatched = true
            }
            else
            {
                isMatched = checkUpper(x, y, cell)
            }
        }
        console.log(isMatched)
        // console.log("Checking")
        // console.log(x, y, cell)
        // console.log(typeof(x))
        // console.log(cells)
        // var isProcessing = true
        // while (isProcessing)
        // {
        //     if (Math.sign(x-1) !== -1)
        //     {
        //         if (cell===cells[x-1][y])
        //         {
                    
        //             console.log("upper cell matched")
        //         }
        //         else
        //         {
        //             isProcessing = false
        //             console.log("upper cell not matched")
        //         }
        //     } 
        //     else
        //     {
        //         isProcessing = false
        //         console.log("cant check upper cell")
        //     }
        // }
    }
    
    function clickEvent (cellIndex, rowIndex, cell)
    {
        console.log(cell)
        const elementId = generateId(rowIndex,cellIndex)

        if (isAlly === true)
        {
            cells[rowIndex][cellIndex] = "O"
            isAlly = false
        }
        else
        {
            cells[rowIndex][cellIndex] = "X"
            isAlly = true
        }
        changeEmoji(elementId, cells[rowIndex][cellIndex])
        document.getElementById(elementId).disabled = true
        checkWin(rowIndex, cellIndex, cells[rowIndex][cellIndex])
    }

    // var chosen = 0  //to count achieved cells

    //game board
    const board = cells.map((row, rowIndex) =>
        <tr>
            {row.map((cell, cellIndex) =>
                <td>
                    <button
                        onClick={ () => clickEvent(cellIndex, rowIndex, cell)}
                        // onClick = { () =>
                        //     {
                        //         console.log(cell)   //to see what user have choosen
                        //         const elementId = generateId(rowIndex,cellIndex)    //get specific element id for each cell
                                
                        //         //achieved cell state
                        //         if (cell !== "💣" && cell !== "chosen")   //to check if user have already chosen this cell or if i has bomb
                        //         {
                        //             document.getElementById(elementId).style.backgroundColor = "cyan"   //change achieved color
                        //             cell = "chosen" //mark the cell "chosen"
                        //             ++chosen    //add achieved cells count
                        //         }
                        //         //fail state
                        //         else if (cell !== "chosen") //to check if the cell is not chosen
                        //         {
                        //             document.getElementById(elementId).style.backgroundColor = "red"    //change color to red
                        //             changeEmoji(elementId)  //to show bomb emoji
                        //             setTimeout(hideShow, 1100,"gameover")  //to show game over box
                        //             setTimeout(hideShow, 1100,"fullscreen-bg") //jus to darken the background
                        //         }
                        //         //chosen state
                        //         else
                        //         {
                        //             console.log("This is chosen")   //jus to make sure
                        //         }
                        //         //complete state
                        //         if (chosen === 6)
                        //         {
                        //             setTimeout(hideShow, 200,"fullscreen-bg")  //jus to darken the background
                        //             setTimeout(hideShow, 200,"gamecomplete")   //to show you win box
                        //         }
                        //     }
                        // }
                        class="cell" 
                        id={generateId(rowIndex,cellIndex)}
                        disabled={disabled}>
                        {/* <b>O</b> */}
                    </button>
                </td>
            )}
        </tr>
    )

    return (
        
        <div className="App">
            
            <table id="board">  {/* game board */}
                <tr><th colSpan={5}><h1 class="header">Tic-Tac-Toe</h1></th></tr>
                {board}
            </table>
            <div id="fullscreen-bg" style={{display:"none"}}></div> {/*darken background*/}
            <div id="gameover" style={{display:"none"}}>    {/*game over box*/}
                <h1 >Game Over</h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
            <div id="gamecomplete" style={{display:"none"}}>    {/*you win box*/}
                <h1 >You Win!</h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
            
        </div>
    )
}

export default BombGame;






// const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch("/bombgame")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);  // Log the received data
    //             setData(data);      // Set the data state
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);