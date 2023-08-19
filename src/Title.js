import React from 'react'

export default function Title(props) {
  return (
    <div>
      {/*<h1 style={{backgroundColor:"orange",borderBottom:"5px solid red"}}>請選擇要購買的水果</h1>*/}
        <h1 style={{backgroundColor:"orange",borderBottom:"5px solid red"}}>
            {props.mainTitle}
        </h1>
    </div>
  )
}
