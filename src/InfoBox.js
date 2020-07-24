import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css';

//...props means, spread any other prop (every other prop is contained in props)
function InfoBox({ title, cases, total, active, isRed, isGreen, isBlack, ...props }) {
    return (             //smart way of adding another class, if it is active   
        <Card className={`infoBox ${active? isRed? 'infoBox--red' : isGreen? 'infoBox--green' : 'infoBox--black' : 'x'}`} 
            onClick={props.onClick}
            >
            <CardContent>
                {/*title*/}
                <Typography  className="infoBox__title" color="textSecondary">{title}</Typography>
                
                {/*number of cases*/}
                <h2 className={`infoBox__cases  ${isRed? 'infoBox--text--red' : isGreen? 'infoBox--text--green' : 'infoBox--text--black'}`}>
                    {cases}
                </h2>
                
                {/*total*/}
                <Typography  className="infoBox__total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}   //in BEM styling if the style added is for the same element and it acts as a modifier, add "--", modification change, not "__", which is an element change

export default InfoBox
