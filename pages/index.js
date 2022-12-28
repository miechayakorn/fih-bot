import { Button, Container, Grid, Text } from '@nextui-org/react'
import CardDate from '../components/cardDate'
import { useEffect, useState } from 'react'
import { fetchFirebase } from '../components/fetch/fetchFirebase'

export default function Index(result) {
    const [filterSelect, setFilterSelect] = useState('all')
    const [data, setData] = useState([])


    const filter = [
        {
            title: 'ทั้งปี ' + getYear(),
            value: 'all'
        },
        {
            title: 'ที่กำลังมาถึง',
            value: 'upcoming'
        }
    ]

    const onChangeFilter = (fihData) => {
        if (filterSelect === 'upcoming') {
            let dateNow = new Date().toJSON().slice(0, 10)
            console.log(dateNow)
            const result = fihData.filter(date => date.Date > dateNow)
            setData(result)
        } else {
            setData(fihData)
        }
    }

    useEffect(() => {
        onChangeFilter(result?.dataStores)
    }, [filterSelect])

    return (
        <Container md>
            <Text
                h1
                size={60}
                css={{
                    textGradient: '45deg, $blue600 -20%, $pink600 50%',
                }}
                weight="bold"
            >
                ตารางวันหยุดของสถาบันการเงิน
            </Text>
            <Grid.Container gap={2}>
                {filter.map((data, index) => {
                    return <Grid key={index}>
                        <Button onClick={() => setFilterSelect(data.value)}
                                flat={data.value === filterSelect ? false : true}
                                rounded={true} key={index}>
                            {data.title}
                        </Button>
                    </Grid>
                })
                }
            </Grid.Container>
            <section className="bg-gray-100 pb-20">
                <div className="container max-w-7xl mx-auto px-4">
                    <Grid.Container gap={2}>
                        {
                            data.map((data, index) => {
                                return <Grid xs={12} sm={6} md={4} key={index}>
                                    <CardDate data={data} key={index}/>
                                </Grid>
                            })
                        }
                    </Grid.Container>
                </div>
            </section>
        </Container>
    )
}

const getYear = () => {
    let toDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Bangkok'})
    return new Date(toDate).getFullYear()
}

export const getServerSideProps = async () => {
    let dataStores = await fetchFirebase(`mainStorage/${getYear()}/data`)
    return {
        props: {dataStores}, // will be passed to the page components as props
    }
}
