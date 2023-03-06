import { Badge, Button, Container, Grid, Switch, Text, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import CardDate from '../components/cardDate'
import { useEffect, useState } from 'react'
import { fetchFirebase } from '../components/fetch/fetchFirebase'
import { SunIcon } from '../components/icon/SunIcon'
import { MoonIcon } from '../components/icon/MoonIcon'
import DisplayCalendarModal from '../components/DisplayCalendarModal'

export default function Index(result) {
    const [filterSelect, setFilterSelect] = useState('all')
    const [data, setData] = useState([])
    const {setTheme} = useNextTheme()
    const {isDark, type} = useTheme()

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
            <Grid css={{position: 'fixed', bottom: '10px', right: '30px', zIndex: 1}}>
                <Switch
                    checked={isDark}
                    size="xl"
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    iconOn={<SunIcon filled/>}
                    iconOff={<MoonIcon filled/>}
                />
            </Grid>
            <Grid.Container gap={1} css={{mt: 20}} justify="center">
                <Text
                    h1
                    size={60}
                    hideIn="xs"
                    css={{
                        textGradient: '45deg, $blue600 -20%, $pink600 50%',
                    }}
                    weight="bold"
                >
                    ตารางวันหยุดของสถาบันการเงิน
                </Text>
                <Text
                    h2
                    showIn="xs"
                    css={{
                        alignSelf: 'center',
                        textGradient: '45deg, $blue600 -20%, $pink600 50%',
                    }}
                    weight="bold"
                >
                    ตารางวันหยุด
                </Text>
                <br/>
                <Text
                    h2
                    showIn="xs"
                    css={{
                        alignSelf: 'center',
                        textGradient: '45deg, $blue600 -20%, $pink600 50%',
                    }}
                    weight="bold"
                >
                    ของสถาบันการเงิน
                </Text>
            </Grid.Container>
            <Grid.Container justify="center">
                <DisplayCalendarModal/>
            </Grid.Container>
            {data ? <>
                    <Grid.Container gap={1}>
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
                    <Grid.Container gap={2}>
                        <Grid>
                            {filterSelect != 'all' ? 'เหลืออีก' : 'ทั้งหมด'} {data.length} วัน
                        </Grid>
                    </Grid.Container>
                    <Grid.Container gap={2} css={{mb: 50}}>
                        {
                            data.map((data, index) => {
                                return <Grid xs={12} sm={6} md={4} key={index}>
                                    <CardDate data={data} key={index}/>
                                </Grid>
                            })
                        }
                    </Grid.Container>
                </>
                :
                <Grid.Container gap={1}>
                    <Grid>
                        <Badge enableShadow disableOutline size="lg">ไม่พบข้อมูล</Badge>
                    </Grid>

                </Grid.Container>
            }
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
