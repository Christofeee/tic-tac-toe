import React, { useState } from "react";

function BombGame()
{
    let cells = new Array(5);   //1D array
    
    for (let i=0; i<cells.length; i++)      //2D array
    {
        cells[i] = [];
        for (let a=0; a<cells.length; a++)
        {
            cells[i][a] = null
        }
    }

    for (let i=0; i<5; i++) //placing bombs in random places
    {
        let isOverlap = true
        while (isOverlap) //to control overlap index
        {
            let x = Math.floor(Math.random()*4) //getting random indexes
            let y = Math.floor(Math.random()*4)
            
            if (cells[x][y] !== "💣")   //checking if the bomb already exist or not
            {
                cells[x][y] = "💣"  //placing bomb if its not
                isOverlap = false //stop looping
            }
        }
    }

    console.log(cells) //to see bombs and to test

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
    
    function changeEmoji(elementId) //to change emoji in cells
    {
        document.getElementById(elementId).innerHTML = "💣"
        disableButton()
    }

    const [disabled, setDisabled] = useState(false) //to disable user click when hitting the bomb
    const disableButton = () =>
    {
        setDisabled(true);
        console.log("input disable")
    }
    
    var chosen = 0  //to count achieved cells

    //game board
    const board = cells.map((row, rowIndex) =>
        <tr>
            {row.map((cell, cellIndex) =>
                <td>
                    <button
                        onClick = { () =>
                            {
                                console.log(cell)   //to see what user have choosen
                                const elementId = generateId(rowIndex,cellIndex)    //get specific element id for each cell
                                
                                //achieved cell state
                                if (cell !== "💣" && cell !== "chosen")   //to check if user have already chosen this cell or if i has bomb
                                {
                                    document.getElementById(elementId).style.backgroundColor = "cyan"   //change achieved color
                                    cell = "chosen" //mark the cell "chosen"
                                    ++chosen    //add achieved cells count
                                }
                                //fail state
                                else if (cell !== "chosen") //to check if the cell is not chosen
                                {
                                    document.getElementById(elementId).style.backgroundColor = "red"    //change color to red
                                    changeEmoji(elementId)  //to show bomb emoji
                                    setTimeout(hideShow, 1100,"gameover")  //to show game over box
                                    setTimeout(hideShow, 1100,"fullscreen-bg") //jus to darken the background
                                }
                                //chosen state
                                else
                                {
                                    console.log("This is chosen")   //jus to make sure
                                }
                                //complete state
                                if (chosen === 20)
                                {
                                    setTimeout(hideShow, 200,"fullscreen-bg")  //jus to darken the background
                                    setTimeout(hideShow, 200,"gamecomplete")   //to show you win box
                                }
                            }
                        }
                        class="cell" 
                        id={generateId(rowIndex,cellIndex)}
                        disabled={disabled}>
                        <b>O</b>
                    </button>
                </td>
            )}
        </tr>
    )

    return (
        
        <div className="App">
            
            <table id="board">  {/* game board */}
                <tr><th colSpan={5}><h1 class="header">Bomb Game</h1></th></tr>
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