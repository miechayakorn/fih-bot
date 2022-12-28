import React from 'react'
import { Avatar, Card, Grid, Text } from '@nextui-org/react'

const CardDate = ({data}) => {
    return (
        <Card css={{p: '$6'}}>
            <Card.Header>
                <Avatar
                    text={data.HolidayDescriptionThai}
                    color="primary"
                    textColor="white"/>
                <Grid.Container css={{pl: '$6'}}>
                    <Grid xs={12}>
                        <Text h4 css={{lineHeight: '$xs'}}>
                            {data.HolidayDescriptionThai}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Text css={{color: '$accents8'}}>{data.DateThai}</Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{py: '$2'}}>
                <Text>
                    {data.HolidayDescription}
                </Text>
            </Card.Body>
            {/*<Card.Footer>*/}
            {/*    <Link*/}
            {/*        icon*/}
            {/*        color="primary"*/}
            {/*        target="_blank"*/}
            {/*        href="https://github.com/nextui-org/nextui"*/}
            {/*    >*/}
            {/*        Visit source code on GitHub.*/}
            {/*    </Link>*/}
            {/*</Card.Footer>*/}
        </Card>
    )
}

export default CardDate
