import React from 'react'
import Card from '@material-tailwind/react/Card'
import CardRow from '@material-tailwind/react/CardRow'
import CardHeader from '@material-tailwind/react/CardHeader'
import CardStatus from '@material-tailwind/react/CardStatus'
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter'
import Icon from '@material-tailwind/react/Icon'

const CardDate = ({data}) => {
    return (
        <Card>
            <CardRow>
                <CardHeader color="lightBlue" size="lg" iconOnly>
                    <Icon name="date_range" size="5xl" color="white"/>
                </CardHeader>
                <CardStatus title={data.DateThai} amount={data.HolidayDescriptionThai}/>
            </CardRow>
            <CardStatusFooter color="green" amount="" date={data.HolidayDescription}>
                <Icon color="green" name="public"/>
            </CardStatusFooter>
        </Card>
    )
}

export default CardDate
