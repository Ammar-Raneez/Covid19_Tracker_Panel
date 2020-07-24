import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                {/*title*/}
                    <Typography  className="InfoBox__title" color="textSecondary">{title}</Typography>
                
                {/*number of cases*/}
                    <h2 className="InfoBox__cases">{cases}</h2>
                
                {/*total*/}
                    <Typography  className="InfoBox__total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
